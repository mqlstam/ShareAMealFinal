import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';
import logger from '../util/logger.js';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Meals', () => {
  let token;

  before((done) => {
    chai.request(app)
      .post('/api/login')
      .send({ emailAddress: 'm.vandullemen@server.nl', password: 'secret' })
      .end((err, res) => {
        if (err) {
          logger.error('Error during login:', err);
        } else {
          token = res.body.data.token;
          logger.info('Login successful, token received:', token);
        }
        done();
      });
  });

  describe('POST /api/meals', () => {
    it('should create a new meal', (done) => {
      const newMeal = {
        name: 'New Meal',
        description: 'A delicious new meal',
        price: 12.99,
        dateTime: '2025-03-22 17:35:00',
        maxAmountOfParticipants: 10,
        imageUrl: 'https://example.com/image.jpg',
        isActive: 1,
        isVega: 0,
        isVegan: 0,
        isToTakeHome: 1
      };
      chai.request(app)
        .post('/api/meals')
        .set('Authorization', `Bearer ${token}`)
        .send(newMeal)
        .end((err, res) => {
          if (err) {
            logger.error('Error creating meal:', err);
          } 
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('id');
          expect(res.body.data).to.have.property('name');
          expect(res.body.data).to.have.property('description');
          expect(res.body.data).to.have.property('price');
          expect(res.body.data).to.have.property('dateTime');
          expect(res.body.data).to.have.property('maxAmountOfParticipants');
          expect(res.body.data).to.have.property('imageUrl');
          done();
        });
    });
  });

  describe('GET /api/meals', () => {
    it('should get all meals', (done) => {
      chai.request(app)
        .get('/api/meals')
        .end((err, res) => {
          if (err) {
            logger.error('Error getting all meals:', err);
          }
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.an('array');
          done();
        });
    });
  });

  describe('GET /api/meals/:mealId', () => {
    it('should get a meal by ID', (done) => {
      chai.request(app)
        .get('/api/meals/1')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            logger.error('Error getting meal by ID:', err);
          } 
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('id');
          expect(res.body.data).to.have.property('name');
          expect(res.body.data).to.have.property('description');
          expect(res.body.data).to.have.property('price');
          expect(res.body.data).to.have.property('dateTime');
          expect(res.body.data).to.have.property('imageUrl');
          expect(res.body.data).to.have.property('cookId'); // Changed from 'cook'
          expect(res.body.data).to.have.property('allergenes');
          done();
        });
    });
  });

  describe('PUT /api/meals/:mealId', () => {
    it('should update a meal', (done) => {
      const updatedMeal = {
        name: 'Updated Meal',
        description: 'An updated delicious meal',
        price: 15.99,
        dateTime: '2025-03-22 17:35:00',
        maxAmountOfParticipants: 12,
        imageUrl: 'https://example.com/updated_image.jpg',
        isActive: 1,
        isVega: 0,
        isVegan: 0,
        isToTakeHome: 1
      };
      chai.request(app)
        .put('/api/meals/1')
        .set('Authorization', `Bearer ${token}`)
        .send(updatedMeal)
        .end((err, res) => {
          if (err) {
            logger.error('Error updating meal:', err);
          } 
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('id');
          expect(res.body.data).to.have.property('name', 'Updated Meal');
          expect(res.body.data).to.have.property('description', 'An updated delicious meal');
          expect(res.body.data).to.have.property('price', 15.99);
          expect(res.body.data).to.have.property('dateTime');
          expect(res.body.data).to.have.property('maxAmountOfParticipants', 12);
          expect(res.body.data).to.have.property('imageUrl');
          done();
        });
    });
  });

  describe('DELETE /api/meals/:mealId', () => {
    it('should delete a meal', (done) => {
      chai.request(app)
        .delete('/api/meals/1')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          if (err) {
            logger.error('Error deleting meal:', err);
          } 
          expect(res).to.have.status(204);
          done();
        });
    });
  });

});
