const path = require("path");
const express = require("express");
const port = process.env.PORT || 3001;
const cors = require("cors");

const db = require("../database/models");

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../dist")));
app.use(cors());

app.listen(port, () => {
  console.log(`\n Server is up and listening on port: ${port}`.blue);
});

////////////////////////////////////////////////////////
// GET ROUTES
////////////////////////////////////////////////////////

app.get("/get_all_names", (req, res) => {
  db.getAllPeople()
    .then((data) => {
      res.status(200).send(data.rows);
    })
    .catch((err) => res.status(400).send(err));
});

app.get("/get_email_and_id_by_name", (req, res) => {
  const name = req.body.name;
  db.getEmailAndIdByName(name)
    .then((data) => {
      res.status(200).send(data.rows);
    })
    .catch((err) => res.status(400).send(err));
});

app.get("/get_phone_number_and_id_by_name", (req, res) => {
  const name = req.body.name;
  db.getPhoneNumberAndIdByName(name)
    .then((data) => {
      res.status(200).send(data.rows);
    })
    .catch((err) => res.status(400).send(err));
});

app.get("/get_address_and_id_by_name", (req, res) => {
  const name = req.body.name;
  db.getAddressAndIdByName(name)
    .then((data) => {
      res.status(200).send(data.rows);
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

app.post("/update_email_by_id", (req, res) => {
  const id = req.body.id;
  const email = req.body.email;
  db.updateEmailById(id, email)
    .then((data) => {
      res.status(200).send("Email updated!");
    })
    .catch((err) => res.status(400).send(err));
});

app.post("/update_phone_number_by_id", (req, res) => {
  const id = req.body.id;
  const number = req.body.number;
  db.updatePhoneNumberById(id, number)
    .then((data) => {
      res.status(200).send("Phone number updated!");
    })
    .catch((err) => res.status(400).send(err));
});

app.post("/update_address_by_id", (req, res) => {
  const id = req.body.id;
  const address = req.body.address;
  db.updateAddressById(id, address)
    .then((data) => {
      res.status(200).send("Address updated!");
    })
    .catch((err) => res.status(400).send(err));
});

////////////////////////////////////////////////////////
// DELETE ROUTES
////////////////////////////////////////////////////////
app.post("/delete_email_by_id", (req, res) => {
  const id = req.body.id;
  const email = req.body.email;
  db.deleteEmailById(id, email)
    .then((data) => {
      res.status(200).send("Email updated!");
    })
    .catch((err) => res.status(400).send(err));
});

app.post("/update_phone_number_by_id", (req, res) => {
  const id = req.body.id;
  const number = req.body.number;
  db.deletePhoneNumberById(id, number)
    .then((data) => {
      res.status(200).send("Phone number updated!");
    })
    .catch((err) => res.status(400).send(err));
});

app.post("/update_address_by_id", (req, res) => {
  const id = req.body.id;
  const address = req.body.address;
  db.deleteAddressById(id, address)
    .then((data) => {
      res.status(200).send("Address updated!");
    })
    .catch((err) => res.status(400).send(err));
});

// deletes an entire contact (including name/email/addy/phone#)
app.post("/delete_contact_by_name", (req, res) => {
  const name = req.body.name;
  db.deleteContactByName(name)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => res.status(400).send(err));
});
