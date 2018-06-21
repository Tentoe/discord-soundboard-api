import express from 'express';

import { login } from 'src/lib/discord';

login();

const guildsRouter = express.Router();

guildsRouter.get('/', (req, res, next) => {
  res.json('all');
});

guildsRouter.get('/:guildID',  (req, res, next) => {
  res.send(req.params);
});

export  { guildsRouter };

// get: [

//   { path: '/guild/:guildId/soundfiles', action: 'soundfiles' },
//   { path: '/guild/:guildId', action: 'guild' },
//   { path: '/:path', action: 'servestatic' },

// ],
// post: [
//   { path: '/guild/:guildId/join/:voiceId', action: 'join' },
//   { path: '/guild/:guildId/leave', action: 'leave' },
//   { path: '/guild/:guildId/play/:soundId', action: 'play' },
//   { path: '/guild/:guildId/stop', action: 'stop' },
//   { path: '/guild/:guildId/random', action: 'random' },
//   { path: '/guild/:guildId/upload', action: 'upload' },
// ],
