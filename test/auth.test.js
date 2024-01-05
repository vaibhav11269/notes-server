const supertest = require('supertest');
const app = require('../app');
const chai = require('chai');
const { expect } = chai;

describe('Auth API', () => {
    describe('POST /signup', () => {
        it('should create a new user when valid credentials are provided', async () => {
            const response = await supertest(app)
                .post('/api/auth/signup')
                .send({
                    firstName: 'testing',
                    lastName: 'user222',
                    email: 'test.222user@gmail.com',
                    password: 'testpassword'
                });

            try {
                // console.log("response", response.status)
                expect(response.status).to.equal(201);
                expect(response.body).to.have.property('message').to.equal('User signed up successfully');
            } catch (error) {
                // console.error(error);
                throw error;
            }
        }).timeout(5000);

        it('should return 401 when trying to signup with an existing email', async () => {
            const response = await supertest(app)
                .post('/api/auth/signup')
                .send({
                    firstName: 'testing',
                    lastName: 'user222',
                    email: 'test.222user@gmail.com',
                    password: 'testpassword'
                });

            try {
                expect(response.status).to.equal(401);
                expect(response.body).to.have.property('error').to.equal('User already registerd with this email');
            } catch (error) {
                // console.error(error);
                throw error;
            }
        });
    });

    describe('POST /login', () => {
        it('should login with valid credentials', async () => {
            const response = await supertest(app)
                .post('/api/auth/login')
                .send({
                    email: 'test.222user@gmail.com',
                    password: 'testpassword'
                });

            try {
                expect(response.status).to.equal(200);
                expect(response.body).to.have.property('message').to.equal('Login successful');
            }
            catch (error) {
                // console.error(error);
                throw error;
            }
        });

        it('should return 401 when trying to login with invalid credentials', async () => {
            const response = await supertest(app)
                .post('/api/auth/login')
                .send({
                    email: 'randommail@gmail.com',
                    password: 'invalidpassword'
                });

            try {
                expect(response.status).to.equal(401);
                expect(response.body).to.have.property('error').to.equal('Invalid credentials');
            } catch (error) {
                // console.error(error);
                throw error;
            }
        });
    });
});
