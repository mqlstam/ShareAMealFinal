
import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import config from '../util/config.js';  
import server from '../index.js';


import { describe, it, before, afterEach } from 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
chai.should();  // Initialize should

describe('UC-301 Toevoegen van maaltijden', () => {
  let token;

  before((done) => {
    // Generate a valid JWT token for authentication
    token = jwt.sign({ userId: 1 }, config.secretKey);
    done();
  });


  it('TC-301-1 Verplicht veld ontbreekt', (done) => {
    chai
      .request(server)
      .post('/api/meals')
      .set('Authorization', `Bearer ${token}`)
      .send({
        description: 'Test meal description',
        imageUrl: 'https://example.com/image.jpg',
        dateTime: '2025-03-22 17:35:00',
        maxAmountOfParticipants: 10,
        price: 12.99,
        isActive: 1,
        isVega: 0,
        isVegan: 0,
        isToTakeHome: 1,
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').eql('Invalid meal name: Must be a string between 2 and 100 characters');
        done();
      });
  });

  it('TC-301-2 Niet ingelogd', (done) => {
    chai
      .request(server)
      .post('/api/meals')
      .send({
        name: 'Test Meal',
        description: 'Test meal description',
        imageUrl: 'https://example.com/image.jpg',
        dateTime: '2025-03-22 17:35:00',
        maxAmountOfParticipants: 10,
        price: 12.99,
        isActive: 1,
        isVega: 0,
        isVegan: 0,
        isToTakeHome: 1,
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message').eql('No token provided');
        done();
      });
  });

  it('TC-301-3 Maaltijd succesvol toegevoegd', (done) => {
    chai
      .request(server)
      .post('/api/meals')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test Meal',
        description: 'Test meal description',
        imageUrl: 'https://example.com/image.jpg',
        dateTime: '2025-03-22 17:35:00',
        maxAmountOfParticipants: 10,
        price: 12.99,
        isActive: 1,
        isVega: 0,
        isVegan: 0,
        isToTakeHome: 1,
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('message').eql('Meal created successfully');
        res.body.should.have.property('data');
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('name').eql('Test Meal');
        done();
      });
  });
});

describe('UC-302 Wijzigen van maaltijdgegevens', () => {
  let token;
  let mealId;

  before((done) => {
    token = jwt.sign({ userId: 1 }, config.secretKey);
    chai
      .request(server)
      .post('/api/meals')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test Meal',
        description: 'Test meal description',
        imageUrl: 'https://example.com/image.jpg',
        dateTime: '2025-03-22 17:35:00',
        maxAmountOfParticipants: 10,
        price: 12.99,
        isActive: 1,
        isVega: 0,
        isVegan: 0,
        isToTakeHome: 1,
        cookId: 1,
      })
      .end((err, res) => {
        mealId = res.body.data.id;
        done();
      });
  });

  it('TC-302-1 Verplicht velden “name” en/of “price” en/of “maxAmountOfParticipants” ontbreken', (done) => {
    chai
      .request(server)
      .put(`/api/meals/${mealId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: '',
        price: 12.99,
        maxAmountOfParticipants: 10,
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').eql('Invalid meal name: Must be a string between 2 and 100 characters');
        done();
      });
  });

  it('TC-302-2 Niet ingelogd', (done) => {
    chai
      .request(server)
      .put(`/api/meals/${mealId}`)
      .send({
        name: 'Updated Meal Name',
        price: 15.99,
        maxAmountOfParticipants: 10,
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message').eql('No token provided');
        done();
      });
  });

  it('TC-302-3 Niet de eigenaar van de data', (done) => {
    const differentToken = jwt.sign({ userId: 2 }, config.secretKey);
    chai
      .request(server)
      .put(`/api/meals/${mealId}`)
      .set('Authorization', `Bearer ${differentToken}`)
      .send({
        name: 'Updated Meal Name',
        price: 15.99,
        maxAmountOfParticipants: 10,
      })
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.have.property('message').eql('You are not authorized to update this meal');
        done();
      });
  });

  it('TC-302-4 Maaltijd bestaat niet', (done) => {
    const invalidMealId = 999;
    chai
      .request(server)
      .put(`/api/meals/${invalidMealId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Updated Meal Name',
        price: 15.99,
        maxAmountOfParticipants: 10,
      })
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message').eql('Meal not found');
        done();
      });
  });

  it('TC-302-5 Maaltijd succesvol gewijzigd', (done) => {
    chai
      .request(server)
      .put(`/api/meals/${mealId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Updated Meal Name',
        price: 15.99,
        maxAmountOfParticipants: 10,
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').eql('Meal updated successfully');
        res.body.data.should.have.property('name').eql('Updated Meal Name');
        done();
      });
  });
});

describe('UC-303 Opvragen van alle maaltijden', () => {
  it('TC-303-1 Lijst van maaltijden geretourneerd', (done) => {
    chai
      .request(server)
      .get('/api/meals')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').eql('Meals retrieved successfully');
        res.body.data.should.be.an('array');
        done();
      });
  });
});

describe('UC-304 Opvragen van maaltijd bij ID', () => {
  let mealId;
  let token;

  before((done) => {
    token = jwt.sign({ userId: 1 }, config.secretKey);
    chai
      .request(server)
      .post('/api/meals')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test Meal',
        description: 'Description for Test Meal',
        imageUrl: 'https://example.com/image.jpg',
        dateTime: '2025-03-22 17:35:00',
        maxAmountOfParticipants: 10,
        price: 12.99,
        isActive: 1,
        isVega: 0,
        isVegan: 0,
        isToTakeHome: 1,
        cookId: 1,
      })
      .end((err, res) => {
        mealId = res.body.data.id;
        done();
      });
  });

  it('TC-304-1 Maaltijd bestaat niet', (done) => {
    const invalidMealId = 999;
    chai
      .request(server)
      .get(`/api/meals/${invalidMealId}`)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message').eql('Meal not found');
        done();
      });
  });

  it('TC-304-2 Details van maaltijd geretourneerd', (done) => {
    chai
      .request(server)
      .get(`/api/meals/${mealId}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').eql('Meal retrieved successfully');
        res.body.data.should.be.an('object');
        res.body.data.should.have.property('id').eql(mealId);
        done();
      });
  });
});

