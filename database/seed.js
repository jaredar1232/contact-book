const colors = require("colors");
const db = require("./index.js");

// define setup db function
let setupDB = async () => {
  try {
    await db.query("DROP TABLE IF EXISTS people, mail, phone, addresses;");

    console.log("TABLES: Dropped!".bgWhite.black);

    await db.query(`CREATE TABLE IF NOT EXISTS people(
            name_id SERIAL UNIQUE,
            name VARCHAR(50)
        );`);
    console.log(`PEOPLE TABLE: Created! (1/4)`.green);

    await db.query(`CREATE TABLE IF NOT EXISTS mail(
            mail_id SERIAL UNIQUE PRIMARY KEY,
            name_id INTEGER REFERENCES people (name_id) ON DELETE CASCADE,
            email VARCHAR(50) UNIQUE
        );`);
    console.log(`MAIL TABLE: Created! (2/4)`.green);

    await db.query(`CREATE TABLE IF NOT EXISTS phone(
            phone_id SERIAL UNIQUE PRIMARY KEY,
            name_id INTEGER REFERENCES people (name_id) ON DELETE CASCADE,
            number VARCHAR(15) UNIQUE
        );`);
    console.log(`PHONE TABLE: Created! (3/4)`.green);

    await db.query(`CREATE TABLE IF NOT EXISTS addresses(
            addresses_id SERIAL UNIQUE PRIMARY KEY,
            name_id INTEGER REFERENCES people (name_id) ON DELETE CASCADE,
            address VARCHAR(100) UNIQUE
        );`);
    console.log(`ADDRESSES TABLE: Created! (4/4)`.green);
  } catch (err) {
    console.error(err);
  }
};

// invoke setup function creating the database tables
setupDB();
