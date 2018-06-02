'use strict';

const { Action, api } = require('actionhero');

module.exports = class MyAction extends Action {
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
