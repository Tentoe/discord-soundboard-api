import { Router, RequestHandler } from 'express';
import util, { log } from 'util';
import fs from 'fs';
import path from 'path';
import formidable from 'formidable';
import httpErrors from 'http-errors' ;

import * as discord from 'src/lib/discord';
import * as soundfile from 'src/lib/soundfile';
import { soundFileDir, uploadConfig } from 'src/config';

// TODO write utils module
const asyncCatch = (fn: RequestHandler)  => (req, res , next)  => fn(req, res, next).catch(next);

const loggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    throw httpErrors(401, 'Please log in');
  }
};

const isAdmin =  (req, res, next) => {
  const { guildID } =  req.params;
  if (req.user && discord.isAdminOfGuild(req.user.id, guildID)) {
    next();
  } else {
    throw httpErrors(401, 'You are not authorized to do that, only administrators are authorized.');
  }
};

const canSpeak =  (req, res, next) => {
  const { guildID } =  req.params;
  if (req.user && discord.canSpeakInGuild(req.user.id, guildID)) {
    next();
  } else {
    throw httpErrors(401, 'You are not authorized to speak in that guild.');
  }
};

export const guildsRouter = Router();

// TODO set permissions on endpoints

guildsRouter.get('/', asyncCatch(async (req, res, next) => {
  const data = await discord.getGuilds();
  res.json({ data });
}));

guildsRouter.get('/:guildID', asyncCatch(async (req, res, next) => {
  const data = await discord.getGuild(req.params.guildID);
  res.json({ data });
}));

guildsRouter.get('/:guildID/soundfiles', asyncCatch(async (req, res, next) => {
  const data = await soundfile.getAll(req.params.guildID);
  res.json({ data });
}));

guildsRouter.post('/:guildID/join/:voiceID', asyncCatch(async (req, res, next) => {
  const data = await discord.join(req.params.voiceID); // TODO user guildID to check auth
  res.json({ data });
}));

guildsRouter.post('/:guildID/leave', async (req, res, next) => {
  const { guildID } = req.params;
  const data = discord.leave(guildID);
  res.json({ data:`successfully left channel ${guildID}` });
});

guildsRouter.post('/:guildID/play/:soundID', asyncCatch(async (req, res, next) => {
  const { guildID, soundID } = req.params;
  const data = await discord.play(guildID, soundID);
  res.json({ data:`successfully playing sound ${soundID} in guild ${guildID}` });
}));

guildsRouter.post('/:guildID/stop', asyncCatch(async (req, res, next) => {
  const { guildID } = req.params;
  const data = discord.stop(guildID);
  res.json({ data:`successfully stopped playing in guild ${guildID}` });
}));

guildsRouter.post('/:guildID/random', asyncCatch(async (req, res, next) => {
  const { guildID } = req.params;
  const data = await discord.playRandom(guildID);
  res.json({ data:`successfully playing random sound in guild ${guildID}` });
}));

const parseFile = (req): Promise<{fields, files}> => { // TODO utils
  const form = Object.assign(new formidable.IncomingForm(), uploadConfig);
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
};

guildsRouter.post('/:guildID/upload', loggedIn, isAdmin, async (req, res, next) => {

  const { files : { file } } = await parseFile(req);
  const { guildID } = req.params;

  // TODO log user

  // TODO check filename (for wrong extension)
  const newFileName = file.hash + path.extname(file.name);
  const newFilePath = path.join(soundFileDir, newFileName);

  // TODO log if file already exists

  const copyFile = util.promisify(fs.copyFile);
  await copyFile(file.path, newFilePath);

  const unlink = util.promisify(fs.unlink);
  await unlink(file.path);

  await soundfile.add(file.name, newFileName, guildID);

  res.json({ data: 'File sucessfully uploaded.' });
});
