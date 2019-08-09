module.exports = {
    development: {
      db: {
        name: 'snowboardTricksDB',
        username: 'koa-server',
        password: 'koa-serverSnowboardTricksDB',
        host: 'localhost',
        port: 5432,
        dialect: 'postgres',
        logging: true,
      },
    },
    test: {
      db: {
        name: 'snowboardTricksDB',
        username: 'koa-server',
        password: 'koa-serverSnowboardTricksDB',
        host: 'localhost',
        port: 5432,
        dialect: 'postgres',
        logging: false,
      },
    },
  };