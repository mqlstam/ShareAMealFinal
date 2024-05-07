const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

chai.should();
chai.use(chaiHttp);

describe('Share-a-Meal API', () => {
  describe('GET /', () => {
    it('should return the welcome message', (done) => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.text.should.equal('Share-a-Meal API is running!');
          done();
        });
    });
  });

  // Add more test cases for API endpoints
});