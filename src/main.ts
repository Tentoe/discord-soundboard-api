import * as restify from 'restify';

import { joinVoiceChannelHandler, testHandler, guildsHandler } from './botHandler';




const server = restify.createServer();


server.post('/api/joinVoiceChannel/:id', joinVoiceChannelHandler);
server.get('/api/test', testHandler);
server.get('/api/guilds', guildsHandler);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
