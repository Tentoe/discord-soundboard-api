const path = require('path');

exports.default = {
  soundboard: api => ({
    soundFileDir: process.env.SOUNDBOARD_SOUND_FILE_DIR || path.join(process.cwd(), 'soundfiles'),
  }),
};
