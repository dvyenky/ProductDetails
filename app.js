const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const route = require("./src/route/router");

const app = express();

const host = process.env.host;
const port = process.env.port;
const serverDB = process.env.dbCredential;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use("/", route);

mongoose
  .connect(serverDB)
  .then((res) => {
    app.listen(port, host, () => {
      console.log(`Server is running at ${host}:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

module.exports = app;
// ygPL7kmZQ66jwFTa
