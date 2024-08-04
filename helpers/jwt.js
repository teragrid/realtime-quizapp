const jwt = require('jsonwebtoken');
const { ethers } = require('ethers');
const { Op } = require('sequelize');
const { getUserInfo } = require('./keycloak');
const model = require('../models');

/**
 * Get User
 */
async function getUserIdByToken(req, res) {
  try {
    const authHeader = req.headers.authorization;

    const token = authHeader.split(' ')[1];

    if (!token) return false;

    let username = await getUserInfo(token);

    const user = await model.User.findOne({
      where: {
        username,
      },
    });

    if (!user) return false;

    return { userId: user?.id, email: user?.email };
  } catch (error) {
    return false;
  }
}

module.exports = {
  getUserIdByToken,
};
