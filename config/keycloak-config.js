const session = require('express-session');
const Keycloak = require('keycloak-connect');
const dotenv = require('dotenv');
const express = require('express');

const app = express();

dotenv.config();

const kcConfig = {
  bearerOnly: true,
  serverUrl: process.env.SERVER_URL_KEYCLOAK,
  realm: process.env.REALM_KEYCLOAK,
  realmPublicKey: process.env.REALM_KEYCLOAK_PUBLIC_KEY,
};

const memoryStore = new session.MemoryStore();

app.use(session({
  secret: 'mySecret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore,
}));

const keycloak = new Keycloak({ store: memoryStore }, kcConfig);

module.exports = { keycloak };
