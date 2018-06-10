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
    api.soundfile = {
      nextvalSuffix: 'nextval',
      soundfilesSuffix: 'soundfiles',
      soundfilePrefix: 'soundfile',
      guildPrefix: 'sb:guild',
    };

    const redis = api.redis.clients.client;
    const redisINCR = promisify(redis.incr).bind(redis);
    const redisHMSET = promisify(redis.hmset).bind(redis);
    const redisHGET = promisify(redis.hget).bind(redis);
    const redisSADD = promisify(redis.sadd).bind(redis);
    const redisSMEMBERS = promisify(redis.smembers).bind(redis);

    const getKeyBase = guildID => `${api.soundfile.guildPrefix}:${guildID}`;
    const getKey = (guildID, id) => `${getKeyBase(guildID)}:${api.soundfile.soundfilePrefix}:${id}`;
    const getSoundboardsKey = guildID => `${getKeyBase(guildID)}:${api.soundfile.soundfilesSuffix}`;
    const getNextVal = guildID =>
      redisINCR(`${getKeyBase(guildID)}:${api.soundfile.soundfilePrefix}:${api.soundfile.nextvalSuffix}`);

    api.soundfile.add = async (name, filename, guildID) => {
      const id = await getNextVal(guildID);

      await redisHMSET(getKey(guildID, id), 'name', name, 'filename', filename);
      await redisSADD(getSoundboardsKey(guildID), id);
    };

    api.soundfile.getPath = async (guildID, id) => path.join(
      api.config.soundboard.soundFileDir,
      await redisHGET(getKey(guildID, id), FILENAME),
    );

    api.soundfile.getRandom = async (guildID) => {
      const allIds = await redisSMEMBERS(getSoundboardsKey(guildID));
      if (allIds.length === 0) throw new Error('No soundfiles found for this guild.');
      return allIds[Math.floor((Math.random() * allIds.length))];
    };

    api.soundfile.getAll = async (guildID) => {
      const soundfileIds = await redisSMEMBERS(getSoundboardsKey(guildID));

      const ret = soundfileIds.map(id =>
        redisHGET(getKey(guildID, id), NAME).then(name => ({ name, id })));

      return Promise.all(ret);
    };
  }

  // async start() {}
  // async stop() {}
};
