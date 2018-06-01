'use strict';

const { Action, api } = require('actionhero');

module.exports = class UploadAction extends Action {
  constructor() {
    super();
    this.name = 'upload';
    this.description = 'an actionhero action'; // TODO
    this.outputExample = {};
    this.input = {
      file: { required: true }, // TODO
    };
  }
  async run({ response, connection }) {
    await api.upload.addFile(connection.params.file);
    response.success = 'yes';
  }
};
