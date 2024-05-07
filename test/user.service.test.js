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

  describe('getById', () => {
    it('should return a user by ID', (done) => {
      const userId = 1; // Assuming user ID 1 exists

      userService.getById(userId, (error, data) => {
        expect(error).to.be.null;
        expect(data).to.be.an('object');
        expect(data).to.have.property('id', userId);
        done();
      });
    });

    it('should return an error if the user does not exist', (done) => {
      const userId = 999; // Assuming user ID 999 does not exist

      userService.getById(userId, (error, data) => {
        expect(error).to.be.an('object');
        expect(error.message).to.equal('User not found');
        expect(data).to.be.null;
        done();
      });
    });
  });

  describe('update', () => {
    it('should update a user', (done) => {
      const userId = 1; // Assuming user ID 1 exists
      const updatedUser = {
        firstName: 'Updated',
        lastName: 'User',
        emailAddress: 'updated@example.com',
        password: 'newpassword',
        phoneNumber: '0987654321',
        roles: 'guest',
        street: '456 Update St',
        city: 'Updateville'
      };

      userService.update(userId, updatedUser, (error, data) => {
        expect(error).to.be.null;
        expect(data).to.be.an('object');
        expect(data.id).to.equal(userId);
        expect(data.firstName).to.equal(updatedUser.firstName);
        expect(data.lastName).to.equal(updatedUser.lastName);
        expect(data.emailAddress).to.equal(updatedUser.emailAddress);
        done();
      });
    });

    it('should return an error if the user does not exist', (done) => {
      const userId = 999; // Assuming user ID 999 does not exist
      const updatedUser = {
        // ... (user data) ...
      };

      userService.update(userId, updatedUser, (error, data) => {
        expect(error).to.be.an('object');
        expect(error.message).to.equal('User not found');
        expect(data).to.be.null;
        done();
      });
    });
  });

  describe('delete', () => {
    it('should delete a user', (done) => {
      const userId = 1; // Assuming user ID 1 exists

      userService.delete(userId, (error, data) => {
        expect(error).to.be.null;
        expect(data).to.be.an('object');
        expect(data.message).to.contain('User deleted successfully');
        done();
      });
    });

    it('should return an error if the user does not exist', (done) => {
      const userId = 999; // Assuming user ID 999 does not exist

      userService.delete(userId, (error, data) => {
        expect(error).to.be.an('object');
        expect(error.message).to.equal('User not found');
        expect(data).to.be.null;
        done();
      });
    });
  });
});