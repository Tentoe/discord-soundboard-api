import { createLogger, format, transports as winstonTransports } from 'winston';
import morgan from 'morgan';

const expressLogger = morgan('dev');

const logger = createLogger({
  transports: [new winstonTransports.Console()],
  format: format.json(),
});

const { info, warn, error } = logger;

export {  expressLogger  , info, warn, error };
