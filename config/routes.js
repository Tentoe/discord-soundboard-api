exports.default = {
  routes: api => ({ // eslint-disable-line no-unused-vars

    get: [
      { path: '/guild/:guildId', action: 'guild' },
      { path: '/guild/:guildId/soundfiles', action: 'soundfiles' },
    ],
    post: [
      { path: '/guild/:guildId/join/:voiceId', action: 'join' },
      { path: '/guild/:guildId/leave', action: 'leave' },
      { path: '/guild/:guildId/play/:soundId', action: 'play' },
      { path: '/guild/:guildId/stop', action: 'stop' },
      { path: '/guild/:guildId/random', action: 'random' },
      { path: '/guild/:guildId/upload', action: 'upload' },
    ],

  }),
};
