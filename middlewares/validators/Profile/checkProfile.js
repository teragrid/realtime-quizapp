const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const Profile = require('../../../models/Profile');
const { getUserIdByToken } = require('../../../helpers/jwt');

exports.checkProfile = async (req, res, next) => {
  const user = await getUserIdByToken(req, res);
  if (!user) {
    return res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);
  }

  const profile = await model.Profile.findOne({
    where: { userId: user?.userId },
  });
  if (!profile) {
    return res.status(StatusCodes.BAD_REQUEST).send({ message: 'Your profile do not exist' });
  }

  next();
};
