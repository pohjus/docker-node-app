require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();

const port = 8080;

var pool = mysql.createPool({
  connectionLimit: 10, // Set the limit to a suitable number
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

app.use(cors());

app.get("/api/treffit", (req, res) => {
  pool.query("SELECT * FROM treffit", (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

const server = app
  .listen(port, () => {
    console.log(`SERVER: listening on port ${port}.`);
    console.log(process.env);
  })
  .on("error", (err) => {
    console.error("SERVER: Error starting server: ", err);
    process.exit(1);
  });

const gracefulShutdown = () => {
  console.log("SERVER: Starting graceful shutdown...");

  if (server) {
    console.log("SERVER: Server was opened, so we can close it...");
    server.close((err) => {
      if (err) {
        console.error("SERVER: Error closing Express server: ", err);
      } else {
        console.log("SERVER: stopped.");
      }

      console.log("MYSQL: Starting graceful shutdown...");
      pool.end((err) => {
        if (err) {
          console.error("MYSQL: Error closing MySQL pool: ", err);
        } else {
          console.log("MYSQL: Pool closed.");
        }

        console.log("MYSQL: Shutdown complete.");
        process.exit(1);
      });
    });
  }
};

process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);
