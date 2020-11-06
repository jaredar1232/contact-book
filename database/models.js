const db = require("./index.js");

// ALL QUERRIES:
// get all names
//
// get address by id
// get number by id
// get email by id
//
// add name
// add email by id
// add phone number by id
// add address by id
//
// update email
// update phone number
// update address
//
// delete email
// delete phone number
// delete address
//
// delete all info associated with id

module.exports = {
  getAllNames: () => {
    return db.query(`SELECT * FROM people;`);
  },
  getAddressByID: (id) => {
    return db.query(
      `SELECT address FROM addresses WHERE addresses.name_id = '${id}';`
    );
  },
  getNumberByID: (id) => {
    return db.query(`SELECT number FROM phone WHERE phone.name_id = '${id}';`);
  },
  getEmailByID: (id) => {
    return db.query(`SELECT email FROM mail WHERE mail.name_id = '${id}';`);
  },
  addName: (name) => {
    return db.query(
      `INSERT INTO people (name) VALUES ('${name}') RETURNING name_id;`
    );
  },
  addEmailByID: (id, email) => {
    return db.query(
      `INSERT INTO mail (name_id, email) VALUES ('${id}', '${email}');`
    );
  },
  addPhoneNumberByID: (id, number) => {
    return db.query(
      `INSERT INTO phone (name_id, number) VALUES ('${id}', '${number}');`
    );
  },
  addAddressByID: (id, address) => {
    return db.query(
      `INSERT INTO addresses (name_id, address) VALUES ('${id}', '${address}');`
    );
  },
  updateEmail: (oldEmail, newEmail) => {
    return db.query(
      `UPDATE mail SET email = '${newEmail}' WHERE email = '${oldEmail}';`
    );
  },
  updatePhoneNumber: (oldNumber, newNumber) => {
    return db.query(
      `UPDATE phone SET number = '${newNumber}' WHERE number = '${oldNumber}';`
    );
  },
  updateAddress: (oldAddress, newAddress) => {
    return db.query(
      `UPDATE addresses SET address = '${newAddress}' WHERE address = '${oldAddress}';`
    );
  },
  deleteEmail: (email) => {
    return db.query(`DELETE FROM mail WHERE mail.email = '${email}';`);
  },
  deletePhoneNumber: (number) => {
    return db.query(`DELETE FROM phone WHERE phone.number = '${number}';`);
  },
  deleteAddress: (address) => {
    return db.query(
      `DELETE FROM addresses WHERE addresses.address = '${address}';`
    );
  },
  deleteContactByID: (id) => {
    return db.query(`DELETE FROM people WHERE people.name_id = '${id}';`);
  },
};

// Original query idea was to use unique ids so there could more than one of the same name
// Decided to force unique numbers/addresses/emails/names instead due to time
//
// Tradeoff: less clutter/routes but cant use same address for people in a household etc

// getEmailAndIdByName: (name) => {
//   return db.query(
//     `SELECT mail.id, mail.email FROM mail WHERE mail.name = '${name}';`
//   );
// },
// getPhoneNumberAndIdByName: (name) => {
//   return db.query(
//     `SELECT phone.id, phone.number FROM phone WHERE phone.name = '${name}';`
//   );
// },
// getAddressAndIdByName: (name) => {
//   return db.query(
//     `SELECT addresses.id, addresses.address FROM addresses WHERE addresses.name = '${name}';`
//   );
// }

// old get all by name, runs into issues if a field is missing
// `SELECT
//           distinct address, email, number
//        FROM
//           mail
//        INNER JOIN phone
//           ON phone.name = mail.name
//        INNER JOIN addresses
//           ON addresses.name = mail.name
//        WHERE mail.name = '${name}';`;

//       `
//         SELECT address FROM addresses WHERE addresses.name = '${name}'
//  UNION
//         SELECT number FROM phone WHERE phone.name = '${name}'
//  UNION
//         SELECT email FROM mail WHERE mail.name = '${name}'
//       `;
