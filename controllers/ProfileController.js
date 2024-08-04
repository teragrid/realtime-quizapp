const { Op, Sequelize } = require('sequelize');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const { getUserIdByToken } = require('../helpers/jwt');

const model = require('../models');

const resolveProfile = async (req, userId) => {
  const profile = await model.Profile.findOne({
    where: { userId: userId.userId },
  });
  const { image } = req.files;

  if (profile) {
    await model.Profile.update({
      firstName: req.body.firstName ?? profile.firstName,
      lastName: req.body.lastName ?? profile.lastName,
      birthday: req.body.birthday ?? profile.birthday,
      email: req.body.email ?? profile.email,
      phoneNumber: req.body.phoneNumber ?? profile.phoneNumber,
      country: req.body.country ?? profile.country,
      avatar: image ? `${image[0].location}` : profile.avatar,
    });
  } else {
    await model.Profile.create({
      userId: userId.userId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthday: req.body.birthday,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      country: req.body.country,
      avatar: image ? `${image[0].location}` : null,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = await getUserIdByToken(req, res);
    if (!userId) {
      return res.status(StatusCodes.UNAUTHORIZED).send({ message: res.translate('ERROR').UNAUTHORIZED });
    }

    await resolveProfile(req, userId);

    return res.send({ message: res.translate('Profile').update_success });
  } catch (err) {
    console.log('[ProfileController][updateProfile] error: ', err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: res.translate('ERROR').INTERNAL_SERVER_ERROR });
  }
};

const detailProfile = async (req, res) => {
  try {
    const userId = await getUserIdByToken(req, res);
    if (!userId) {
      return res.status(StatusCodes.UNAUTHORIZED).send({ message: res.translate('ERROR').UNAUTHORIZED });
    }
    const user = await model.model.User.findByPk(userId.userId);

    const profile = await model.Profile.findOne({
      attributes: ['id', 'firstName', 'lastName', 'birthday', 'email', 'phoneNumber', 'country', 'avatar'],
      where: { userId: userId.userId },
    });

    const result = {
      id: profile?.id,
      firstName: profile?.firstName,
      lastName: profile?.lastName,
      birthday: profile?.birthday,
      contactEmail: profile?.email,
      phoneNumber: profile?.phoneNumber,
      country: profile?.country,
      avatar: profile?.avatar,
      email: user?.email,
    };
    return res.send(result);
  } catch (err) {
    console.log('[ProfileController][detailProfile] error: ', err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: res.translate('ERROR').INTERNAL_SERVER_ERROR });
  }
};

module.exports = {
  resolveProfile,
  updateProfile,
  detailProfile,
};
