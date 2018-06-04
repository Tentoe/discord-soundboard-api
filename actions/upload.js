'use strict';

const { Action, api } = require('actionhero');

module.exports = class UploadAction extends Action {
  constructor() {
    super();
    this.name = 'upload';
    this.description = 'an actionhero action'; // TODO
    this.outputExample = {};
    this.inputs = {
      guildId: { required: true }, // TODO validate
      file: { required: true }, // TODO validate
    };
  }
  async run({ response, connection: { params: { file, guildId } } }) {
    await api.upload.addFile(file, guildId);
    response.success = 'yes';
  }
};
