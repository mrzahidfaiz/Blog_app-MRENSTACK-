const express = require("express");
const { PORT, FRONT_END_CLIENT_PATH } = require("./config/index");
const router = require("./routes/routes");
const errorHandler = require("./middlewares/errorHandler");
const dbConnection = require("./database");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

dbConnection();

app.use(express.json({ limit: "20mb" }));
app.use(cookieParser());
// const corsOption = {
//   origin: FRONT_END_CLIENT_PATH,
//   credentials: true,
// };

// app.use("/upload", express.static("upload"));

app.use(cors(
  {
    origin: ["https://blog-app-mrenstack.vercel.app"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
  }
));

app.get('/' ,(req, res) => {
  res.json('Hello');
})

// app.use(router);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is Running on Port: ${PORT}`);
});
