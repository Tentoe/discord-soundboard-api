import { mapValues, get } from 'lodash/object';
import * as Discord from 'discord.js';
import { join as pathJoin } from 'path';

import { formatGuilds } from './format';
import { token, defaultVolume, soundDir } from './config';
import { getSoundBoards, getSoundFile } from './database';

const client = new Discord.Client();


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(token);

const status = () => formatGuilds(client.guilds);

const getGuilds = () => formatGuilds(client.guilds);

const joinVoiceChannel = (id: string): Promise<Discord.VoiceConnection | { message: string }> => {

  const channel = client.channels.get(id);
  if (channel instanceof Discord.VoiceChannel) {
    return channel.join();
  }

  return Promise.resolve({ message: 'VoiceChannel not found' }); // TODO better error handling
};

const play = async (voiceID, soundID) => {
  const soundFile = await getSoundFile(soundID);
  const channel = client.channels.get(voiceID);
  if (channel instanceof Discord.VoiceChannel) {
    const dispatcher = channel.connection.playFile(pathJoin(soundDir, soundFile.filename));

    // prevent delay to build up because of a bug
    const player: any = channel.connection.player; // TODO try catch
    player.streamingData.pausedTime = 0;

    // TODO error handling

    dispatcher.setVolume(defaultVolume);
  } // TODO else throw NotFoundError

};

const stop = async voiceID => {
  const channel = client.channels.get(voiceID);
  if (channel instanceof Discord.VoiceChannel) {
    channel.connection.dispatcher.end('stop');
  } // TODO else throw NotFoundError

};

const leaveVoiceChannel = (id: string): void | { message: string }  => {

  const channel = client.channels.get(id);
  if (channel instanceof Discord.VoiceChannel) {
    return channel.leave();
  }

  return { message: 'VoiceChannel not found' }; // TODO better error handling
};

export { status, getGuilds, joinVoiceChannel, play, stop , leaveVoiceChannel};
