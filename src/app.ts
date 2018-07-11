
import cookieParser from 'cookie-parser'; // TODO use or delete
import express from 'express';
import expressSession from 'express-session';
import * as path from 'path';

import { staticDir } from 'src/config';
import { expressLogger, error as logError } from 'src/logger';
import { guildsRouter } from './routes/guilds' ;
import { authRouter, passport } from 'src/routes/auth';
import { statusRouter } from 'src/routes/status';

const app = express();

app.use(expressLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({
  secret: 'keyboard cat', // TODO chnge for produciton
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(staticDir)); // TODO use dedicated path so no false positve 200 html status is return

app.use('/api/auth', authRouter);
app.use('/api/status', statusRouter);
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
