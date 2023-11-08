const pg = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    port: '5432',
    user: 'postgres',
    database: 'snakegame_postgres',
    password: null,
    ssl: false,
  }
});

module.exports = pg;