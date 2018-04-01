import * as Discord from 'discord.js';

const noClientUser = m => m.user.constructor !== Discord.ClientUser;


const withoutGuildProperty = (obj: Discord.Emoji | Discord.Role | Discord.GuildMember | Discord.GuildChannel) => {
  const returnObject = { ...obj };
  delete returnObject.guild;
  return returnObject;
};

// The extra guild Property of some Objects causes them to be Circular, what makes them not serializable.
const formatGuild = (guild: Discord.Guild) => ({
  ...guild,
  members: Array.from(guild.members.values()).filter(noClientUser).map(withoutGuildProperty),
  channels: Array.from(guild.channels.values()).map(withoutGuildProperty),
  roles: Array.from(guild.roles.values()).map(withoutGuildProperty),
  presences: Array.from(guild.presences.values()),
  emojis: Array.from(guild.emojis.values()).map(withoutGuildProperty),
  iconURL: guild.iconURL
});

const formatGuilds = (guilds: Discord.Collection<Discord.Snowflake, Discord.Guild>) =>
  Array.from(guilds.values()).map(guild => formatGuild(guild));

export { formatGuilds };
