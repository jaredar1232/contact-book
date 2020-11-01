const colors = require("colors");
const db = require("./index.js");

// define setup db function
let setupDB = async () => {
  try {
    await db.query("DROP TABLE IF EXISTS people, mail, phone, addresses;");

    console.log("TABLES: Dropped!".bgWhite.black);

    await db.query(`CREATE TABLE IF NOT EXISTS people(
            id SERIAL PRIMARY KEY,
            name VARCHAR(50) UNIQUE
        );`);
    console.log(`PEOPLE TABLE: Created! (1/4)`.green);

    await db.query(`CREATE TABLE IF NOT EXISTS mail(
            id SERIAL PRIMARY KEY,
            name VARCHAR(50) REFERENCES people (name) ON DELETE CASCADE,
            email VARCHAR(50)
        );`);
    console.log(`MAIL TABLE: Created! (2/4)`.green);

    await db.query(`CREATE TABLE IF NOT EXISTS phone(
            id SERIAL PRIMARY KEY,
            name VARCHAR(50) REFERENCES people (name) ON DELETE CASCADE,
            number INT
        );`);
    console.log(`PHONE TABLE: Created! (3/4)`.green);

    await db.query(`CREATE TABLE IF NOT EXISTS addresses(
            id SERIAL PRIMARY KEY,
            name VARCHAR(50) REFERENCES people (name) ON DELETE CASCADE,
            address VARCHAR(50)
        );`);
    console.log(`ADDRESSES TABLE: Created! (4/4)`.green);
  } catch (err) {
    console.error(err);
  }
};

// invoke setup function creating the database tables
setupDB();