
import cookieParser from 'cookie-parser'; // TODO use or delete
import express from 'express';
import httpErrors from 'http-errors' ; // TODO use or delete
import * as path from 'path';

import { expressLogger } from './logger';
import { indexRouter } from './routes/index' ;

const app = express();

app.use(expressLogger);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.get('/aaa', (req, res) => {
  throw new Error('BROKEN'); // Express will catch this on its own.
});

// catch 404 and serve index.html
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// error handler
app.use((err, req, res, next) => {
  const { message, stack } = err;
  const error = req.app.get('env') === 'development' ? { message, stack } : { message };
  res.status(err.status || 500);
  res.json({ error });
});

export default app;
