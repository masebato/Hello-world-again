require('dotenv').config();
const { USER_DB, PASS_DB, HOST_DB, NAME_DB } = process.env;

const connectionData = {
  client: 'mysql2',
  connection: {
    user: USER_DB,
    password: PASS_DB,
    host: HOST_DB,
    database: NAME_DB,
  },
};

module.exports = connectionData;
