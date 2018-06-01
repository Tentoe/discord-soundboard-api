'use strict';

const { Initializer, api } = require('actionhero');
const { promisify } = require('util');

module.exports = class SoundFileInitializer extends Initializer {
  constructor() {
    super();
    this.name = 'soundfile';
    this.loadPriority = 1000;
    this.startPriority = 1000;
    this.stopPriority = 1000;
  }

  async initialize() {
    api.soundfile = { prefix: 'soundfile:' };

    const redis = api.redis.clients.client;
    const redisINCR = promisify(redis.incr).bind(redis);
    const redisHMSET = promisify(redis.hmset).bind(redis);
    const getNextVal = () => redisINCR(`${api.soundfile.prefix}nextval`);


    api.soundfile.add = async (name, filename) => {
      const id = await getNextVal();
      await redisHMSET(`${api.soundfile.prefix}${id}`, 'name', name, 'filename', filename);
    };
  }

  // async start() {}
  // async stop() {}
};
