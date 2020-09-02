// import cycle1 from './cycles/cycle1';
// import cycle2 from './cycles/cycle2';

// const Mocha = require('mocha');
// new Mocha({
//   reporter: 'mochawesome'
// });

// async function callCycle() {
//   const token = cycle1();
//   cycle2(token);
// }

// callCycle();


// // var expect = chai.expect;
// // const request: supertest.SuperTest<supertest.Test> = supertest(app);
// // var token = '';
// // const name = 'Suryansh Srivastava from testing';
// // const email = 'suryanshsrivastava9616@gmail.com';
// // const mobile = '7042618988';
// // const password = 'Education54#';

// // /* describe('POST (Login API)', function() {
// //   it('responds with json', function(done) {
// //     request.post('/v1/api/token')
// //     .send({email: 'suryanshsrivastava8791@gmail.com', password: 'education54'})
// //     .set('Accept', 'application/json')
// //     .set('Content-Type', 'application/json')
// //     .expect(200)
// //     .end(function(err: any, res: any) {
// //       console.log(res.body);
// //       if (err) return done(err);
// //       done();
// //     });
// //   });
// // });

// // describe('GET (Admin All user)', function() {
// //   it('responds with json', function(done) {
// //     request.get('/v1/api/admin/user/all')
// //     .set('Accept', 'application/json')
// //     .set('Content-Type', 'application/json')
// //     .expect(200)
// //     .end(function(err: any, res: any) {
// //       if (err) return done(err);
// //       done();
// //     });
// //   });
// // }); */

// // function verifyResponseItems(expector: any, matcher: string) {
// //   expect(expector).to.contain(matcher);
// // }

// // describe('Testing Auth Route for User)', async () => {


// //   it('Signup user create', function (done) {
// //     request.post('/v1/api/register')
// //       .send({ name: name, email: email, mobile: mobile, password: password })
// //       .set('Accept', 'application/json')
// //       .set('Content-Type', 'application/json')
// //       .expect(200)
// //       .end(function (err: any, res: any) {
// //         if (err)
// //           return done(err);
// //         done();
// //       });
// //   });

// //   it('Login user (Generate token)', function (done) {
// //     request.post('/v1/api/token')
// //       .send({ email: email, password: password })
// //       .set('Accept', 'application/json')
// //       .set('Content-Type', 'application/json')
// //       .expect(200)
// //       .end(function (err: any, res: any) {
// //         token = res.body.data[0].token;
// //         expect(res.body.status).to.be.a('string');
// //         verifyResponseItems(res.body.message, "Logged In successfully");
// //         verifyResponseItems(res.body.data[0].userEmail, email);
// //         if (err)
// //           return done(err);
// //         done();
// //       });
// //   });

// //   it('Forgot Password', function (done) {
// //     request.post('/v1/api//forgot-password')
// //       .send({ email: email })
// //       .set('Accept', 'application/json')
// //       .set('Content-Type', 'application/json')
// //       .expect(200)
// //       .end(function (err: any, res: any) {
// //         if (err)
// //           return done(err);
// //         done();
// //       });
// //   });
// // });

// // describe('User Api', async () => {
// //   let newName = "Updated Suryansh";
// //   it('Get User information', function (done) {
// //     request.get('/v1/api/user')
// //       .set({ 'Authorization': `Bearer ${token}` })
// //       .set('Accept', 'application/json')
// //       .set('Content-Type', 'application/json')
// //       .expect(200)
// //       .end(function (err: any, res: any) {
// //         verifyResponseItems(res.body.status, "success");
// //         verifyResponseItems(res.body.message, "User Data");
// //         verifyResponseItems(res.body.data[0].name, name);
// //         verifyResponseItems(res.body.data[0].email, email);
// //         verifyResponseItems(res.body.data[0].mobile, mobile);
// //         verifyResponseItems(res.body.data[0].role, "basic");
// //         if (err)
// //           return done(err);
// //         done();
// //       });
// //   });

// //   it('Update User information', function (done) {
// //     request.put('/v1/api/user')
// //       .set({ 'Authorization': `Bearer ${token}` })
// //       .send({ name: newName })
// //       .set('Accept', 'application/json')
// //       .set('Content-Type', 'application/json')
// //       .expect(200)
// //       .end(function (err: any, res: any) {
// //         verifyResponseItems(res.body.status, "success");
// //         verifyResponseItems(res.body.message, "User details updated successfully");
// //         verifyResponseItems(res.body.data[0].name, newName);
// //         if (err)
// //           return done(err);
// //         done();
// //       });
// //   });

// //   it('Verify Updated User information', function (done) {
// //     request.get('/v1/api/user')
// //       .set({ 'Authorization': `Bearer ${token}` })
// //       .set('Accept', 'application/json')
// //       .set('Content-Type', 'application/json')
// //       .expect(200)
// //       .end(function (err: any, res: any) {
// //         verifyResponseItems(res.body.status, "success");
// //         verifyResponseItems(res.body.message, "User Data");
// //         verifyResponseItems(res.body.data[0].name, newName);
// //         verifyResponseItems(res.body.data[0].email, email);
// //         verifyResponseItems(res.body.data[0].mobile, mobile);
// //         verifyResponseItems(res.body.data[0].role, "basic");
// //         if (err)
// //           return done(err);
// //         done();
// //       });
// //   });
// // });

// // describe('Delete User', async () => {
// //   it('Delete user after perfoerming all tasks', function (done) {
// //     request.delete('/v1/api/user')
// //       .set({ 'Authorization': `Bearer ${token}` })
// //       .set('Accept', 'application/json')
// //       .set('Content-Type', 'application/json')
// //       .expect(200)
// //       .end(function (err: any, res: any) {
// //         if (err)
// //           return done(err);
// //         done();
// //       });
// //   });
// // });

// /* https://gist.github.com/bq1990/595c615970250e97f3ea */
