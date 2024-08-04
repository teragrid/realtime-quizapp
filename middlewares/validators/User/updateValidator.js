const { check, validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');

exports.validateUpdateUser = [
  check('referralCode')
    .optional({ nullable: true })
    .trim()
    .not()
    .isEmpty()
    .withMessage('ReferralCode can not be empty!')
    .bail(),
  check('referrerTypeId')
    .optional({ nullable: true })
    .not()
    .isEmpty()
    .withMessage('ReferrerTypeId can not be empty!')
    .bail()
    .custom((value) => {
      if (typeof value !== 'number') throw new Error('ReferrerTypeId must be Number!');
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
    }
    next();
  },
];
