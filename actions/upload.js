'use strict';

const { Action, api } = require('actionhero');

module.exports = class UploadAction extends Action {
  constructor() {
    super();
    this.name = 'upload';
    this.description = 'an actionhero action'; // TODO
    this.outputExample = {};
    this.inputs = {
      file: { required: true }, // TODO validate
    };
  }
  async run({ response, connection: { params } }) {
    await api.upload.addFile(params.file);
    response.success = 'yes';
  }
};
