
import cookieParser from 'cookie-parser'; // TODO use or delete
import express from 'express';
import httpErrors from 'http-errors' ; // TODO use or delete
import * as path from 'path';

import { expressLogger, error as logError } from 'src/logger';
import { guildsRouter } from './routes/guilds' ;
import { staticDir } from 'src/config';

const app = express();

app.use(expressLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(staticDir));

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
  const { message, stack } = err;
  const error = req.app.get('env') === 'development' ? { message, stack } : { message };
  res.status(err.status || 500);
  res.json({ error });
});

export default app;
