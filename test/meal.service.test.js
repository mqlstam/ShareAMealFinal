const chai = require('chai');
const expect = chai.expect;
const mealService = require('../services/meal.service');

describe('Meal Service', () => {
  describe('create', () => {
    it('should create a new meal', (done) => {
      const newMeal = {
        name: 'Test Meal',
        description: 'This is a test meal',
        imageUrl: 'https://example.com/test-meal.jpg',
        price: 10.99,
        dateTime: new Date(),
        maxAmountOfParticipants: 5,
        isActive: true,
        isVega: false,
        isVegan: false,
        isToTakeHome: true,
        cookId: 1
      };

      mealService.create(newMeal, (error, data) => {
        expect(error).to.be.null;
        expect(data).to.be.an('object');
        expect(data).to.have.property('id');
        expect(data.name).to.equal(newMeal.name);
        done();
      });
    });
  });

  // Add more test cases for other methods
});