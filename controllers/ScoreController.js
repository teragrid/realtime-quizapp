const dotenv = require('dotenv');
const { Op, Sequelize } = require('sequelize');
const { StatusCodes } = require('http-status-codes');

const model = require('../models');
const {publishEvent} = require('../helpers/bullmq');

dotenv.config();

const getScoresbyUserId = async (req, res) => {
  try {
    // Logic to get the score by userId on the specific quizId
    return res.send(null);
  } catch (err) {
    console.log('[ScoreController][getScoresbyUserId] Error: ', err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: res.translate('ERROR').INTERNAL_SERVER_ERROR });
  }
};

const getScoresbyQuizId = async (req, res) => {
  try {
    // Logic to get the score of all users on the specific quizId
    return res.send(null);
  } catch (error) {
    console.log('[ScoreController][getScoresbyQuizId] Error: ', error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: res.translate('ERROR').INTERNAL_SERVER_ERROR });
  }
};

/**
 * Receive the answers sent from client to calculate the new score
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const submitAnswers = async (req, res) => {
  try {
    // Get the anwsers
    const {quizId, userId, answers} = req.body;
    // Canculate the new score
    const newScore = calculateNewScore(quizId, userId, answers);
    let newScoreDetails = {
      quizId: quizId,
      userId: userId,
      newScore: newScore
    };  
    // Publish the new scores update to the Pub/sub service
    publishEvent(newScoreDetails);
    // Return the connected client with the new score details
    return res.send(newScoreDetails);
  } catch (error) {
    console.log('[ScoreController][submitAnswers] Error: ', error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: res.translate('ERROR').INTERNAL_SERVER_ERROR });
  }
};

function calculateNewScore(quizId, userId, answers) {
  // Logic to canculate the new score of the given user on the specific quiz based on his/her awnsers
  let newScore = 0;
  return newScore; // Dummy new score
}

module.exports = {
  getScoresbyUserId, 
  getScoresbyQuizId, 
  submitAnswers,
};
