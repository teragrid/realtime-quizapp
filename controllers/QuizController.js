const dotenv = require('dotenv');
const { Op, Sequelize } = require('sequelize');
const { StatusCodes } = require('http-status-codes');

const model = require('../models');

dotenv.config();

const getQuizzes = async (req, res) => {
  try {
    const quizzes = await model.Quiz.findAll();
    return res.send(quizzes);
  } catch (err) {
    console.log('[QuizController][getQuizzes] Error: ', err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: res.translate('ERROR').INTERNAL_SERVER_ERROR });
  }
};

const getQuizById = async (req, res) => {
  try {
    const quiz = await model.Quiz.findOne({
      where: {
        id: req.params?.quizId,
      },
      include: [
        {
          association: 'referrerType',
          attributes: ['id'],
        },
      ],
    });

    if (!quiz) return res.status(StatusCodes.NOT_FOUND).send({ message: 'QuizId not found' });

    return res.send(quiz);
  } catch (error) {
    console.log('[QuizController][getQuizById] Error: ', error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: res.translate('ERROR').INTERNAL_SERVER_ERROR });
  }
};

const createQuiz = async (req, res) => {
  try {

    return res.send(null);
  } catch (error) {
    console.log('[QuizController][createQuiz] Error: ', error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: res.translate('ERROR').INTERNAL_SERVER_ERROR });
  }
};

const joinQuiz = async (req, res) => {
  try {

    const { userId, quizId } = req.body;
    // Authentication and validation logic here
    res.status(200).json({ message: "You can join the quiz.", socketToken: generateSocketToken(userId, quizId) });
  } catch (error) {
    console.log('[QuizController][joinQuiz] Error: ', error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: res.translate('ERROR').INTERNAL_SERVER_ERROR });
  }
};

const updateQuiz = async (req, res) => {
  try {

    return res.send(null);
  } catch (error) {
    console.log('[QuizController][updateQuiz] Error: ', error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: res.translate('ERROR').INTERNAL_SERVER_ERROR });
  }
};

const deleteQuiz = async (req, res) => {
  try {

    return res.send(null);
  } catch (error) {
    console.log('[QuizController][deleteQuiz] Error: ', error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: res.translate('ERROR').INTERNAL_SERVER_ERROR });
  }
};

function generateSocketToken(userId, quizId) {
  // Generate a token to authenticate the WebSocket connection
  return `token-${userId}-${quizId}`; // Dummy token generation
}

module.exports = {
  getQuizzes, 
  getQuizById, 
  createQuiz,
  joinQuiz, 
  updateQuiz, 
  deleteQuiz,
};
