const dotenv = require('dotenv');
const { Op, Sequelize } = require('sequelize');
const { StatusCodes } = require('http-status-codes');

const model = require('../models');

dotenv.config();

const getAllUser = async (req, res) => {
  try {
    const user = await model.User.findAll();
    return res.send(user);
  } catch (err) {
    console.log('[getAllUser] Error: ', err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: res.translate('ERROR').INTERNAL_SERVER_ERROR });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await model.User.findOne({
      where: {
        id: req.params?.userId,
      },
      include: [
        {
          association: 'referrerType',
          attributes: ['id', 'name'],
        },
      ],
    });

    if (!user) return res.status(StatusCodes.NOT_FOUND).send({ message: 'UserId not found' });

    return res.send(user);
  } catch (error) {
    console.log('[UserController][getUserByUserId] Error: ', error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: res.translate('ERROR').INTERNAL_SERVER_ERROR });
  }
};

module.exports = {
  getAllUser,
  getUserById,
};
