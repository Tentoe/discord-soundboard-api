import { mapValues, get } from 'lodash/object';
import * as Discord from 'discord.js';
import { join as pathJoin } from 'path';

import { formatGuilds, formatGuild } from './format';
import { token, defaultVolume, soundDir } from './config';
import { getSoundBoards, getSoundFile, getRandomSoundFile } from './database';

const client = new Discord.Client();


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(token);

const status = () => formatGuilds(client.guilds);

const getGuilds = () => formatGuilds(client.guilds);
const getGuild = guildID => formatGuild(client.guilds.get(guildID));

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

const playGuild = async (guildID, soundID) => {// TODO consolidate with play function
  const soundFile = await getSoundFile(soundID);
  const connection = client.guilds.get(guildID).voiceConnection;

  const dispatcher = connection.playFile(pathJoin(soundDir, soundFile.filename));

  // prevent delay to build up because of a bug
  const player: any = connection.player; // TODO try catch
  player.streamingData.pausedTime = 0;

  // TODO error handling

  dispatcher.setVolume(defaultVolume);


};

const random = async voiceID => { // TODO consolidate with play function
  const soundFile = await getRandomSoundFile();
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

const randomGuild = async guildID => { // TODO consolidate with play function
  const soundFile = await getRandomSoundFile();
  const connection = client.guilds.get(guildID).voiceConnection;

  const dispatcher = connection.playFile(pathJoin(soundDir, soundFile.filename));

  // prevent delay to build up because of a bug
  const player: any = connection.player; // TODO try catch
  player.streamingData.pausedTime = 0;

  // TODO error handling

  dispatcher.setVolume(defaultVolume);


};

const stop = async voiceID => {
  const channel = client.channels.get(voiceID);
  if (channel instanceof Discord.VoiceChannel) {
    channel.connection.dispatcher.end('stop');
  } // TODO else throw NotFoundError

};

const stopGuild = async guildID => {
  const connection = client.guilds.get(guildID).voiceConnection;

  connection.dispatcher.end('stopGuild');
};

const leaveVoiceChannel = (id: string): void | { message: string } => {

  const channel = client.channels.get(id);
  if (channel instanceof Discord.VoiceChannel) {
    return channel.leave();
  }

  return { message: 'VoiceChannel not found' }; // TODO better error handling
};

const leaveVoiceChannelGuild = (id: string): void | { message: string } => {

  const channel = client.guilds.get(id).voiceConnection.channel;
  if (channel instanceof Discord.VoiceChannel) {
    return channel.leave();
  }

  return { message: 'VoiceChannel not found' }; // TODO better error handling
};

export {
  status,
  getGuilds,
  joinVoiceChannel,
  play,
  stop,
  leaveVoiceChannel,
  random,
  getGuild,
  leaveVoiceChannelGuild,
  stopGuild,
  playGuild,
  randomGuild
};
