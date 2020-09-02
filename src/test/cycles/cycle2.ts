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

const cycle2 = (token: any) => {
  console.log('Suryanshaaaaa', token);
};

export default cycle2;
