const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    root: rootPath,
    app: {
      name: 'kilimanjaro'
    },
    port: process.env.PORT || 3000,
    db: 'postgres://localhost/kilimanjaro-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'kilimanjaro'
    },
    port: process.env.PORT || 3000,
    db: 'postgres://localhost/kilimanjaro-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'kilimanjaro'
    },
    port: process.env.PORT || 3000,
    db: 'postgres://localhost/kilimanjaro-production'
  }
};

module.exports = config[env];
