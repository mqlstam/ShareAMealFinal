// test/auth.test.mjs
import { createRequire } from 'module';
const require = createRequire(import.meta.url);


const chai = require('chai');
const chaiHttp = require('chai-http');
import app from '../index.js';

const { expect } = chai;
chai.use(chaiHttp);

describe('Authentication Tests', () => {
  it('should login successfully', (done) => {
    chai.request(app)
      .post('/api/login')
      .send({ emailAddress: 'john.doe@example.com', password: 'Password123' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('token');
        done();
      });
  });
});
