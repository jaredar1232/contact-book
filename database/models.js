const db = require("./index.js");

// ALL QUERRIES:
// get all names
//
// get email and id by name
// get phone number and id by name
// get address and id by name
//
// add email by name
// add phone number by name
// add address by name
//
// update email by id
// update phone number by id
// update address by id
//
// delete email by id
// delete phone numer by id
// delete address by id
//
// delete email/phone number/address/name by name

module.exports = {
  getAllPeople: () => {
    return db.query(`SELECT * FROM people;`);
  },
  getEmailAndIdByName: (name) => {
    return db.query(`SELECT mail.id, mail.email WHERE mail.name = '${name};`);
  },
  getPhoneNumberAndIdByName: (name) => {
    return db.query(
      `SELECT phone.id, phone.number WHERE phone.name = '${name};`
    );
  },
  getAddressAndIdByName: (name) => {
    return db.query(
      `SELECT addresses.id, addresses.address WHERE addresses.name = '${name};`
    );
  },
  addName: (name) => {
    return db.query(`INSERT INTO people (name) VALUES ('${name}');`);
  },
  addEmailByName: (name, email) => {
    return db.query(
      `INSERT INTO mail (name, email) VALUES (${name}, ${email});`
    );
  },
  addPhoneNumberByName: (name, number) => {
    return db.query(
      `INSERT INTO mail (name, email) VALUES (${name}, ${number});`
    );
  },
  addAddressByName: (name, address) => {
    return db.query(
      `INSERT INTO mail (name, email) VALUES (${name}, ${address});`
    );
  },
  updateEmailById: (id, email) => {
    return db.query(`UPDATE mail SET email = '${email}' WHERE id = '${id}';`);
  },
  updatePhoneNumberById: (id, number) => {
    return db.query(
      `UPDATE phone SET number = '${number}' WHERE id = '${id}';`
    );
  },
  updateAddressById: (id, address) => {
    return db.query(
      `UPDATE addresses SET address = '${address}' WHERE id = '${id}';`
    );
  },
  deleteEmailById: (id) => {
    return db.query(`DELETE FROM mail WHERE mail.id = '${id};`);
  },
  deletePhoneNumberById: (id) => {
    return db.query(`DELETE FROM phone WHERE phone.id = '${id};`);
  },
  deleteAddressById: (id) => {
    return db.query(`DELETE FROM addresses WHERE addresses.id = '${id};`);
  },
  deleteContactByName: (name) => {
    return db.query(`DELETE FROM person WHERE person.name = '${name};`);
  },
};

// Original querry idea, this will present an issue when modifying specific numbers/emails/addresses.
// I will instead break into individual querries
//
//   getInfoByName: (name) => {
//     return db.query(
//       `SELECT
//         name, address, email, number
//       FROM
//         people
//       INNER JOIN
//         mail ON mail.name = people.name
//       INNER JOIN
//         phone ON phone.name = people.name
//       INNER JOIN
//         addresses ON addresses.name = people.name
//       WHERE people.name = '${name}'`
//     );
//   },
