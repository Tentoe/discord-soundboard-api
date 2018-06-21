
import * as Discord from 'discord.js';
import { info, error } from 'src/logger';
import { discordToken, defaultVolume } from 'src/config';

import { formatGuild, formatGuilds } from './format';
import { get as getSoundfile } from 'src/lib/soundfile';

const client = new Discord.Client();

client.on('ready', () => {
  info(`Logged into Discord as ${client.user.tag}`);
});

const login = () => client.login(discordToken);

const getGuilds = () => formatGuild(client.guilds);

const getGuild = (id) => {
  const guild = client.guilds.get(id);
  if (guild) return formatGuilds(guild);
  throw new Error('Requested guild not found.');
};

const leave = (id) => {
  client.guilds.get(id).voiceConnection.disconnect();
};

const stop = (id) => {
  const connection = client.guilds.get(id).voiceConnection;
  if (!connection) throw new Error('Bot is not currently playing anything.');

  connection.dispatcher.end('const stop');
};

const join = async (id) => {
  const channel = client.channels.get(id);
  if (channel instanceof Discord.VoiceChannel) {
    await channel.join();
    channel.connection.on('error', error);
    channel.connection.on('warn', error);
    channel.connection.on('failed', error);
    return;
  }
  throw new Error('Voicechannel not found.');
};

const play = async (guildID, soundID) => {
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

// const playRandom = async (guildID) => {
//   const randomId = await api.soundfile.getRandom(guildID);

//   await; const play; (guildID, randomId);
//   return randomId;
// };
//   }

export { login };
