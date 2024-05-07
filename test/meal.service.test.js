const chai = require('chai');
const expect = chai.expect;
const mealService = require('../services/meal.service');

describe('Meal Service', () => {
  describe('participate', () => {
    it('should add a user as a participant', (done) => {
      const userId = 1;
      const mealId = 1;

      mealService.participate(userId, mealId, (error, data) => {
        expect(error).to.be.null;
        expect(data).to.be.an('object');
        expect(data.message).to.contain(`User ${userId} has joined meal ${mealId}`);
        done();
      });
    });

    it('should return an error if the meal does not exist', (done) => {
      const userId = 1;
      const mealId = 999; // Assuming meal ID 999 does not exist

      mealService.participate(userId, mealId, (error, data) => {
        expect(error).to.be.an('object');
        expect(error.message).to.equal('Meal not found');
        expect(data).to.be.null;
        done();
      });
    });

    it('should return an error if the maximum number of participants is reached', (done) => {
      // Assuming meal ID 2 has reached the maximum number of participants
      const userId = 1;
      const mealId = 2;

      mealService.participate(userId, mealId, (error, data) => {
        expect(error).to.be.an('object');
        expect(error.message).to.equal('Maximum number of participants reached');
        expect(data).to.be.null;
        done();
      });
    });
  });

  describe('cancelParticipation', () => {
    it('should cancel a user\'s participation', (done) => {
      const userId = 1;
      const mealId = 1;

      mealService.cancelParticipation(userId, mealId, (error, data) => {
        expect(error).to.be.null;
        expect(data).to.be.an('object');
        expect(data.message).to.contain(`User ${userId} has cancelled participation for meal ${mealId}`);
        done();
      });
    });

    it('should return an error if the user is not a participant', (done) => {
      const userId = 999; // Assuming user ID 999 is not a participant
      const mealId = 1;

      mealService.cancelParticipation(userId, mealId, (error, data) => {
        expect(error).to.be.an('object');
        expect(error.message).to.equal('User is not a participant of this meal');
        expect(data).to.be.null;
        done();
      });
    });
  });

  // Add more test cases for getParticipants and getParticipantDetails
});