'use strict';

const { Initializer, api } = require('actionhero');
const Discord = require('discord.js');

const client = new Discord.Client();

const logError = e => api.log('discord error', 'error', e);

module.exports = class DiscordInitializer extends Initializer {
  constructor() {
    super();
    this.name = 'discord';
    this.loadPriority = 1000;
    this.startPriority = 1000;
    this.stopPriority = 1000;
  }

  async initialize() {
    api.discord = {};

    client.on('ready', () => {
      api.log(`Logged into Discord as ${client.user.tag}!`);
    });

    api.discord.getGuilds = () => api.format.guilds(client.guilds);

    api.discord.getGuild = (id) => {
      const guild = client.guilds.get(id);
      if (guild) return api.format.guild(guild);
      throw new Error('Requested guild not found.');
    };

    api.discord.leave = (id) => {
      client.guilds.get(id).voiceConnection.disconnect();
    };

    api.discord.stop = (id) => {
      const connection = client.guilds.get(id).voiceConnection;
      if (!connection) throw new Error('Bot is not currently playing anything.');

      connection.dispatcher.end('api.discord.stop');
    };

    api.discord.join = async (id) => {
      const channel = client.channels.get(id);
      if (channel) {
        await channel.join();
        channel.connection.on('error', logError);
        channel.connection.on('warn', logError);
        channel.connection.on('failed', logError);
        return;
      }
      throw new Error('Voicechannel not found.');
    };

    api.discord.play = async (guildID, soundID) => {
      const soundFile = await api.soundfile.getPath(guildID, soundID);
      const guild = client.guilds.get(guildID);
      if (!guild) throw new Error('Guild not found.');
      if (!guild.voiceConnection) throw new Error('Bot not connected to a voice channel.');


      const dispatcher = guild.voiceConnection.playFile(soundFile);
      dispatcher.setVolume(api.config.soundboard.defaultVolume);

      // prevent delay to build up because of a bug that causes delay
      if (!guild.voiceConnection.player) throw new Error('Player property of voice connection not found.');
      guild.voiceConnection.player.streamingData.pausedTime = 0;
    };

    api.discord.playRandom = async (guildID) => {
      const randomId = await api.soundfile.getRandom(guildID);

      await api.discord.play(guildID, randomId);
      return randomId;
    };
  }


  async start() {
    client.login(api.config.soundboard.discordToken);
  }
  // async stop () {}
};
