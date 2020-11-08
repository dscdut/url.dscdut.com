require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dbConfig = require("./config");

const app = express();

dbConfig; // connect to database

app.use(cors());
app.use(helmet());
app.use(morgan("tiny"));

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

const routes = require("./routes/main.js");


app.use("/", routes);

app.use(express.static('public'));


const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
