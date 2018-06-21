import * as path from 'path';

export const discordToken = process.env.SOUNDBOARD_DISCORD_BOT_USER_TOKEN || 'token';

export const redisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
};
// TODO make path dynamic with path.isAbsolute
export const soundFileDir = process.env.SOUNDBOARD_SOUND_FILE_DIR || path.join(process.cwd(), 'soundfiles');
export const defaultVolume = 0.3 ;
