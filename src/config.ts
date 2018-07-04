import * as path from 'path';
import os from 'os';

export const baseURL = process.env.SOUNDBOARD_BASE_URL || 'http://localhost:3000';

export const discordToken = process.env.SOUNDBOARD_DISCORD_BOT_USER_TOKEN || 'token';

export const redisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
};
// TODO make path dynamic with path.isAbsolute
export const soundFileDir = process.env.SOUNDBOARD_SOUND_FILE_DIR || path.join(process.cwd(), 'soundfiles');
export const defaultVolume = 0.3 ;
export const uploadConfig = {
  uploadDir: os.tmpdir(),
  keepExtensions: false,
  maxFieldsSize: 1024 * 1024 * 50, // 50MB
  hash: 'sha512',
};

export const staticDir = process.env.SOUNDBOARD_STATIC_DIR || path.join(process.cwd(), 'built', 'static');

export const clientID = process.env.SOUNDBOARD_DISCORD_CLIENT_ID || '';
export const clientSecret = process.env.SOUNDBOARD_DISCORD_CLIENT_SECRET || '';
