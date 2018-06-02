'use strict';

const { Initializer, api } = require('actionhero');
const _ = require('lodash/object');
const Discord = require('discord.js');

const noClientUser = m => m.user.constructor !== Discord.ClientUser;

// The extra guild Property of some Objects causes them to be Circular, not serializable.
const withoutGuildProperty = (obj) => {
  const returnObject = { ...obj };
  delete returnObject.guild;
  return returnObject;
};

module.exports = class FormatInitializer extends Initializer {
  constructor() {
    super();
    this.name = 'format';
    this.loadPriority = 1000;
    this.startPriority = 1000;
    this.stopPriority = 1000;
  }

  async initialize() {
    api.format = {};
    api.format.guild = guild => ({
      ...guild,
      members: Array.from(guild.members.values()).filter(noClientUser).map(withoutGuildProperty),
      channels: Array.from(guild.channels.values()).map(withoutGuildProperty),
      roles: Array.from(guild.roles.values()).map(withoutGuildProperty),
      presences: Array.from(guild.presences.values()),
      emojis: Array.from(guild.emojis.values()).map(withoutGuildProperty),
      iconURL: guild.iconURL,
      voiceChannel: _.get(guild, 'voiceConnection.channel.id'),
    });

    api.format.guilds = guilds =>
      Array.from(guilds.values()).map(api.format.guild);
  }

  // async start() {}
  // async stop() {}
};
