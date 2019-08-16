module.exports = {
    development: {
      db: {
        name: 'snowboard-tricks',
        username: 'postgres',
        password: 'root',
        host: 'localhost',
        port: 5432,
        dialect: 'postgres',
        logging: true,
      },
    },
    test: {
      db: {
        name: 'snowboard-tricks',
        username: 'postgres',
        password: 'root',
        host: 'localhost',
        port: 5432,
        dialect: 'postgres',
        logging: true,
      },
    },
  };