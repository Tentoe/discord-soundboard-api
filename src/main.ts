import * as restify from 'restify';

import { joinVoiceChannelHandler, testHandler, guildsHandler, playHandler , voiceChannelStop} from './botHandler';
import { uploadHandler } from './upload';
import { soundBoardsHandler } from './data';
import { staticHandler } from './static';
const server = restify.createServer();

server.use(restify.plugins.bodyParser({
  mapParams: false,
}));


server.post('/api/voicechannel/:id/join', joinVoiceChannelHandler); // TODO rename to /voicechannel/join

server.get('/api/voicechannel/:id/stop', voiceChannelStop);
server.get('/api/test', testHandler);
server.get('/api/guilds', guildsHandler);
server.get('/api/voicechannel/:voiceID/play/:soundID', playHandler);
server.post('/api/upload', uploadHandler);
server.get('/api/soundboards', soundBoardsHandler);
// TODO add route /api/ that throws an error


server.get('*', staticHandler);


server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
