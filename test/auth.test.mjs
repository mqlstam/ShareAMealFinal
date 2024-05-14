// auth.test.mjs
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Authentication', () => {
  describe('POST /api/login', () => {
    it('should return a token when valid credentials are provided', (done) => {
      const validCredentials = {
        emailAddress: 'h.tank@server.com',
        password: 'secret',
      };

      chai.request(app)
        .post('/api/login')
        .send(validCredentials)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('token');
          done();
        });
    });

    it('should return an error when invalid credentials are provided', (done) => {
      const invalidCredentials = {
        emailAddress: 'invalid@example.com',
        password: 'invalidPassword',
      };

      chai.request(app)
        .post('/api/login')
        .send(invalidCredentials)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Invalid email or password');
          done();
        });
    });

    it('should return an error when email is missing', (done) => {
      const missingEmail = {
        password: 'validPassword',
      };

      chai.request(app)
        .post('/api/login')
        .send(missingEmail)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Email and password are required');
          done();
        });
    });

    it('should return an error when password is missing', (done) => {
      const missingPassword = {
        emailAddress: 'valid@example.com',
      };

      chai.request(app)
        .post('/api/login')
        .send(missingPassword)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Email and password are required');
          done();
        });
    });
  });
});