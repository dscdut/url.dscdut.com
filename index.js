const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const dbConfig = require("./config");
const  {PORT, CORS_ALLOW}= require("./env")
const app = express();

dbConfig; // connect to database

app.use(cors({
  origin: CORS_ALLOW,
  optionsSuccessStatus: 200
}));
app.use(helmet());

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const routes = require("./routes/main.js");

app.use("/", routes);

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
