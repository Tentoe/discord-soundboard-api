'use strict';

const { Initializer, api } = require('actionhero');

const Discord = require('discord.js');

const client = new Discord.Client();


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
  }

  async start() {
    client.login(api.config.soundboard.discordToken);
  }
  // async stop () {}
};
