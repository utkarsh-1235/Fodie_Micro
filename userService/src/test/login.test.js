const request = require('supertest');
const app = require('../index'); // Make sure your express app is exported from here
const User = require('../userSchema');
const mongoose = require('mongoose');
require('dotenv').config();

beforeAll(async () => {
  await mongoose.connect(process.env.mongodb_uri)
    .then(() => console.log('Connected to MongoDB for testing'))
    .catch(err => console.error('MongoDB connection error:', err));
});

afterEach(async () => {
  await User.deleteMany(); // Clean database after each test
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Auth Routes - POST /login', () => {

  it('should return 402 if email or password is missing', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({ email: '' }); // missing password

    expect(res.statusCode).toBe(402);
    expect(res.body).toBe('Every Field is required');
  });

  it('should return 403 if user does not exist', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({ email: 'nouser@example.com', password: '12345678' });

    expect(res.statusCode).toBe(403);
    expect(res.body).toBe("Account doesn't exist with this email");
  });

  it('should login successfully and return token', async () => {
    // Create user directly in DB with hashed password
    const user = new User({ name: 'Utkar', email: 'user@example.com', password: '12345678' });
    await user.save();

    const res = await request(app)
      .post('/api/users/login')
      .send({ email: 'user@example.com', password: '12345678' });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe(true);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe('user@example.com');
    expect(res.headers['set-cookie'][0]).toMatch(/token=/);
  });

});
