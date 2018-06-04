const path = require('path');

exports.default = {
  soundboard: api => ({
    soundFileDir: process.env.SOUNDBOARD_SOUND_FILE_DIR || path.join(process.cwd(), 'soundfiles'),
    discordToken: process.env.SOUNDBOARD_DISCORD_BOT_USER_TOKEN || 'noTOKEN',
    defaultVolume: 0.3,
  }),
};
