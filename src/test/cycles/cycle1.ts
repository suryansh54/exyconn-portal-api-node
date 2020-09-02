/* Test modules */
import supertest from 'supertest';
import chai from 'chai';

/* Main app */
import app from '../../app';

/* Config modules */
import userObj from '../config.test';

/* Utils */
import verifyResponseItems from '../utils/common';

/* Public variables */
const expect = chai.expect;
const request: supertest.SuperTest<supertest.Test> = supertest(app);

const cycle1 = () => {
  let token = null;
  // Signup user
  // describe('Testing Auth Route for User', () => {
  //   it('Signup user create', (done) => {
  //     request.post('/v1/api/register')
  //       .send({ name: userObj.name, email: userObj.email, mobile: userObj.mobile, password: userObj.password })
  //       .set('Accept', 'application/json')
  //       .set('Content-Type', 'application/json')
  //       .expect(200)
  //       .end(function (err: any, res: any) {
  //         if (err)
  //           return done(err);
  //         done();
  //       });
  //   });

  it('Login user (Generate token)', (done) => {
      request.post('/v1/api/token')
        .send({ email: userObj.email, password: userObj.password })
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .expect(200)
        .end(function (err: any, res: any) {
          token = res.body.data[0].token;
          expect(res.body.status).to.be.a('string');
          verifyResponseItems(res.body.message, 'Logged In successfully');
          verifyResponseItems(res.body.data[0].userEmail, userObj.email);
          if (err) {
            return done(err);
          }
          done();
        });
    });

    // Login user
    // it('Login user (Generate token)', (done) => {
      // request.post('/v1/api/token')
      //   .send({ email: userObj.email, password: userObj.password })
      //   .set('Accept', 'application/json')
      //   .set('Content-Type', 'application/json')
      //   .expect(200)
      //   .end(function (err: any, res: any) {
      //     token = res.body.data[0].token;
      //     expect(res.body.status).to.be.a('string');
      //     verifyResponseItems(res.body.message, "Logged In successfully");
      //     verifyResponseItems(res.body.data[0].userEmail, userObj.email);
      //     if (err)
      //       return done(err);
      //     done();
      //   });
    // });
  // });
  console.log('df', token);
  return token;
};

export default cycle1;
