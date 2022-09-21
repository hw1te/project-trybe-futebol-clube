module.exports = {
  all: true,
  extends: "@istanbuljs/nyc-config-typescript",
  exclude: [
    'src/interfaces',
    'src/tests',
    'src/database/config',
    'src/database/migrations',
    'src/database/seeders'
  ],
  include: ['src/**/*.ts']
};
