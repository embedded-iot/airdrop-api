const { version } = require('../../package.json');
const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'Airdrop API documentation',
    version,
    license: {
      name: 'MIT',
      url: 'https://github.com/hagopj13/node-express-boilerplate/blob/master/LICENSE',
    },
  },
  servers: [
    {
      url: `${config.env === 'production' ? config.domain.url : `http://localhost:${config.port}`}/api`,
    },
  ],
};

module.exports = swaggerDef;
