const environment = process.env.NODE_ENV || 'development';
const knexConfig = require('../knexfile');
const config = knexConfig[environment];
const knex = require('knex');
const knexConnection = knex(config);
module.exports = knexConnection;
