
import * as Discord from 'discord.js';

const noClientUser = m => m.user.constructor !== Discord.ClientUser;

// The extra guild Property of some Objects causes them to be Circular, not serializable.
const withoutGuildProperty = (obj) => {
  const returnObject = { ...obj };
  delete returnObject.guild;
  return returnObject;
};

const formatGuild = guild => ({
  ...guild,
  members: Array.from(guild.members.values()).filter(noClientUser).map(withoutGuildProperty),
  channels: Array.from(guild.channels.values()).map(withoutGuildProperty),
  roles: Array.from(guild.roles.values()).map(withoutGuildProperty),
  presences: Array.from(guild.presences.values()),
  emojis: Array.from(guild.emojis.values()).map(withoutGuildProperty),
  iconURL: guild.iconURL,
  voiceChannel: guild!.voiceConnection!.channel!.id,
});

const formatGuilds = guilds =>
    Array.from(guilds.values()).map(formatGuild);

export { formatGuild , formatGuilds };
