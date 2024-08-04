const { ReasonPhrases, StatusCodes } = require('http-status-codes');
const model = require('../models');
const { getUserIdByToken } = require('../helpers/jwt');
const {
  updateProfile,
} = require('../controllers/ProfileController');

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
jest.mock('ioredis');
jest.mock('@directus/sdk', () => ({
  createDirectus: jest.fn(() => ({
    with: jest.fn().mockReturnThis(),
    request: (() => [{ id: 1 }])
  })),
  rest: jest.fn(),
  realtime: jest.fn(),
  staticToken: jest.fn(),
  readItems: jest.fn(),
  readItem: jest.fn(),
  updateItem: jest.fn(),
}));

describe('test API model.Profile', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('test #updateProfile method', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    test('when #updateProfile return Correct result(create profile)', async () => {
      const params = { id: 1 };
      const body = {
        firstName: 'Trung',
        lastName: 'Nguyen',
        birthday: '19830202',
        email: 'test',
        phoneNumber: '02322',
        country: '',
        avatar: '',
      };
      const req = mockRequest(null, params, body);
      const res = mockResponse();
      req.files = {
        image: [{ location: 'test' }]
      };

      const mockUserByToken = {
        userId: 'test',
      };
      const mockUser = {
        id: 'test',
        username: 'test',
        update: jest.fn()
      };
      getUserIdByToken.mockReturnValueOnce(mockUserByToken);
      jest.spyOn(model.User, 'findByPk').mockReturnValueOnce(mockUser);
      jest.spyOn(model.Profile, 'findOne').mockReturnValueOnce(null);
      jest.spyOn(model.Profile, 'create').mockImplementationOnce(() => 'OK');

      const response = await updateProfile(req, res);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.send).toEqual({ message: 'Updated successfully' });
    });

    test('when #updateProfile return Correct result(update profile)', async () => {
      const params = { id: 1 };
      const body = {
        firstName: 'Trung',
        lastName: 'Nguyen',
        birthday: '20220202',
        email: 'test',
        phoneNumber: '02322',
        country: '',
        avatar: '',
      };
      const req = mockRequest(null, params, body);
      const res = mockResponse();
      req.files = {
        image: [{ location: 'test' }]
      };

      const mockUserByToken = {
        userId: 'test',
      };
      const mockUser = {
        id: 'test',
        username: 'test',
        update: jest.fn()
      };
      
      getUserIdByToken.mockReturnValueOnce(mockUserByToken);
      jest.spyOn(model.User, 'findByPk').mockReturnValueOnce(mockUser);
      jest.spyOn(model.Profile, 'findOne').mockReturnValueOnce({ id: 1, update: jest.fn() });
      jest.spyOn(model.Profile, 'create').mockImplementationOnce(() => 'OK');

      const response = await updateProfile(req, res);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.send).toEqual({ message: 'Updated successfully' });
    });

    test('when #updateProfile return Correct result(update no ref code)', async () => {
      const params = { id: 1 };
      const body = {};
      const req = mockRequest(null, params, body);
      const res = mockResponse();
      req.files = {
        image: null
      };

      const mockUserByToken = {
        userId: 'test',
      };

      const mockUser = {
        id: 'test',
        username: 'test',
        update: jest.fn()
      };
      
      getUserIdByToken.mockReturnValueOnce(mockUserByToken);
      jest.spyOn(model.User, 'findByPk').mockReturnValueOnce(mockUser);
      jest.spyOn(model.Profile, 'findOne').mockReturnValueOnce({ id: 1, update: jest.fn() });

      const response = await updateProfile(req, res);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.send).toEqual({ message: 'Updated successfully' });
    });

  });  
});