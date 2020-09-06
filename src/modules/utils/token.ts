const jwt = require('jsonwebtoken');

import { userModel as User } from '../dbModals/user';
import { StatusMessages, Messages } from './enums/message';

const jwtOptions = {
  issuer: process.env.TOKEN_ISSUER,
  subject: process.env.TOKEN_SUBJECT,
  audience: process.env.TOKEN_AUDIENCE,
  expiresIn: process.env.TOKEN_EXPIRE_TIME,
  algorithm: process.env.TOKEN_ALGORITHM
};

const verifyToken = async (req: any, res: any, next: any) => {
  const authorizationToken = req.headers.authorization;
  if (!authorizationToken) {
    return res.status(401).json(
      {
        status: StatusMessages.ERROR,
        message: Messages.NO_AUTHORIZATION_HEADER
      }
    );
  } else {
    if (authorizationToken.split(' ').length === 2) {
      const tokenType: string = authorizationToken.split(' ')[0];
      const token: string = authorizationToken.split(' ')[1];
      if (tokenType !== 'Bearer') {
        return res.status(401).json(
          {
            status: StatusMessages.ERROR,
            message: Messages.INVALID_TOKEN_TYPE
          }
        );
      } else if (token === null || !token) {
        return res.status(401).json(
          {
            status: StatusMessages.ERROR,
            message: Messages.UNAUTHORIZED_REQUEST
          }
        );
      } else {
        let verified;
        try {
          verified = jwt.verify(token, process.env.PRIVATE_KEY, jwtOptions);
        } catch (error) {
          if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json(
              {
                status: StatusMessages.ERROR,
                message: error.message,
              }
            );
          } else {
            return res.status(400).end();
          }
        }
        if (verified._id) {
          req.userId = verified._id;
          req.role = verified.role;
          res.locals.loggedInUser = await User.findById(verified._id);
          next();
        } else {
          return res.status(400).json(
            {
              status: StatusMessages.ERROR,
              message: Messages.INVALID_TOKEN
            }
          );
        }
      }
    } else {
      return res.status(401).send(
        {
          status: StatusMessages.ERROR,
          message: Messages.UNAUTHORIZED_REQUEST
        }
      );
    }
  }
};

const oAuthGoogleTokenVerify = (req: any, res: any, next: any) => {
  next();
};

const oAuthFacebookTokenVerify = (req: any, res: any, next: any) => {
  next();
};

const jwtTokenGenerate = (payload: any) => {
  const token = jwt.sign(payload, process.env.PRIVATE_KEY, jwtOptions);
  return token;
};

export { jwtTokenGenerate, verifyToken, oAuthGoogleTokenVerify, oAuthFacebookTokenVerify };
