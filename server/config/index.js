require('dotenv').config();

const PORT = process.env.PORT;
const DB_CONN_STRING = process.env.DB_CONN_STRING;
const FRONT_END_CLIENT_PATH = process.env.FRONT_END_CLIENT_PATH;
const SECRET_ACCESS_TOKEN = process.env.SECRET_ACCESS_TOKEN;
const SECRET_REFRESH_TOKEN = process.env.SECRET_REFRESH_TOKEN;
const BACKEND_SERVER_PATH = process.env.BACKEND_SERVER_PATH;
const CLOUD_NAME = process.env.CLOUD_NAME
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET

module.exports = {
    PORT,
    DB_CONN_STRING,
    FRONT_END_CLIENT_PATH,
    SECRET_ACCESS_TOKEN,
    SECRET_REFRESH_TOKEN,
    BACKEND_SERVER_PATH,
    CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET
}