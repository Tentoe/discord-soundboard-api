
console.log('test');

console.log(process.env.NODE_PATH);

import cookieParser from 'cookie-parser'; // TODO use or delete
import express from 'express';
import httpErrors from 'http-errors' ; // TODO use or delete
import * as path from 'path';

import { expressLogger } from './logger';
import { guildsRouter } from './routes/guilds' ;

const app = express();

app.use(expressLogger);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'static')));

app.use('/guilds', guildsRouter);

// catch 404 and serve index.html
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

// error handler
app.use((err, req, res, next) => {
  const { message, stack } = err;
  const error = req.app.get('env') === 'development' ? { message, stack } : { message };
  res.status(err.status || 500);
  res.json({ error });
});

export default app;
