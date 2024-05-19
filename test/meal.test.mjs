import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import config from '../util/config.js';  // Import the config object
import server from '../index.js';



chai.use(chaiHttp);
const expect = chai.expect;


describe('UC-301 Toevoegen van maaltijden', () => {
  let token;

  before((done) => {
    // Generate a valid JWT token for authentication
    token = jwt.sign({ userId: 1 }, config.secretKey);
    done();
  });

  describe('Randvoorwaarden', () => {
    it('TC-301-1 Gebruiker is ingelogd en heeft een geldig token', (done) => {
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
          done();
        });
    });
  });

  describe('Basisscenario', () => {
    it('TC-301-2 Alle vereiste gegevens zijn aanwezig', (done) => {
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
          done();
        });
    });
  });

  describe('Alternatieve paden', () => {
    describe('A. Gebruiker is niet ingelogd', () => {
      it('TC-301-3 Maaltijdinformatie wordt niet gepersisteerd', (done) => {
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
    });

    describe('B. Eén of meer ingevoerde velden van de maaltijdinformatie zijn niet valide of ontbreken', () => {
      it('TC-301-4 Naam ontbreekt', (done) => {
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

      it('TC-301-5 Datum/tijd is in het verleden', (done) => {
        chai
          .request(server)
          .post('/api/meals')
          .set('Authorization', `Bearer ${token}`)
          .send({
            name: 'Test Meal',
            description: 'Test meal description',
            imageUrl: 'https://example.com/image.jpg',
            dateTime: '2020-03-22 17:35:00', // Past date
            maxAmountOfParticipants: 10,
            price: 12.99,
            isActive: 1,
            isVega: 0,
            isVegan: 0,
            isToTakeHome: 1,
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('message').eql('Invalid meal date and time: Must be a valid future date and time');
            done();
          });
      });

      // Voeg hier meer testcases toe voor andere validatiefouten
    });
  });
  describe('UC-302 Wijzigen van maaltijdgegevens', () => {
    let token;
    let mealId;
  
    before((done) => {
      // Generate a valid JWT token for authentication
      token = jwt.sign({ userId: 1 }, config.secretKey);
  
      // Create a new meal to be used for updating
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
          mealId = res.body.data.id;
          done();
        });
    });
  
    describe('Randvoorwaarden', () => {
      it('TC-302-1 Alleen de eigenaar van de maaltijd mag deze wijzigen', (done) => {
        const differentToken = jwt.sign({ userId: 2 }, config.secretKey);
        const updatedMeal = {
          name: 'Updated Meal Name',
        };
        chai
          .request(server)
          .put(`/api/meals/${mealId}`)
          .set('Authorization', `Bearer ${differentToken}`)
          .send(updatedMeal)
          .end((err, res) => {
            res.should.have.status(403);
            res.body.should.have.property('message').eql('You are not authorized to update this meal');
            done();
          });
      });
    });
  
    describe('Precondities', () => {
      it('TC-302-2 Gebruiker heeft een geldig token', (done) => {
        const updatedMeal = {
          name: 'Updated Meal Name',
        };
        chai
          .request(server)
          .put(`/api/meals/${mealId}`)
          .set('Authorization', `Bearer ${token}`)
          .send(updatedMeal)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message').eql('Meal updated successfully');
            res.body.data.should.have.property('name').eql('Updated Meal Name');
            done();
          });
      });
  
      it('TC-302-3 Te wijzigen maaltijd bestaat niet', (done) => {
        const invalidMealId = 999;
        const updatedMeal = {
          name: 'Updated Meal Name',
        };
        chai
          .request(server)
          .put(`/api/meals/${invalidMealId}`)
          .set('Authorization', `Bearer ${token}`)
          .send(updatedMeal)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.have.property('message').eql('Meal not found');
            done();
          });
      });
  
      it('TC-302-4 Ontbrekende of ongeldige velden', (done) => {
        const updatedMeal = {
          name: '', // Invalid name
        };
        chai
          .request(server)
          .put(`/api/meals/${mealId}`)
          .set('Authorization', `Bearer ${token}`)
          .send(updatedMeal)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('message').eql('Invalid meal name: Must be a string between 2 and 100 characters');
            done();
          });
      });
    });
  
    describe('Basisscenario', () => {
      it('TC-302-5 Maaltijd succesvol gewijzigd', (done) => {
        const updatedMeal = {
          name: 'Updated Meal Name',
          description: 'Updated description',
          price: 15.99,
        };
        chai
          .request(server)
          .put(`/api/meals/${mealId}`)
          .set('Authorization', `Bearer ${token}`)
          .send(updatedMeal)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message').eql('Meal updated successfully');
            res.body.data.should.have.property('name').eql('Updated Meal Name');
            res.body.data.should.have.property('description').eql('Updated description');
            res.body.data.should.have.property('price').eql(15.99);
            done();
          });
      });
    });
  
    describe('Alternatieve paden', () => {
      describe('A. Gebruiker heeft geen toegang tot het systeem', () => {
        it('TC-302-6 Nieuwe gegevens worden niet gepersisteerd', (done) => {
          const updatedMeal = {
            name: 'Updated Meal Name',
          };
          chai
            .request(server)
            .put(`/api/meals/${mealId}`)
            .send(updatedMeal)
            .end((err, res) => {
              res.should.have.status(401);
              res.body.should.have.property('message').eql('No token provided');
              done();
            });
        });
      });
  
      describe('B. Eén of meer ingevoerde velden zijn niet valide', () => {
        it('TC-302-7 Nieuwe gegevens worden niet gepersisteerd', (done) => {
          const updatedMeal = {
            name: '', // Invalid name
            description: 'Updated description',
          };
          chai
            .request(server)
            .put(`/api/meals/${mealId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedMeal)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.have.property('message').eql('Invalid meal name: Must be a string between 2 and 100 characters');
              done();
            });
        });
      });
  
      describe('C. De te wijzigen maaltijd bestaat niet', () => {
        it('TC-302-8 Nieuwe gegevens worden niet gepersisteerd', (done) => {
          const invalidMealId = 999;
          const updatedMeal = {
            name: 'Updated Meal Name',
          };
          chai
            .request(server)
            .put(`/api/meals/${invalidMealId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedMeal)
            .end((err, res) => {
              res.should.have.status(404);
              res.body.should.have.property('message').eql('Meal not found');
              done();
            });
        });
      });
  
      describe('D. De gebruiker is niet de eigenaar van de maaltijd', () => {
        it('TC-302-9 Nieuwe gegevens worden niet gepersisteerd', (done) => {
          const differentToken = jwt.sign({ userId: 2 }, config.secretKey);
          const updatedMeal = {
            name: 'Updated Meal Name',
          };
          chai
            .request(server)
            .put(`/api/meals/${mealId}`)
            .set('Authorization', `Bearer ${differentToken}`)
            .send(updatedMeal)
            .end((err, res) => {
              res.should.have.status(403);
              res.body.should.have.property('message').eql('You are not authorized to update this meal');
              done();
            });
        });
      });
    });
  });
  describe('UC-303 Opvragen van alle maaltijden', () => {
    describe('Randvoorwaarden', () => {
      it('TC-303-1 Niet-geregistreerde gebruikers kunnen maaltijden opvragen', (done) => {
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
  
    describe('Basisscenario', () => {
      before((done) => {
        // Create some sample meals in the database
        chai
          .request(server)
          .post('/api/meals')
          .set('Authorization', `Bearer ${token}`)
          .send({
            name: 'Meal 1',
            description: 'Description for Meal 1',
            imageUrl: 'https://example.com/image1.jpg',
            dateTime: '2025-03-22 17:35:00',
            maxAmountOfParticipants: 10,
            price: 12.99,
            isActive: 1,
            isVega: 0,
            isVegan: 0,
            isToTakeHome: 1,
          })
          .end((err, res) => {
            chai
              .request(server)
              .post('/api/meals')
              .set('Authorization', `Bearer ${token}`)
              .send({
                name: 'Meal 2',
                description: 'Description for Meal 2',
                imageUrl: 'https://example.com/image2.jpg',
                dateTime: '2025-03-23 18:00:00',
                maxAmountOfParticipants: 8,
                price: 10.50,
                isActive: 1,
                isVega: 1,
                isVegan: 0,
                isToTakeHome: 0,
              })
              .end((err, res) => {
                done();
              });
          });
      });
  
      it('TC-303-2 Alle maaltijden worden geretourneerd', (done) => {
        chai
          .request(server)
          .get('/api/meals')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message').eql('Meals retrieved successfully');
            res.body.data.should.be.an('array').with.lengthOf(2);
            done();
          });
      });
    });
  });
  describe('UC-304 Opvragen van maaltijd bij ID', () => {
    let mealId;
  
    before((done) => {
      // Create a sample meal in the database
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
        })
        .end((err, res) => {
          mealId = res.body.data.id;
          done();
        });
    });
  
    describe('Randvoorwaarden', () => {
      it('TC-304-1 Niet-geregistreerde gebruikers kunnen details van maaltijden opvragen', (done) => {
        chai
          .request(server)
          .get(`/api/meals/${mealId}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message').eql('Meal retrieved successfully');
            res.body.data.should.be.an('object');
            done();
          });
      });
    });
  
    describe('Basisscenario', () => {
      it('TC-304-2 Details van de maaltijd worden geretourneerd', (done) => {
        chai
          .request(server)
          .get(`/api/meals/${mealId}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message').eql('Meal retrieved successfully');
            res.body.data.should.be.an('object');
            res.body.data.should.have.property('id').eql(mealId);
            res.body.data.should.have.property('name').eql('Test Meal');
            res.body.data.should.have.property('description').eql('Description for Test Meal');
            // Check other properties as needed
            done();
          });
      });
    });
  
    describe('Alternatieve paden', () => {
      it('TC-304-3 Opgegeven maaltijd bestaat niet', (done) => {
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
    });
  });
  describe('UC-305 Verwijderen van maaltijd', () => {
    let token;
    let mealId;
  
    before((done) => {
      // Generate a valid JWT token for authentication
      token = jwt.sign({ userId: 1 }, config.secretKey);
  
      // Create a new meal to be used for deletion
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
          mealId = res.body.data.id;
          done();
        });
    });
  
    describe('Randvoorwaarden', () => {
      it('TC-305-1 Aanmeldingen voor de maaltijd worden ook verwijderd', (done) => {
        // Add some participants to the meal
        chai
          .request(server)
          .post(`/api/meals/${mealId}/participate`)
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            chai
              .request(server)
              .delete(`/api/meals/${mealId}`)
              .set('Authorization', `Bearer ${token}`)
              .end((err, res) => {
                res.should.have.status(204);
                res.body.should.have.property('message').eql('Meal deleted successfully');
  
                // Check that participants are also deleted
                chai
                  .request(server)
                  .get(`/api/meals/${mealId}/participants`)
                  .set('Authorization', `Bearer ${token}`)
                  .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.have.property('message').eql('Meal not found');
                    done();
                  });
              });
          });
      });
    });
  
    describe('Precondities', () => {
      it('TC-305-2 Gebruiker heeft een geldig token', (done) => {
        chai
          .request(server)
          .delete(`/api/meals/${mealId}`)
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            res.should.have.status(204);
            res.body.should.have.property('message').eql('Meal deleted successfully');
            done();
          });
      });
  
      it('TC-305-3 Te verwijderen maaltijd bestaat niet', (done) => {
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
  
      it('TC-305-4 Gebruiker is niet de eigenaar van de maaltijd', (done) => {
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
    });
  
    describe('Basisscenario', () => {
      it('TC-305-5 Maaltijd succesvol verwijderd', (done) => {
        chai
          .request(server)
          .delete(`/api/meals/${mealId}`)
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            res.should.have.status(204);
            res.body.should.have.property('message').eql('Meal deleted successfully');
            done();
          });
      });
    });
  
    describe('Alternatieve paden', () => {
      describe('A. Gebruiker heeft geen toegang tot het systeem', () => {
        it('TC-305-6 Maaltijd wordt niet verwijderd', (done) => {
          chai
            .request(server)
            .delete(`/api/meals/${mealId}`)
            .end((err, res) => {
              res.should.have.status(401);
              res.body.should.have.property('message').eql('No token provided');
              done();
            });
        });
      });
  
      describe('B. Gebruiker is niet de eigenaar van de maaltijd', () => {
        it('TC-305-7 Maaltijd wordt niet verwijderd', (done) => {
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
      });
  
      describe('C. Te verwijderen maaltijd bestaat niet', () => {
        it('TC-305-8 Verwijdering wordt niet gepersisteerd', (done) => {
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
      });
    });
  });
});