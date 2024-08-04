const { Op, Sequelize } = require('sequelize');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');

const handleUserScoreUpdateToDB = async (quizId, userId, newScore,) => {

}

const updateUserScore = async (quizId, userId, newScore,) => {

}

module.exports = {
    handleUserScoreUpdateToDB,
    updateUserScore,
};