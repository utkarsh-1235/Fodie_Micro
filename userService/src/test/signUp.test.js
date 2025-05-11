const request = require('supertest');
const app = require('../index');
const dbConnect = require('../db');
const User = require('../userSchema');
const mongoose = require('mongoose');
require('dotenv').config();

beforeAll(async () => {
  await dbConnect();
});

afterEach(async () => {
  await User.deleteMany();
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Auth Routes - POST /register', () => {

  it('should return 401 if any field is missing', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({ email: 'test@example.com', password: '12345678' }); // Missing name

    expect(res.statusCode).toBe(401);
    expect(res.body).toBe('Every Field is required');
  });

  it('should return 403 if user already exists', async () => {
    // First, create a user
    await User.create({ name: 'Shivam', email: 'shivam@gmail.com', password: 'shivam@123' });

    // Try registering with the same email
    const res = await request(app)
      .post('/api/users/register')
      .send({ name: 'Another', email: 'shivam@gmail.com', password: 'anotherpass' });

    expect(res.statusCode).toBe(403);
    expect(res.body).toBe('Email already exist');
  });

  it('should register a new user successfully', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({ name: 'NewUser', email: 'newuser@example.com', password: 'password123' });

    expect(res.statusCode).toBe(200);
    expect(res.headers['set-cookie'][0]).toMatch(/token=/);
    expect(res.body.success).toBe(true);
    expect(res.body.data.email).toBe('newuser@example.com');
  });

});
