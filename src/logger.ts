import * as winston from 'winston';
import * as expressWinston from 'express-winston';

const transports = [new (winston.transports.Console)({ json: true })];

const expressLogger = expressWinston.logger({
  transports,
  msg: 'HTTP {{req.method}} {{req.url}}',

});

const logger = new (winston.Logger)({
  transports,
});

const { log } = winston;

export { expressLogger, log };
