const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const user = require('./user');
const { keycloak } = require('../../config/keycloak-config');


const { getQuizzes, getQuizById, createQuiz, joinQuiz, updateQuiz, deleteQuiz} = require('../../controllers/QuizController');
const { getScoresbyUserId, getScoresbyQuizId, submitAnswers} = require('../../controllers/ScoreController');


const { validateCreateQuiz } = require('../../middlewares/validators/Quiz/createValidator');
const { validateUpdateQuiz } = require('../../middlewares/validators/Quiz/updateValidator');
const { validateJoinQuiz } = require('../../middlewares/validators/Quiz/joinValidator');

const { validateSubmitAnswers } = require('../../middlewares/validators/Score/validateSubmitAnswers');

const {checkProfile} = require('../../middlewares/validators/Profile/checkProfile');

dotenv.config();

const app = express();
app.use(cors());

/* healthz */
app.get('/healthz', (req, res) => {
  res.status(200).send();
});

app.use(keycloak.middleware());

/* user */
app.use('/user', [checkProfile, keycloak.protect()], user);

/* quizzes */
app.get('/quizzes', getQuizzes);
app.get('/quizzes/:id', getQuizById);
app.post('/quizzes', validateCreateQuiz, createQuiz);
app.post('/quizzes/join', validateJoinQuiz, joinQuiz);
app.put('/quizzes/:id', validateUpdateQuiz, updateQuiz);
app.delete('/quizzes/:id', deleteQuiz);

/* scores */
app.get('/scores/user/:userId', getScoresbyUserId);
app.get('/scores/quiz/:quizId', getScoresbyQuizId);
app.post('/scores/quiz/:quizId', validateSubmitAnswers, submitAnswers);


module.exports = app;
