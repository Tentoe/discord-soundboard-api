'use strict';

const { Action, api } = require('actionhero');

// TODO try to reduce redundancy

exports.guilds = class GuildsAction extends Action {
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
    this.inputs = { guildId: { required: true } };
  }
  async run({ response, connection: { params: { guildId } } }) {
    response.data = api.discord.getGuild(guildId);
  }
};

exports.leave = class GuildLeaveAction extends Action {
  constructor() {
    super();
    this.name = 'leave';
    this.description = 'an actionhero action';
    this.outputExample = {};
    this.inputs = { guildId: { required: true } };
  }
  async run({ response, connection: { params: { guildId } } }) {
    response.data = await api.discord.leave(guildId);
  }
};

exports.stop = class GuildStopAction extends Action {
  constructor() {
    super();
    this.name = 'stop';
    this.description = 'an actionhero action';
    this.outputExample = {};
    this.inputs = { guildId: { required: true } };
  }
  async run({ response, connection: { params: { guildId } } }) {
    response.data = api.discord.stop(guildId);
  }
};

exports.random = class GuildRandomAction extends Action {
  constructor() {
    super();
    this.name = 'random';
    this.description = 'an actionhero action';
    this.outputExample = {};
    this.inputs = { guildId: { required: true } };
  }
  async run({ response, connection: { params: { guildId } } }) {
    response.data = await api.discord.playRandom(guildId);
  }
};

exports.join = class GuildJoinAction extends Action {
  constructor() {
    super();
    this.name = 'join';
    this.description = 'an actionhero action';
    this.outputExample = {};
    this.inputs = {
      guildId: { required: true },
      voiceId: { required: true },
    };
  }
  async run({ connection: { params: { voiceId } } }) {
    await api.discord.join(voiceId);
    // TODO response
  }
};

exports.play = class GuildPlayAction extends Action {
  constructor() {
    super();
    this.name = 'play';
    this.description = 'an actionhero action';
    this.outputExample = {};
    this.inputs = {
      guildId: { required: true },
      soundId: { required: true },
    };
  }
  async run({ connection: { params: { guildId, soundId } } }) {
    await api.discord.play(guildId, soundId);
    // TODO response
  }
};
