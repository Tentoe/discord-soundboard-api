
import cookieParser from 'cookie-parser'; // TODO use or delete
import express from 'express';
import expressSession from 'express-session';

 // TODO use or delete
import * as path from 'path';

import { expressLogger, error as logError } from 'src/logger';
import { guildsRouter } from './routes/guilds' ;
import { staticDir } from 'src/config';

import { authRouter, passport } from 'src/auth';

const app = express();

app.use(expressLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(staticDir)); // use dedicated path so no false positve 200 html status is returnd

app.use('/auth', authRouter);
app.use('/api/guilds', guildsRouter);

app.use('/api/*', (req, res, next) => {
  res.status(404);
  res.json({ error:'API endpoint not found.' });
});

// catch 404 and serve index.html
app.use((req, res, next) => {
  res.sendFile(path.join(staticDir, 'index.html'));
});

// error handler
app.use((err, req, res, next) => {

  logError(err.message);
  const { name , message, stack } = err;
  const error = req.app.get('env') === 'development' ? { name, message, stack } : { message };
  res.status(err.status || 500);
  res.json({ error });
});

export default app;
