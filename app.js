const express = require("express");
const path = require("path");
const mysql = require("mysql");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const db = require("./config/database");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const app = express();

const port = process.env.PORT || 3000;

const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//now let set up the view engine
app.set("view engine", "hbs");

//app.use(userRoutes);
app.use(authRoutes);
app.listen(port, () => {
  console.log("Port is listening on port no:" + port);
});
