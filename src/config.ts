import { join as pathJoin } from 'path';

const token = process.env.DISCORD_BOT_USER_TOKEN || 'noTOKEN';
const defaultVolume = 0.3;
const dbURL = process.env.SOUNDBOARD_DB || 'mongodb://localhost/soundboard';

const soundDir = pathJoin(__dirname, 'files');

export { token, defaultVolume, dbURL, soundDir };
