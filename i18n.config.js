const i18n = require('i18n');
const path = require('path');

i18n.configure({
  locales: ['en', 'vi'],
  directory: path.join(__dirname, 'translation'),
  defaultLocale: 'en',
  api: {
    __: 'translate',
  },
});

module.exports = (req, res, next) => {
  i18n.init(req, res);
  return next();
};
