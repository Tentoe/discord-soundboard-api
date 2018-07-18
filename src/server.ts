
import { createServer } from 'http';
import app from './app';
import { info, error as logError } from './logger';

const listenPort = normalizePort(process.env.PORT || '3000');
app.set('port', listenPort);

const server = createServer(app);
server.listen(listenPort);

server.on('error', onError);
server.on('listening', () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;

  info(`Listening on ${bind}`);
});

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) { return val; } // named pipe

  if (port >= 0) { return port; }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  // TODO Test
  const bind = typeof listenPort === 'string' ? `pipe ${listenPort}` : `port ${listenPort.port}`;

  switch (error.code) {
    case 'EACCES':
      logError(`${bind} requires elevated privileges`);

      process.exit(1);
      break;
    case 'EADDRINUSE':
      logError(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}
