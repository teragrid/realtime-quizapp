const ERROR_MESSAGE = {
  400: { message: 'Bad Request' },
  401: { message: 'Unauthorized' },
  403: { message: 'Forbidden' },
  404: { message: 'Not found' },
  409: { message: 'Conflict' },
  500: { message: 'Internal Server Error' },
  invalid_address: { message: 'Invalid Wallet Address' },
  not_connect_wallet: { message: 'Please connect wallet' },
};

module.exports = {
  ERROR_MESSAGE,
};
