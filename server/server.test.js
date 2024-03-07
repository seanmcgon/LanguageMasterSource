const request = require('supertest');
const app = require('./index.js'); 

jest.mock('mongoose')

describe('API Endpoints', () => {
    it('GET /api - success', async () => {
      const response = await request(app).get('/api');
      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual({
        message: "Node.js server says hi to React Frontend!"
      });
    });
  });