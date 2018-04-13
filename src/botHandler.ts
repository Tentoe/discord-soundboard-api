import * as restify from 'restify';

import { status, getGuilds, joinVoiceChannel, play } from './bot';


const joinVoiceChannelHandler: restify.RequestHandlerType = (req, res, next) => {
  joinVoiceChannel(req.params.id).then(result => res.send('yay maybe?')); // TODO error hanlding
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

const playHandler: restify.RequestHandlerType = (req, res, next) => {
  const { voiceID, soundID } = req.params;
  play(voiceID, soundID);
  res.send('playing' + req.params);
  next();
};


export { joinVoiceChannelHandler, testHandler, guildsHandler, playHandler };
