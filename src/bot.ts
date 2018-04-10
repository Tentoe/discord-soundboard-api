import { mapValues } from 'lodash/object';
import * as Discord from 'discord.js';
import { join as pathJoin } from 'path';

import { formatGuilds } from './format';
import { token, defaultVolume, soundDir } from './config';
import { getSoundBoards } from './database';

const client = new Discord.Client();


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(token);

const status = () => formatGuilds(client.guilds);

const getGuilds = () => formatGuilds(client.guilds);

const joinVoiceChannel = (id: string): Promise<{ message: string }> => {

  const channel = client.channels.get(id);
  if (channel instanceof Discord.VoiceChannel) {
    return channel.join().then(connection => {
      const dispatcher = connection.playFile(pathJoin(soundDir, 'pg.mp3'));
      dispatcher.setVolume(defaultVolume);
      return { message: 'Sucessfully joined VoiceChannel: ' + channel.name };
    });
  }

  return Promise.resolve({ message: 'VoiceChannel not found' }); // TODO better error handling
};


export { status, getGuilds, joinVoiceChannel };
