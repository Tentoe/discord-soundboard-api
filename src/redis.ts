import { createClient } from 'redis';
import { promisify } from 'util';
import { redisConfig } from 'src/config';
import { error } from 'src/logger';

const client = createClient(redisConfig);

client.on('error',  err => error(`Redis ${err}`));

export const get = promisify(client.get).bind(client);
export const set = promisify(client.set).bind(client);

export const incr = promisify(client.incr).bind(client);
export const hmset = promisify(client.hmset).bind(client);
export const hmget = promisify(client.hmget).bind(client);
export const sadd = promisify(client.sadd).bind(client);
export const smembers = promisify(client.smembers).bind(client);
export const hgetall = promisify(client.hgetall).bind(client);
