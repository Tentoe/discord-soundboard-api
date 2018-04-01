import { mapValues } from 'lodash/object';
import * as Discord from 'discord.js';
import { join as pathJoin } from 'path';

import { formatGuilds } from './format';
import { token } from './config';

const client = new Discord.Client();



client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(token);


const status = () => formatGuilds(client.guilds);

const getGuilds = () => formatGuilds(client.guilds);

const joinVoiceChannel = (id: string): Promise<string> => {

  const channel = client.channels.get(id);
  if (channel instanceof Discord.VoiceChannel) {
    return channel.join().then(connection => {
      const dispatcher = connection.playFile(pathJoin(__dirname, 'files', 'pg.mp3'));
      dispatcher.setVolume(0.5);
      return 'successfully joined';
    });
  }

  return Promise.resolve('VoiceChannel not found'); // TODO better error handling
};


export { status, getGuilds, joinVoiceChannel };
