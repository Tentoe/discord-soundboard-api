import { mapValues } from 'lodash/object';


const Discord = require('discord.js');
import { join as pathJoin } from 'path';

const client = new Discord.Client();



const deepConvertCollectionsToArrays = (obj: Object) =>
  mapValues(obj, val => {
    if (!val) { return val; }

    return val.constructor === Discord.Collection ?
     val.map() :
     val;

  });



client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
  // Voice only works in guilds, if the message does not come from a guild,
  // we ignore it
  if (!message.guild) { return; }

  if (message.content === '/join') {
    // Only try to join the sender's voice channel if they are in one themselves
    if (message.member.voiceChannel) {
      message.member.voiceChannel.join()
        .then(voiceConnection => {
          //  message.reply('I have successfully connected to the channel!');
          const dispatcher = voiceConnection.playFile(pathJoin(__dirname, 'pg.mp3'));

        })
        .catch(console.log);
    } else {
      message.reply('You need to join a voice channel first!');
    }
  }
});




const status = () => deepConvertCollectionsToArrays(client.guilds.first());
// Object.values(client.guilds.first()).forEach(v => v ? console.log(v.constructor.name) : null);
// Object.values(client.guilds.array()[0]).forEach(v => console.log(JSON.stringify(v)));

const getGuilds = () => deepConvertCollectionsToArrays(client.guilds);



export { status, getGuilds };
