'use strict';

const { api, Action } = require('actionhero');

module.exports = class SoundFilesAction extends Action {
  constructor() {
    super();
    this.name = 'soundfiles';
    this.description = 'an actionhero action';
    this.outputExample = {};
  }

  async run({ response, connection: { params: { guildId } } }) {
    response.data = await api.soundfile.getAll(guildId);
  }
};
