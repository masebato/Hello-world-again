require('dotenv').config();
const config = require('./knexfile.js');
const knex = require('knex')(config);

knex.executeProcedure = async () => {};
knex.executeFunction = async () => {};
knex.executeNonQuery = async () => {};
knex.executeQuery = async () => {};
knex.executeNonQueryTrx = async () => {};

module.exports = knex;
