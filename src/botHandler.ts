import * as restify from 'restify';

import { status, getGuilds, joinVoiceChannel, play, stop, leaveVoiceChannel, random } from './bot';


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
  res.send('playing' + JSON.stringify(req.params));
  next();
};

const voiceChannelStop: restify.RequestHandlerType = (req, res, next) => {
  stop(req.params.id);
  res.send('stopped' + req.params.id);
  next();
};

const voiceChannelLeave: restify.RequestHandlerType = (req, res, next) => {
  leaveVoiceChannel(req.params.id);
  res.send('left' + req.params.id);
  next();
};

const randomHandler: restify.RequestHandlerType = (req, res, next) => {
  random(req.params.voiceID);
  res.send('playing random');
  next();
};

export { joinVoiceChannelHandler, testHandler, guildsHandler, playHandler, voiceChannelStop, voiceChannelLeave, randomHandler };
