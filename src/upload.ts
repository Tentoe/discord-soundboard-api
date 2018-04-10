import * as restify from 'restify';
import { join as pathJoin } from 'path';
import * as fs from 'fs';

import {  soundDir } from './config';


const printFile =  (err, data) => {
  /* If an error exists, show it, otherwise show the file */
  err ? console.log(err) : console.log(JSON.stringify(data) );
  };

const moveFile = f => {
  // RequestFileInterface is incomplete. It should contain name, but doesn't
  interface RequestFileInterfaceWithName extends restify.RequestFileInterface {
      name: string;
  }
  const file = <RequestFileInterfaceWithName>f;

  if ( !file.name ) { return console.error('Uploaded File has no name'); } // TODO better Error hanlding

  fs.rename(file.path, pathJoin(soundDir, file.name), err => err ? console.log(err) : null); // TODO better Error hanlding
};

const uploadHandler: restify.RequestHandlerType = (req, res, next) => {

  Object.values(req.files).map(moveFile);
  res.send('mptj');
  next();
};


export { uploadHandler };
