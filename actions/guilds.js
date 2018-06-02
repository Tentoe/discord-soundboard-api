'use strict';

const { Action, api } = require('actionhero');

exports.guilds = class MyAction extends Action {
  constructor() {
    super();
    this.name = 'guilds';
    this.description = 'an actionhero action';
    this.outputExample = {};
  }

  async run({ response }) {
    response.data = api.discord.getGuilds();
  }
};

exports.guild = class GuildAction extends Action {
  constructor() {
    super();
    this.name = 'guild';
    this.description = 'an actionhero action';
    this.outputExample = {};
    this.input = {};
  }
  async run({ response, connection: { params } }) {
    response.data = api.discord.getGuild(params.id);
  }
};
