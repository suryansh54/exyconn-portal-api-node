import supertest from 'supertest';
import app from '../../app';
const request: supertest.SuperTest<supertest.Test> = supertest(app);

interface IUserAuth {
  email: string;
  password: string;
}

export default function token(credential: IUserAuth, auth: any) {
  return function (done: any) {
    request
      .post('/auth/local')
      .send(credential)
      .expect(200)
      .end(onResponse);

    function onResponse(err: any, res: any) {
      auth.token = res.body.data[0].token;
      return done();
    }
  };
}
