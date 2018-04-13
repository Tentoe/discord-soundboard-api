import * as restify from 'restify';

import { joinVoiceChannelHandler, testHandler, guildsHandler, playHandler } from './botHandler';
import { uploadHandler } from './upload';
import { soundBoardsHandler } from './data';


const server = restify.createServer();

server.use(restify.plugins.bodyParser({
  mapParams: false,
}));


server.post('/api/joinVoiceChannel/:id', joinVoiceChannelHandler); // TODO rename to /voicechannel/join
server.get('/api/test', testHandler);
server.get('/api/guilds', guildsHandler);
server.get('/api/voicechannel/:voiceID/play/:soundID', playHandler);
server.post('/api/upload', uploadHandler);
server.get('/api/soundboards', soundBoardsHandler);

// any other Path
server.get('*', restify.plugins.serveStatic({
  directory: './build/webapp',
  appendRequestPath: false,
  default: 'index.html'
}));

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
