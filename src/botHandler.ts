import * as restify from 'restify';

import { status, getGuilds, joinVoiceChannel } from './bot';


const joinVoiceChannelHandler: restify.RequestHandlerType = (req, res, next) => {
  joinVoiceChannel(req.params.id).then(result => res.send(result)); // TODO error hanlding
  next();
};

const testHandler: restify.RequestHandlerType = (req, res, next) => {
  const ret = status();
  console.log(ret);
  res.send(ret);
  next();
};

const guildsHandler: restify.RequestHandlerType = (req, res, next) => {
  res.send(getGuilds());
  next();
};


export { joinVoiceChannelHandler, testHandler, guildsHandler };
