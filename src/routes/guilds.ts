import { Router, RequestHandler } from 'express';
import util from 'util';
import fs from 'fs';
import path from 'path';
import formidable from 'formidable';

import * as discord from 'src/lib/discord';
import * as soundfile from 'src/lib/soundfile';
import { soundFileDir, uploadConfig } from 'src/config';

// TODO write utils  module
const asyncCatch = (fn: RequestHandler)  => (req, res , next)  => fn(req, res, next).catch(next);

export const guildsRouter = Router();

guildsRouter.get('/', asyncCatch(async (req, res, next) => {
  const data = await discord.getGuilds();
  res.json({ data });
}));

guildsRouter.get('/:guildID', asyncCatch(async (req, res, next) => {
  const data = await discord.getGuild(req.params.guildID);
  res.json({ data });
}));

guildsRouter.get('/:guildId/soundfiles', asyncCatch(async (req, res, next) => {
  const data = await soundfile.getAll(req.params.guildID);
  res.json({ data });
}));

const parseFile = (req): Promise<{fields, files}> => {
  const form = Object.assign(new formidable.IncomingForm(), uploadConfig);
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
};

guildsRouter.post('/:guildId/upload', async (req, res, next) => {

  const { files : { file } } = await parseFile(req);
  const { guildId } = req.params;

  // TODO log user

  // TODO check filename (for wrong extension)
  const newFileName = file.hash + path.extname(file.name);
  const newFilePath = path.join(soundFileDir, newFileName);

  // TODO log if file already exists

  const copyFile = util.promisify(fs.copyFile);
  await copyFile(file.path, newFilePath);

  const unlink = util.promisify(fs.unlink);
  await unlink(file.path);

  await soundfile.add(file.name, newFileName, guildId);

  res.json({ data: 'File sucessfully uploaded.' });
});

// get: [

//   { path: '/guild/:guildId/soundfiles', action: 'soundfiles' },
//   +{ path: '/guild/:guildId', action: 'guild' },
//   +{ path: '/:path', action: 'servestatic' },

// ],
// post: [
//   { path: '/guild/:guildId/join/:voiceId', action: 'join' },
//   { path: '/guild/:guildId/leave', action: 'leave' },
//   { path: '/guild/:guildId/play/:soundId', action: 'play' },
//   { path: '/guild/:guildId/stop', action: 'stop' },
//   { path: '/guild/:guildId/random', action: 'random' },
//   +{ path: '/guild/:guildId/upload', action: 'upload' },
// ],
