import * as restify from 'restify';
import { join as pathJoin, extname } from 'path';
import * as fs from 'fs';

import { soundDir } from './config';
import { getFileHash } from './hash';
import { newSoundFile } from './database';


const moveFile = async file => { // TODO split
  // console.log(/^audio\//.test(file.name)); // TODO analyze file

  if (!file.name) { return console.error('Uploaded File has no name'); } // TODO better Error hanlding

  const hash = await getFileHash(file.path);
  const newFileName = hash + extname(file.name);
  const newFilePath = pathJoin(soundDir, newFileName);

  // TODO error handling file already exists?

  fs.rename(file.path, newFilePath, err => {
    if (err) { return console.log(err); }
    newSoundFile(file.name, newFileName);
  }); // TODO better Error hanlding


};

const uploadHandler: restify.RequestHandlerType = (req, res, next) => {

  Object.values(req.files).map(moveFile);

  res.send('mptj'); // TODO error hanlding
  next();
};

export { uploadHandler };
