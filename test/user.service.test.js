const chai = require('chai');
const expect = chai.expect;
const userService = require('../services/user.service');

describe('User Service', () => {
  describe('create', () => {
    it('should create a new user', (done) => {
      const newUser = {
        firstName: 'John',
        lastName: 'Doe',
        emailAddress: 'john.doe@example.com',
        password: 'password123',
        phoneNumber: '1234567890',
        roles: 'guest',
        street: '123 Main St',
        city: 'Anytown'
      };

      userService.create(newUser, (error, data) => {
        expect(error).to.be.null;
        expect(data).to.be.an('object');
        expect(data).to.have.property('id');
        expect(data.firstName).to.equal(newUser.firstName);
        expect(data.lastName).to.equal(newUser.lastName);
        expect(data.emailAddress).to.equal(newUser.emailAddress);
        done();
      });
    });
  });

  describe('getAll', () => {
    it('should return an array of users', (done) => {
      userService.getAll((error, data) => {
        expect(error).to.be.null;
        expect(data).to.be.an('array');
        done();
      });
    });
  });

  // Add more test cases for other methods
});