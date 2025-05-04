const request = require('supertest');
const app = require('../index'); // adjust path if needed
const User = require('../userSchema');
const mongoose = require('mongoose');
require('dotenv').config();

// Optional: use MongoMemoryServer for isolated DB tests
// const { MongoMemoryServer } = require('mongodb-memory-server');

beforeAll(async () => {
  // If using MongoMemoryServer:
  // const mongoServer = await MongoMemoryServer.create();
  // await mongoose.connect(mongoServer.getUri());

  // Or connect to your test DB
  await mongoose.connect(process.env.mongodb_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

afterEach(async () => {
  await User.deleteMany(); // Clean up between tests
});

afterAll(async () => {
  await mongoose.disconnect();
  // await mongoServer.stop(); // if using in-memory server
});

describe('Auth Routes', () => {

  describe('POST /register', () => {

    it('should return 401 if any field is missing', async () => {
      const res = await request(app)
        .post('/register')
        .send({ email: 'test@example.com', password: '123456' });

      expect(res.statusCode).toBe(401);
      expect(res.body).toBe('Every Field is required');
    });

    it('should return 403 if user already exists', async () => {
      await User.create({ name: 'Utkar', email: 'test@example.com', password: '123456' });

      const res = await request(app)
        .post('/register')
        .send({ name: 'Utkar', email: 'test@example.com', password: '123456' });

      expect(res.statusCode).toBe(403);
      expect(res.body).toBe('Email already exist');
    });

    it('should register a new user successfully', async () => {
      const res = await request(app)
        .post('/register')
        .send({ name: 'Utkar', email: 'new@example.com', password: '123456' });

      expect(res.statusCode).toBe(200);
      expect(res.headers['set-cookie'][0]).toMatch(/token=/);
    });
  });

  describe('POST /login', () => {

    it('should return 402 if email or password is missing', async () => {
      const res = await request(app)
        .post('/login')
        .send({ email: 'test@example.com' });

      expect(res.statusCode).toBe(402);
      expect(res.body).toBe('Every Field is required');
    });

    it("should return 403 if account doesn't exist", async () => {
      const res = await request(app)
        .post('/login')
        .send({ email: 'noexist@example.com', password: '123456' });

      expect(res.statusCode).toBe(403);
      expect(res.body).toBe("Account doesn't exist with this email");
    });

    it('should login successfully with correct credentials', async () => {
      await User.create({ name: 'Utkar', email: 'logmein@example.com', password: '123456' });

      const res = await request(app)
        .post('/login')
        .send({ email: 'logmein@example.com', password: '123456' });

      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('User Loggedin Successfully');
      expect(res.headers['set-cookie'][0]).toMatch(/token=/);
    });
  });

});
