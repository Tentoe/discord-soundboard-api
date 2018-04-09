

const token = process.env.DISCORD_BOT_USER_TOKEN || 'noTOKEN';
const defaultVolume = 0.3;
const dbURL = process.env.SOUNDBOARD_DB || 'mongodb://localhost/soundboard';

export { token, defaultVolume, dbURL };
