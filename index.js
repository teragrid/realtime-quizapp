/* eslint-disable no-buffer-constructor */
const session = require('express-session');
const swaggerUi = require('swagger-ui-express');
const Keycloak = require('keycloak-connect');
const dotenv = require('dotenv');
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const setTZ = require('set-tz');
const apiRoute = require('./routes/api');
const swagger = require('./config/swagger.json');
const i18n = require('./i18n.config');
const { Worker } = require('bullmq');
const { redisClient } = require('./helpers/redis');

const socketIo = require('socket.io');

const { QUEUE_USER_SCORE_UPDATE } = require('./constants/bullmq');
const { handleUserScoreUpdateToDB } = require('./controllers/ScoreWorkerController');
const { handleUserScoreUpdateForLeaderboard } = require('./controllers/LeaderboardController');

setTZ('UTC');

dotenv.config();

const app = express();
app.get('/health', (req, res) => res.status(200).send('OK'));

/**
 * Start Socket.io server
 */
const server = http.createServer(app);
const io = socketIo(server);
require('./routes/socket')(io); // Import the sockets module here

const memoryStore = new session.MemoryStore();

app.use(session({
  secret: 'mySecret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore,
}));

const kcConfig = {
  bearerOnly: true,
  serverUrl: process.env.SERVER_URL_KEYCLOAK,
  realm: process.env.REALM_KEYCLOAK,
  realmPublicKey: process.env.REALM_KEYCLOAK_PUBLIC_KEY,
};

/**
 * Declare a worker of `ScoreWorker` to update user scores to DB
 */
const userScoresUpdateWorkerToDB = new Worker(
  QUEUE_USER_SCORE_UPDATE,
  async (job) => {
    await handleUserScoreUpdateToDB(
      job.data.quizId,
      job.data.userId,
      job.data.newScore,
    );
  },
  { connection: redisClient },
);

/**
 * Declare a worker of `Leaderboard` to update user scores to Key-value DB
 */
const userScoresUpdateWorkerForLeaderboard = new Worker(
  QUEUE_USER_SCORE_UPDATE,
  async (job) => {
    await handleUserScoreUpdateForLeaderboard(
      job.data.quizId,
      job.data.userId,
      job.data.newScore,
    );
  },
  { connection: redisClient },
);

const keycloak = new Keycloak({ store: memoryStore }, kcConfig);

app.use(keycloak.middleware({
  logout: '/admin/log-out',
  admin: '/admin',
}));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(i18n);

app.use(apiRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server is up and running on ${PORT} ...`);
});

app.use('/swagger', swaggerUi.serve, (...args) => swaggerUi.setup(swagger)(...args));

