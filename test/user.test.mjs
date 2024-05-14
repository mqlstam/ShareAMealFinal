// test/user.test.mjs
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';
import logger from '../util/logger.js';


chai.use(chaiHttp);
const expect = chai.expect;

describe('Users', () => {
  describe('POST /api/user', () => {
    it('should create a new user', (done) => {
      const newUser = {
        firstName: 'John',
        lastName: 'Doe',
        emailAddress: 'john.doe@example.com',
        password: 'Password123@1213',
        phoneNumber: '0612345678',
        roles: 'guest',
        street: '123 Main St',
        city: 'Anytown'
      };

      chai.request(app)
        .post('/api/user')
        .send(newUser)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('id');
          expect(res.body.data).to.have.property('firstName', 'John');
          expect(res.body.data).to.have.property('lastName', 'Doe');
          expect(res.body.data).to.have.property('emailAddress', 'john.doe@example.com');
          done();
        });
    });
  });

  describe('GET /api/user', () => {
    it('should get all users', (done) => {
      chai.request(app)
        .get('/api/user')
        .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
        .end((err, res) => {
          logger.info(res.body);
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.an('array');
          done();
        });
    });
  });

  describe('GET /api/user/profile', () => {
    it('should get the user profile', (done) => {
      chai.request(app)
        .get('/api/user/profile')
        .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
        .end((err, res) => {
          logger.info(res.body);
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('id');
          expect(res.body.data).to.have.property('firstName');
          expect(res.body.data).to.have.property('lastName');
          expect(res.body.data).to.have.property('emailAdress');
          done();
        });
    });
  });

  describe('GET /api/user/:userId', () => {
    it('should get a user by ID', (done) => {
      chai.request(app)
        .get('/api/user/1')
        .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
        .end((err, res) => {
          logger.info(res.body);
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('id');
          expect(res.body.data).to.have.property('firstName');
          expect(res.body.data).to.have.property('lastName');
          expect(res.body.data).to.have.property('emailAdress');
          done();
        });
    });
  });

  describe('PUT /api/user/:userId', () => {
    it('should update a user', (done) => {
      const updatedUser = {
        firstName: 'Updated',
        lastName: 'User',
        emailAdress: 'updated@example.com',
        password: 'newpassword1@E',
        phoneNumber: '0987654321',
        roles: 'guest',
        street: '456 Update St',
        city: 'Updateville'
      };

      chai.request(app)
        .put('/api/user/5')
        .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
        .send(updatedUser)
        .end((err, res) => {
            if (res.body.data && res.body.data.errors) {
                console.log('Validation errors:', res.body.data.errors);
              }
          logger.info(res.body);
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('id');
          expect(res.body.data).to.have.property('firstName', 'Updated');
          expect(res.body.data).to.have.property('lastName', 'User');
          expect(res.body.data).to.have.property('emailAdress', 'updated@example.com');
          done();
        });
    });
  });

  describe('DELETE /api/user/:userId', () => {
    it('should delete a user', (done) => {
      chai.request(app)
        .delete('/api/user/5')
        .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
        .end((err, res) => {
          logger.info(res.body);
          expect(res).to.have.status(204);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.contain('User deleted successfully');
          done();
        });
    });
  });
 
});