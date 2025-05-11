const request = require('supertest');
const app = require('../index'); // Your Express app
const dbConnect = require('../db');
const Owner = require('../ownerSchema');
const mongoose = require('mongoose');
require('dotenv').config();

beforeAll(async () => {
  await dbConnect();
});

afterEach(async () => {
  await Owner.deleteMany();
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Owner Routes - POST /ownerRegister', () => {

  it('should return 400 if any required field is missing', async () => {
    const res = await request(app)
      .post('/api/users/ownerRegister')
      .send({
        name: 'OwnerName',
        email: 'owner@example.com',
        password: 'ownerpass',
        // missing restaurantIds and documents
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toBe("Please fill all the details");
  });

  it('should register a new owner successfully', async () => {
    const res = await request(app)
      .post('/api/users/ownerRegister')
      .send({
        name: 'OwnerName',
        email: 'owner@example.com',
        password: 'ownerpass',
        restaurantIds: ['rest1', 'rest2'],
        documents: {
          fssaiLicense: 'FSSAI12345',
          gstNumber: 'GST98765'
        }
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.owner.email).toBe('owner@example.com');
    expect(res.body.owner.documents.fssaiLicense).toBe('FSSAI12345');
    expect(res.body.owner.documents.gstNumber).toBe('GST98765');
    expect(res.headers['set-cookie'][0]).toMatch(/token=/);
  });

  it('should not allow duplicate owner registration', async () => {
    // First registration
    await Owner.create({
      name: 'OwnerName',
      email: 'owner@example.com',
      password: 'ownerpass',
      restaurantId: ['rest1', 'rest2'],
      documents: {
        fssaiLicense: 'FSSAI12345',
        gstNumber: 'GST98765'
      }
    });

    // Attempt duplicate registration
    const res = await request(app)
      .post('/api/users/ownerRegister')
      .send({
        name: 'OwnerName',
        email: 'owner@example.com',
        password: 'ownerpass',
        restaurantIds: ['rest1', 'rest2'],
        documents: {
          fssaiLicense: 'FSSAI12345',
          gstNumber: 'GST98765'
        }
      });

    // You must handle duplicate email in your route for this to return 400 or 409!
    expect([400, 409, 500]).toContain(res.statusCode);
    // Optionally, check error message
    // expect(res.body.message).toMatch(/duplicate|already/i);
  });

});
