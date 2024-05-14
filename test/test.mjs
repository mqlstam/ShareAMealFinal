import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';

chai.use(chaiHttp);
const expect = chai.expect;

describe('API Tests', () => {
  describe('GET /', () => {
    it('should return 200 for root route', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  // Add more test cases here for different routes and HTTP methods
});