import * as restify from 'restify';

import {
  status,
  getGuilds,
  joinVoiceChannel,
  play,
  stop,
  leaveVoiceChannel,
  random,
  getGuild,
  leaveVoiceChannelGuild,
  stopGuild,
  playGuild,
  randomGuild
} from './bot';


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

const playGuildHandler: restify.RequestHandlerType = (req, res, next) => {
  const { guildID, soundID } = req.params;
  playGuild(guildID, soundID);
  res.send('playing' + JSON.stringify(req.params));
  next();
};

const voiceChannelStop: restify.RequestHandlerType = (req, res, next) => {
  stop(req.params.id);
  res.send('stopped' + req.params.id);
  next();
};

const voiceChannelGuildStop: restify.RequestHandlerType = (req, res, next) => {
  stopGuild(req.params.id);
  res.send('stopped' + req.params.id);
  next();
};


const voiceChannelLeave: restify.RequestHandlerType = (req, res, next) => {
  leaveVoiceChannel(req.params.id);
  res.send('left' + req.params.id);
  next();
};

const voiceChannelGuildLeave: restify.RequestHandlerType = (req, res, next) => {
  leaveVoiceChannelGuild(req.params.id);
  res.send('left' + req.params.id);
  next();
};

const randomHandler: restify.RequestHandlerType = (req, res, next) => {
  random(req.params.voiceID);
  res.send('playing random' + JSON.stringify(req.params));
  next();
};

const randomGuildHandler: restify.RequestHandlerType = (req, res, next) => {
  randomGuild(req.params.id);
  res.send('playing random' + JSON.stringify(req.params));
  next();
};

const guildHandler: restify.RequestHandlerType = (req, res, next) => {
  res.send(getGuild(req.params.id));
  next();
};

export {
  joinVoiceChannelHandler,
  testHandler,
  guildsHandler,
  playHandler,
  voiceChannelStop,
  voiceChannelLeave,
  randomHandler,
  guildHandler,
  voiceChannelGuildLeave,
  voiceChannelGuildStop,
  playGuildHandler,
  randomGuildHandler
};
