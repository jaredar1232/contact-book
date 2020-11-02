const path = require("path");
const express = require("express");
const port = process.env.PORT || 3001;
const cors = require("cors");
const db = require("../database/models");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../build")));
app.use(cors());

app.listen(port, () => {
  console.log(`\n Server is up and listening on port: ${port}`.blue);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

////////////////////////////////////////////////////////
// GET ROUTES
////////////////////////////////////////////////////////
app.get("/get_all_names", (req, res) => {
  db.getAllNames()
    .then((data) => {
      res.status(200).send(data.rows);
    })
    .catch((err) => res.status(400).send(err));
});

app.get("/get_info_by_name", (req, res) => {
  const name = req.body.name;
  db.getInfoByName(name)
    .then((data) => {
      // This function will filter out duplicate data that is created from the query.
      function clean() {
        let results = {},
          addressObj = {},
          emailObj = {},
          numberObj = {};

        for (let i = 0; i < data.rows.length; i++) {
          const dataShard = data.rows[i];
          addressObj[dataShard.address] = 1;
          emailObj[dataShard.email] = 1;
          numberObj[dataShard.number] = 1;
        }
        results.address = Object.keys(addressObj);
        results.email = Object.keys(emailObj);
        results.number = Object.keys(numberObj);
        return results;
      }

      const filteredData = clean(data.rows);
      res.status(200).send(filteredData);
    })
    .catch((err) => res.status(400).send(err));
});

////////////////////////////////////////////////////////
// ADD ROUTES
////////////////////////////////////////////////////////
app.post("/add_name", (req, res) => {
  const name = req.body.name;
  db.addName(name)
    .then((data) => {
      res.status(200).send("Name added!");
    })
    .catch((err) => res.status(400).send(err));
});

app.post("/add_email_by_name", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  db.addEmailByName(name, email)
    .then((data) => {
      res.status(200).send("Email added!");
    })
    .catch((err) => res.status(400).send(err));
});

app.post("/add_phone_number_by_name", (req, res) => {
  const name = req.body.name;
  const number = req.body.number;
  db.addPhoneNumberByName(name, number)
    .then((data) => {
      res.status(200).send("Phone number added!");
    })
    .catch((err) => res.status(400).send(err));
});

app.post("/add_address_by_name", (req, res) => {
  const name = req.body.name;
  const address = req.body.address;
  db.addAddressByName(name, address)
    .then((data) => {
      res.status(200).send("Address added!");
    })
    .catch((err) => res.status(400).send(err));
});

////////////////////////////////////////////////////////
// UPDATE ROUTES
////////////////////////////////////////////////////////
app.post("/update_email", (req, res) => {
  const oldEmail = req.body.oldEmail;
  const newEmail = req.body.newEmail;
  db.updateEmail(oldEmail, newEmail)
    .then((data) => {
      res.status(200).send("Email updated!");
    })
    .catch((err) => res.status(400).send(err));
});

app.post("/update_phone_number", (req, res) => {
  const oldNumber = req.body.oldNumber;
  const newNumber = req.body.newNumber;
  db.updatePhoneNumber(oldNumber, newNumber)
    .then((data) => {
      res.status(200).send("Phone number updated!");
    })
    .catch((err) => res.status(400).send(err));
});

app.post("/update_address", (req, res) => {
  const oldAddress = req.body.oldAddress;
  const newAddress = req.body.newAddress;
  db.updateAddress(oldAddress, newAddress)
    .then((data) => {
      res.status(200).send("Address updated!");
    })
    .catch((err) => res.status(400).send(err));
});

////////////////////////////////////////////////////////
// DELETE ROUTES
////////////////////////////////////////////////////////
app.post("/delete_email", (req, res) => {
  const email = req.body.email;
  db.deleteEmail(email)
    .then((data) => {
      res.status(200).send("Email deleted!");
    })
    .catch((err) => res.status(400).send(err));
});

app.post("/delete_phone_number", (req, res) => {
  const number = req.body.number;
  db.deletePhoneNumber(number)
    .then((data) => {
      res.status(200).send("Phone number deleted!");
    })
    .catch((err) => res.status(400).send(err));
});

app.post("/delete_address", (req, res) => {
  const address = req.body.address;
  db.deleteAddress(address)
    .then((data) => {
      res.status(200).send("Address deleted!");
    })
    .catch((err) => res.status(400).send(err));
});

// deletes an entire contact (including name/email/addy/phone#)
app.post("/delete_contact_by_name", (req, res) => {
  const name = req.body.name;
  db.deleteContactByName(name)
    .then((data) => {
      res.status(200).send("Contact deleted!");
    })
    .catch((err) => res.status(400).send(err));
});
