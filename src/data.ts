import * as restify from 'restify';
import { getSoundFiles } from './database';

const soundBoardsHandler: restify.RequestHandlerType = async (req, res, next) => {

  res.send(await getSoundFiles());
  next();
};

export { soundBoardsHandler };
