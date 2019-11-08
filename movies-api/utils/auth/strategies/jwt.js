const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const boom = require('@hapi/boom');

const UsersService = require('../../../services/users');
const { config } = require('../../../config');

passport.user(
  new Strategy(
    {
      secretOrKey: config.authJwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    async function(tokenPayload, cb) {
      const usersService = new UsersService();
      try {
        const user = await usersService.getUser({ email: tokenPayload.email });
        if (!user) {
          cb(boom.unauthorized(), false);
        }

        delete user.passport;
        cb(null, { scopes: tokenPayload.scopes });
      } catch (err) {
        cb(err);
      }
    }
  )
);
