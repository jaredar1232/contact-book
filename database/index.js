const { Pool } = require("pg");
require("dotenv").config();

colors = require("colors");

// let db = new Pool({
//   user: "postgres",
//   password: "postgres",
//   host: "localhost",
//   port: 5432,
//   database: "postgres",
// });

let db = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
});

db.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

db.connect((err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("\n DATABASE: Connected! \n".blue);
  }
});

module.exports = db;
