exports.default = {
  routes: api => ({ // eslint-disable-line no-unused-vars

    get: [
      { path: '/guild/:id', action: 'guild' },
    ],

  }),
};
