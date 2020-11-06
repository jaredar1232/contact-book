const path = require("path");
const express = require("express");
const port = process.env.PORT || 3001;
const cors = require("cors");
require("dotenv").config();
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
app.get("/get_all_names_and_ids", (req, res) => {
  db.getAllNames()
    .then((data) => {
      res.status(200).send(data.rows);
    })
    .catch((err) => res.status(400).send(err));
});

app.get("/get_info_by_id", async (req, res) => {
  const ID = req.query.ID;
  // const name = req.body.name;
  const results = {};

  // used to restructure the results from query
  const saveToResults = (unfilteredData, name) => {
    let dataArray = [];
    for (let i = 0; i < unfilteredData.length; i++) {
      dataArray.push(unfilteredData[i][name]);
    }
    results[name] = dataArray;
  };

  // had to hack together this tri query as JOIN and UNIONS weren't getting me what I needed
  Promise.all([
    db.getAddressByID(ID),
    db.getNumberByID(ID),
    db.getEmailByID(ID),
  ])
    .then((results) => {
      saveToResults(results[0].rows, "address");
      saveToResults(results[1].rows, "number");
      saveToResults(results[2].rows, "email");
    })
    .then(() => {
      res.status(200).send(results);
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
      res.status(200).send(data.rows[0]);
    })
    .catch((err) => res.status(400).send(err));
});

app.post("/add_email_by_id", (req, res) => {
  const ID = req.query.ID;
  const email = req.body.email;
  db.addEmailByID(ID, email)
    .then((data) => {
      res.status(200).send("Email added!");
    })
    .catch((err) => res.status(400).send(err));
});

app.post("/add_phone_number_by_id", (req, res) => {
  const ID = req.query.ID;
  const number = req.body.number;
  db.addPhoneNumberByID(ID, number)
    .then((data) => {
      res.status(200).send("Phone number added!");
    })
    .catch((err) => res.status(400).send(err));
});

app.post("/add_address_by_id", (req, res) => {
  const ID = req.query.ID;
  const address = req.body.address;
  db.addAddressByID(ID, address)
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
app.post("/delete_contact_by_id", (req, res) => {
  const ID = req.query.ID;
  db.deleteContactByID(ID)
    .then((data) => {
      res.status(200).send("Contact deleted!");
    })
    .catch((err) => res.status(400).send(err));
});
