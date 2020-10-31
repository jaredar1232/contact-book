const colors = require("colors");
const db = require("./index.js");

// define setup db function
let setupDB = async () => {
  try {
    await db.query("DROP TABLE IF EXISTS people, mail, phone, addresses;");

    console.log("TABLES: Dropped!".bgWhite.black);

    await db.query(`CREATE TABLE IF NOT EXISTS people(
            id INT PRIMARY KEY,
            name VARCHAR(50)
        );`);
    console.log(`PEOPLE TABLE: Created! (1/4)`.green);

    await db.query(`CREATE TABLE IF NOT EXISTS mail(
            id INT PRIMARY KEY,
            name VARCHAR(50) REFERENCES people (name),
            email VARCHAR(50)
        );`);
    console.log(`MAIL TABLE: Created! (2/4)`.green);

    await db.query(`CREATE TABLE IF NOT EXISTS phone(
            id INT PRIMARY KEY,
            name VARCHAR(50) REFERENCES people (name),
            number INT
        );`);
    console.log(`PHONE TABLE: Created! (3/4)`.green);

    await db.query(`CREATE TABLE IF NOT EXISTS addresses(
            id INT PRIMARY KEY,
            name VARCHAR(50) REFERENCES people (name),
            address VARCHAR(50)
        );`);
    console.log(`ADDRESSES TABLE: Created! (4/4)`.green);
  } catch (err) {
    console.error(err);
  }
};

// invoke setup function creating the database tables
setupDB();
