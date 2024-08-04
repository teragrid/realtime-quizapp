const { check, validationResult, checkSchema } = require('express-validator');
const { StatusCodes } = require('http-status-codes');
const { DATE_FORMAT } = require('../../../constants/date_format');

const MAX_BYTE = 3 * 1000 * 1000;
exports.validateUpdateProfile = [
  check('firstName')
    .trim()
    .escape()
    .isLength({ max: 50 })
    .optional({ nullable: true })
    .withMessage('First name longer than 50 characters!')
    .bail(),
  check('lastName')
    .trim()
    .escape()
    .isLength({ max: 50 })
    .optional({ nullable: true })
    .withMessage('Last name longer than 50 characters!')
    .bail(),
  check('email')
    .isEmail()
    .withMessage('Invalid email address!')
    .bail()
    .isLength({ max: 254 })
    .optional({ nullable: true })
    .withMessage('Email longer than 254 characters!')
    .bail(),
  check('birthday', 'Invalid birthday').isISO8601(DATE_FORMAT).optional({ nullable: true }),
  check('country')
    .isInt({ max: 243, min: 1 })
    .optional({ nullable: true })
    .withMessage('Country must be valid int id!')
    .bail(),
  check('phoneNumber')
    .escape()
    .exists({ checkFalsy: true })
    .isLength({ min: 10, max: 20 })
    .optional({ nullable: true }),
  checkSchema({
    image: {
      custom: {
        options: (value, { req, path }) => {
          if (req.files[path]) {
            if (req.files[path][0].size > MAX_BYTE) {
              return false;
            }
            switch (req.files[path][0].mimetype) {
              case 'image/jpeg':
                return true;
              case 'image/jpg':
                return true;
              case 'image/png':
                return true;
              default:
                return false;
            }
          }
          return true;
        },
        errorMessage: 'Avatar image must be a file of type: Jpeg, Jpg, Png and max size 3MB',
      },
    },
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
    }
    next();
  },
];
