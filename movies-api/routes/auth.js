const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const ApiKeysService = require('../services/apiKeys');
const UsersService = require('../services/users');
const validationHandler = require('../utils/middleware/validationHandler');
const { createUserSchema } = require('../utils/schemas/users');
const { config } = require('../config');

//Basic
require('../utils/auth/strategies/basic');

function authApi(app) {
  const router = express.Router();
  app.use('/api/auth', router);

  const apiKeysService = new ApiKeysService();
  const userService = new UsersService();

  router.post('/sign-in', async function(req, res, next) {
    const { apiKeyToken } = req.body;

    if (!apiKeyToken) {
      next(boom.unauthorized('apiKeyToken is required'));
    }

    passport.authenticate('basic', function(error, user) {
      try {
        if (error || !user) {
          next(boom.unauthorized());
        }
        console.log('apyKey', apiKeyToken);
        req.login(user, { session: false }, async function(error) {
          if (error) {
            next(error);
          }
          const apiKey = await apiKeysService.getApiKey({ token: apiKeyToken });
          console.log('apyKey2', apiKey);
          if (!apiKey) {
            next(boom.unauthorized());
          }

          const { _id: id, name, email } = user;

          const payload = {
            sub: id,
            name,
            email,
            scopes: apiKey.scopes
          };
          const token = jwt.sign(payload, config.authJwtSecret, {
            expiresIn: '15m'
          });
          res.status(200).json({
            token,
            user: { id, name, email }
          });
        });
      } catch (err) {
        next(err);
      }
    })(req, res, next);
  });

  router.post('/sign-up', validationHandler(createUserSchema), async function(
    req,
    res,
    next
  ) {
    const { body: user } = req;
    try {
      const createdUserId = await userService.createUser({ user });
      res.status(201).json({
        data: createdUserId,
        message: 'User created'
      });
    } catch (error) {
      next(error);
    }
  });
}

module.exports = authApi;