
import * as Discord from 'discord.js';
import { get } from 'lodash';

const noClientUser = m => m.user.constructor !== Discord.ClientUser;

// TODO define Model
const formatMember = (member : Discord.GuildMember) => ({
  id: member.id,
  name: member.displayName,
});

// TODO define Model
const formatChannel = (channel : Discord.GuildChannel) => {
  return ({
    id: channel.id,
    name: channel.name,
    type: channel.type,
  });
};

export const formatGuild = (guild : Discord.Guild) =>  {
  const channels = Array.from(guild.channels.values()).map(formatChannel);
  const { id, name } = guild;
  return ({
    id,
    name,
    channels,
    voiceChannels: channels.filter(c => c.type === 'voice'),
    members: Array.from(guild.members.values()).map(formatMember),
    iconURL: guild.iconURL,
    voiceChannel: get(guild, 'voiceConnection.channel.id', undefined) ,
  });
};

export const formatGuilds = (guilds : Discord.Collection<string, Discord.Guild>) =>
    Array.from(guilds.values()).map(formatGuild);
