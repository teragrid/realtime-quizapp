const { ReasonPhrases, StatusCodes } = require('http-status-codes');
const { getUserIdByToken } = require('../helpers/jwt');
const model = require('../models');

const {
  getAllUser,
  getUserById,
} = require('../controllers/UserController');

const mockRequest = (query, params, body) => ({
  query,
  params,
  body
});

const mockResponse = () => {
  let status = StatusCodes.OK;
  let responseData = null;
  const translations = require('../translation/en.json');

  const res = {
    status: (newStatus) => {
      status = newStatus;
      return res;
    },
    send: (data) => {
      responseData = data;
      return {
        status,
        send: responseData
      };
    },
    translate: (key) => {
      return translations[key];
    }
  };

  return res;
};

jest.mock('../models');
jest.mock('../helpers/jwt');

describe('test API model.User', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('test #getAllUser method', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    test('when #getAllUser return correct result', async () => {
      const req = mockRequest(null, null, null);
      const res = mockResponse();

      const mockUsers = [
        {
          id: 'test',
          username: 'test'
        }
      ];

      jest.spyOn(model.User, 'findAll').mockReturnValueOnce(mockUsers);

      const response = await getAllUser(req, res);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.send).toEqual(mockUsers);
    });

    test('when #getAllUser return Error', async () => {
      const req = mockRequest(null, null, null);
      const res = mockResponse();

      jest.spyOn(model.User, 'findAll').mockRejectedValueOnce(ReasonPhrases.INTERNAL_SERVER_ERROR);

      const response = await getAllUser(req, res);

      expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    });
  });

  describe('test #getUserById method', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    test('when #getUserById return correct result', async () => {
      const req = mockRequest(null, null, null);
      const res = mockResponse();

      jest.spyOn(model.User, 'findOne').mockReturnValueOnce({ id: 1 });

      const response = await getUserById(req, res);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.send).toEqual({ id: 1 });
    });

    test('when #getUserById return not found', async () => {
      const req = mockRequest(null, null, null);
      const res = mockResponse();

      jest.spyOn(model.User, 'findOne').mockReturnValueOnce(null);

      const response = await getUserById(req, res);

      expect(response.status).toBe(StatusCodes.NOT_FOUND);
      expect(response.send).toEqual({ message: 'UserId not found' });
    });

    test('when #getUserById return Error', async () => {
      const query = {};
      const req = mockRequest(query, null, null);
      const res = mockResponse();

      jest.spyOn(model.User, 'findOne').mockRejectedValueOnce(ReasonPhrases.INTERNAL_SERVER_ERROR);

      const response = await getUserById(req, res);

      expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(response.send).toEqual({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
    });
  });
});
