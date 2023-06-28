require('dotenv').config();

const PORT = process.env.PORT;
const DB_CONN_STRING = process.env.DB_CONN_STRING;
const FRONT_END_CLIENT_PATH = process.env.FRONT_END_CLIENT_PATH;

module.exports = {
    PORT,
    DB_CONN_STRING,
    FRONT_END_CLIENT_PATH
}