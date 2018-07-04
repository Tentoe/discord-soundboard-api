
import * as Discord from 'discord.js';
import { info, error } from 'src/logger';
import { discordToken, defaultVolume } from 'src/config';

import { formatGuild, formatGuilds } from './format';
import { get as getSoundfile, getRandomSoundfileID } from 'src/lib/soundfile';

const client = new Discord.Client();

client.on('ready', () => {
  info(`Logged into Discord as ${client.user.tag}`);
});

export const login = () => client.login(discordToken);

export const getGuilds = () => formatGuilds(client.guilds);

export const getGuild = (id) => {
  const guild = client.guilds.get(id);
  if (guild) return formatGuild(guild);
  throw new Error('Requested guild not found.');
};

export const leave = (guildID: string) => {
  client.guilds.get(guildID).voiceConnection.disconnect();
};

export const stop = (guildID: string) => {
  const connection = client.guilds.get(guildID).voiceConnection;
  if (!connection) throw new Error('Bot is not currently playing anything.');

  connection.dispatcher.end('const stop');
};

export const join = async (voiceID: string) => {
  const channel = client.channels.get(voiceID);
  if (channel instanceof Discord.VoiceChannel) {
    await channel.join();
    channel.connection.on('error', error);
    channel.connection.on('warn', error);
    channel.connection.on('failed', error);
    return;
  }
  throw new Error('Voicechannel not found.');
};

export const play = async (guildID: string, soundID: string) => {
  const soundFile = await getSoundfile(guildID, soundID);
  const guild = client.guilds.get(guildID);
  if (!guild) throw new Error('Guild not found.');
  if (!guild.voiceConnection) throw new Error('Bot not connected to a voice channel.');

  const dispatcher = guild.voiceConnection.playFile(soundFile.getPath());
  dispatcher.setVolume(defaultVolume);

  // prevent delay to build up because of a bug
  try {
    if (!guild.voiceConnection.player) {
      throw new Error('Player property of voice connection not found in delay bug workaround.');
    }
    const player: any = guild.voiceConnection.player;
    player.streamingData.pausedTime = 0;
  } catch (err) {
    err(err);
  }
};

export const playRandom = async (guildID) => {
  const randomId = await getRandomSoundfileID(guildID);
  await play(guildID, randomId);
};

const getMember = (userID: string, guildID: string) => {
  if (!guildID) throw new Error(`no guildID in path: ${guildID}`);
  const guild = client.guilds.get(guildID);
  if (!guild) throw new Error('guild not found');
  const member = guild.members.get(userID);
  if (!member) throw new Error('user not in guild');
  return member;
};

// TODO test case no admin
export const isAdminOfGuild = (userID: string, guildID: string) =>
  getMember(userID, guildID).hasPermission(Discord.Permissions.FLAGS.ADMINISTRATOR);

export const canSpeakInGuild = (userID: string, guildID: string) =>
  getMember(userID, guildID).hasPermission(Discord.Permissions.FLAGS.SPEAK);

login();
