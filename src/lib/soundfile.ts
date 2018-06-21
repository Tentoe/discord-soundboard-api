
import * as path from 'path';
import * as redis from 'src/redis';
import { getKey } from 'src/redis-schema';
import { Soundfile, RawSoundfile } from 'src/models';

// TODO write integration test

const getNextVal = guildID =>
  redis.incr(getKey.guild(guildID));

export const add = async (name: string, filename: string, guildID: string | number) => {
  const soundID = await getKey.soundfileNextval(guildID);
  await redis.hmset(getKey.soundfile(guildID, soundID), { name, filename });
  await redis.sadd(getKey.soundfiles(guildID), soundID);
};

export const get = async (guildID, soundID) => {
  const raw: RawSoundfile = await redis.hgetall(getKey.soundfile(guildID, soundID));
  return new Soundfile(raw);
};

export const getRandomSoundfileID = async (guildID) => {
  const allIds = await redis.smembers(getKey.soundfiles(guildID));
  if (allIds.length === 0) throw new Error('No soundfiles found for this guild.');
  return allIds[Math.floor((Math.random() * allIds.length))];
};

export const getAll = (guildID) => {
  const soundfileIds = redis.smembers(getKey.soundfiles(guildID));

  const ret = soundfileIds.map(soundID => get(guildID, soundID));

  return Promise.all(ret);
};
