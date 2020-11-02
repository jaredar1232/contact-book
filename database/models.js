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
  getAllNames: () => {
    return db.query(`SELECT * FROM people;`);
  },
  getInfoByName: (name) => {
    return db.query(
      `SELECT 
      address, email, number 
      FROM
       people
       INNER JOIN mail 
       ON mail.name = people.name 
       INNER JOIN phone 
       ON phone.name = people.name 
       INNER JOIN addresses
       ON addresses.name = people.name 
       WHERE people.name = '${name}';`
    );
  },
  addName: (name) => {
    return db.query(`INSERT INTO people (name) VALUES ('${name}');`);
  },
  addEmailByName: (name, email) => {
    return db.query(
      `INSERT INTO mail (name, email) VALUES ('${name}', '${email}');`
    );
  },
  addPhoneNumberByName: (name, number) => {
    return db.query(
      `INSERT INTO phone (name, number) VALUES ('${name}', '${number}');`
    );
  },
  addAddressByName: (name, address) => {
    return db.query(
      `INSERT INTO addresses (name, address) VALUES ('${name}', '${address}');`
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
  deleteContactByName: (name) => {
    return db.query(`DELETE FROM people WHERE people.name = '${name}';`);
  },
};

// Original querry idea, this will present an issue when modifying specific numbers/emails/addresses.
// I will instead break into individual querries
//

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
