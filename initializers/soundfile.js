'use strict';

const { Initializer, api } = require('actionhero');
const { promisify } = require('util');
const path = require('path');

// Fields
const FILENAME = 'filename';
const NAME = 'name';

module.exports = class SoundFileInitializer extends Initializer {
  constructor() {
    super();
    this.name = 'soundfile';
    this.loadPriority = 1000;
    this.startPriority = 1000;
    this.stopPriority = 1000;
  }

  async initialize() {
    api.soundfile = { prefix: 'soundfile:', guildPrefix: 'guild:' };

    const redis = api.redis.clients.client;
    const redisINCR = promisify(redis.incr).bind(redis);
    const redisHMSET = promisify(redis.hmset).bind(redis);
    const redisHGET = promisify(redis.hget).bind(redis);
    const redisSADD = promisify(redis.sadd).bind(redis);
    const redisSMEMBERS = promisify(redis.smembers).bind(redis);

    const getNextVal = () => redisINCR(`${api.soundfile.prefix}nextval`);
    const getKey = id => `${api.soundfile.prefix}${id}`;
    const getGuildKey = id => `${api.soundfile.prefix}${api.soundfile.guildPrefix}${id}`;

    api.soundfile.add = async (name, filename, guildID) => {
      const id = await getNextVal();
      await redisHMSET(getKey(id), 'name', name, 'filename', filename);
      await redisSADD(getGuildKey(guildID), id);
    };

    api.soundfile.getPath = async id => path.join(
      api.config.soundboard.soundFileDir,
      await redisHGET(getKey(id), FILENAME),
    );

    api.soundfile.getRandom = async (guildID) => {
      const allIds = await redisSMEMBERS(getGuildKey(guildID));
      if (allIds.length === 0) throw new Error('No soundfiles found for this guild.');
      return allIds[Math.floor((Math.random() * allIds.length))];
    };

    api.soundfile.getAll = async (guildID) => {
      const soundfileIds = await redisSMEMBERS(getGuildKey(guildID));
      console.log(soundfileIds);

      const ret = soundfileIds.map(id => redisHGET(getKey(id), NAME).then(name => ({ name, id })));

      return Promise.all(ret);
    };
  }

  // async start() {}
  // async stop() {}
};
