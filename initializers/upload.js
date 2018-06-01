'use strict';

const { Initializer, api } = require('actionhero');
const fs = require('fs');
const path = require('path');
const util = require('util');

module.exports = class UploadInitializer extends Initializer {
  constructor() {
    super();
    this.name = 'upload';
    this.loadPriority = 1000;
    this.startPriority = 1000;
    this.stopPriority = 1000;
  }

  async initialize() {
    api.upload = {};
    api.upload.addFile = async (file) => {
      // TODO check filename (for wrong extention)
      const newFileName = file.hash + path.extname(file.name);
      const newFilePath = path.join(api.config.soundboard.soundFileDir, newFileName);

      // TODO log if file already exists

      const copyFile = util.promisify(fs.copyFile);
      await copyFile(file.path, newFilePath);


      const unlink = util.promisify(fs.unlink);
      await unlink(file.path);

      await api.soundfile.add(file.name, newFilePath);
    };
  }

  // async start() {}
  // async stop() {}
};