describe('UC-305 Verwijderen van maaltijd', () => {
  let mealId;
  let token;

  before((done) => {
    token = jwt.sign({ userId: 1 }, config.secretKey);
    chai
      .request(server)
      .post('/api/meals')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test Meal',
        description: 'Test meal description',
        imageUrl: 'https://example.com/image.jpg',
        dateTime: '2025-03-22 17:35:00',
        maxAmountOfParticipants: 10,
        price: 12.99,
        isActive: 1,
        isVega: 0,
        isVegan: 0,
        isToTakeHome: 1,
        cookId: 1,
      })
      .end((err, res) => {
        mealId = res.body.data.id;
        done();
      });
  });

  it('TC-305-1 Niet ingelogd', (done) => {
    chai
      .request(server)
      .delete(`/api/meals/${mealId}`)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message').eql('No token provided');
        done();
      });
  });

  it('TC-305-2 Niet de eigenaar van de data', (done) => {
    const differentToken = jwt.sign({ userId: 2 }, config.secretKey);
    chai
      .request(server)
      .delete(`/api/meals/${mealId}`)
      .set('Authorization', `Bearer ${differentToken}`)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.have.property('message').eql('You are not authorized to delete this meal');
        done();
      });
  });

  it('TC-305-3 Maaltijd bestaat niet', (done) => {
    const invalidMealId = 999;
    chai
      .request(server)
      .delete(`/api/meals/${invalidMealId}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message').eql('Meal not found');
        done();
      });
  });

  it('TC-305-4 Maaltijd succesvol verwijderd', (done) => {
    chai
      .request(server)
      .delete(`/api/meals/${mealId}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        res.should.have.status(204);
        done();
      });
  });
  describe('UC-401 Aanmelden voor maaltijd', () => {
    let mealId;
    let token;
  
    before((done) => {
      token = jwt.sign({ userId: 1 }, config.secretKey);
      chai
        .request(server)
        .post('/api/meals')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Test Meal',
          description: 'Test meal description',
          imageUrl: 'https://example.com/image.jpg',
          dateTime: '2025-03-22 17:35:00',
          maxAmountOfParticipants: 2, // Set a small maxAmountOfParticipants for testing
          price: 12.99,
          isActive: 1,
          isVega: 0,
          isVegan: 0,
          isToTakeHome: 1,
          cookId: 1,
        })
        .end((err, res) => {
          mealId = res.body.data.id;
          done();
        });
    });
  
    it('TC-401-1 Niet ingelogd', (done) => {
      chai
        .request(server)
        .post(`/api/meals/${mealId}/participate`)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property('message').eql('No token provided');
          done();
        });
    });
  
    it('TC-401-2 Maaltijd bestaat niet', (done) => {
      const invalidMealId = 999;
      chai
        .request(server)
        .post(`/api/meals/${invalidMealId}/participate`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message').eql('Meal not found');
          done();
        });
    });
  
    it('TC-401-3 Succesvol aangemeld', (done) => {
      chai
        .request(server)
        .post(`/api/meals/${mealId}/participate`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').eql(`Participation successful`);
          done();
        });
    });
  });
  
  describe('UC-402 Afmelden voor maaltijd', () => {
    let mealId;
    let token;
  
    before((done) => {
      token = jwt.sign({ userId: 1 }, config.secretKey);
      chai
        .request(server)
        .post('/api/meals')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Test Meal',
          description: 'Test meal description',
          imageUrl: 'https://example.com/image.jpg',
          dateTime: '2025-03-22 17:35:00',
          maxAmountOfParticipants: 2,
          price: 12.99,
          isActive: 1,
          isVega: 0,
          isVegan: 0,
          isToTakeHome: 1,
          cookId: 1,
        })
        .end((err, res) => {
          mealId = res.body.data.id;
          chai
            .request(server)
            .post(`/api/meals/${mealId}/participate`)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
              done();
            });
        });
    });

  
    it('TC-402-1 Niet ingelogd', (done) => {
      chai
        .request(server)
        .delete(`/api/meals/${mealId}/participate`)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property('message').eql('No token provided');
          done();
        });
    });

  
    
  });
});
