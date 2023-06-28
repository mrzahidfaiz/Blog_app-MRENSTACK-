const express = require('express');
const {PORT, FRONT_END_CLIENT_PATH} = require('./config/index');
const router = require('./routes/routes');
const errorHandler = require('./middlewares/errorHandler');
const dbConnection = require('./database');
const cors = require('cors')

const app = express();

dbConnection();

app.use(express.json())

const corsOption = {
    origin: FRONT_END_CLIENT_PATH
}

app.use(cors(corsOption));

app.use(router);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is Running on Port: ${PORT}`)
});