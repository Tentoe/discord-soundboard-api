import { Router, RequestHandler } from 'express';
import passport from 'passport';

import { Strategy as OAuth2Strategy, User } from 'passport-discord';
import { info } from 'src/logger';
import { clientID, clientSecret, baseURL } from 'src/config';

const authRouter = Router();

passport.use(
    new OAuth2Strategy(
      {
        clientID,
        clientSecret,
        callbackURL: `${baseURL}/api/auth/discord/callback`,
        scope: 'identify',
      },
      (accessToken, refreshToken, profile, cb) => cb(null, profile), // TODO save token
));

passport.serializeUser((user, done) => done(null, JSON.stringify(user)));

passport.deserializeUser((userString, done) => done(null, JSON.parse(userString)));

authRouter.get('/discord', passport.authenticate('discord'));
authRouter.get(
  '/discord/callback',
  passport.authenticate('discord', { failureRedirect: '/error/login' }), // TODO add page for failed login
  (req: any, res) => {
    const { username, id } = req.user;
    info(`User logged in:${username} id:${id}`);
    res.redirect('/');
  });

export { passport, authRouter };
