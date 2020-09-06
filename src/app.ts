// Environment variables
import dotenv from 'dotenv';
dotenv.config();

// Dependencies
import express from 'express';
const app = require('express')();
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const swaggerDocument = require('./swagger/swagger.json');

// Custom Dependencies
import { db } from './modules/connection';
import upload from './modules/routes/upload';
import { Messages } from './modules/utils/enums/message';

// Port
const port = process.env.PORT || 3001;

// Root variables
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 200, // limit each IP to 100 requests per windowMs
});

// Routing imports
import authModule from './modules/routes/auth';
import adminModule from './modules/routes/admin';
import oauthModule from './modules/routes/oauth';
import userModule from './modules/routes/user';
import queryModule from './modules/routes/query';
import otpVerification from './modules/routes/otpVerification';
import financeModule from './modules/routes/finance';

// Reporting Modules
const path = require('path');

/* -----------Middleware-----------|START---- */
app.use(cors());
app.use(function (req: any, res: any, next: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(limiter);
/* -----------Middleware-----------|END---- */

/* -----------Swagger-----------|START---- */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
/* -----------Swagger-----------|END---- */

/* -----------Routes-----------|START---- */
app.use('/v1/api', authModule);
app.use('/v1/api', upload);
app.use('/v1/api/admin', adminModule);
app.use('/v1/api/oauth', oauthModule);
app.use('/v1/api', userModule);
app.use('/v1/api', queryModule);
app.use('/v1/api', otpVerification);
app.use('/v1/api', financeModule);
app.use('/files', express.static('uploads'));
/* -----------Routes-----------|START---- */

const startServer = async () => {
  await db();
  app.listen(port, '0.0.0.0', () =>
    console.log(`${Messages.PORT_LISTEN} ${port}!`)
  );
  app.get('/', (req: any, res: any) => res.send(Messages.WELCOME));
};
startServer();

app.use(express.static('mochawesome-report'));

export default app;
