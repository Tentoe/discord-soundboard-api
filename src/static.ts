import * as restify from 'restify';
import * as fs from 'fs';
import { join, basename } from 'path';
import { promisify } from 'util';


const directory = './build/webapp';
const staticOptions = {
  directory,
  appendRequestPath: false,
  default: 'index.html'
};

const statPromise = promisify(fs.stat);


const fileExists = path => statPromise(path).then(() => true).catch(() => false);

const staticHandler: restify.RequestHandlerType = async (req, res, next) => {
  console.log('hello');
  const fileRequested = join(process.cwd(), directory, basename(req.getPath()));

  if (await fileExists(fileRequested)) {
    console.log('yes');
    restify.plugins.serveStatic(staticOptions)(req, res, next);
  } else {
    console.log('no');
    restify.plugins.serveStatic({ ...staticOptions, file: 'index.html' })(req, res, next);
  }



};

export { staticHandler };
