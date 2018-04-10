import * as restify from 'restify';

import { joinVoiceChannelHandler, testHandler, guildsHandler } from './botHandler';
import { uploadHandler } from './upload';



const server = restify.createServer();

server.use(restify.plugins.bodyParser({
  mapParams: false,
}));


server.post('/api/joinVoiceChannel/:id', joinVoiceChannelHandler);
server.get('/api/test', testHandler);
server.get('/api/guilds', guildsHandler);
server.post('/api/upload', uploadHandler);

// any other Path
server.get('*', restify.plugins.serveStatic({
  directory: './build/webapp',
  appendRequestPath: false,
  default: 'index.html'
}));

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
