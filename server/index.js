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
// POSTGRES
////////////////////////////////////////////////////////

app.get("/get_all_names", (req, res) => {
  db.getAllPeople()
    .then((data) => {
      res.status(200).send(data.rows);
    })
    .catch((err) => res.status(400).send(err));
});

// getEmailAndIdByName
// getPhoneNumberAndIdByName
// getAddressAndIdByName

app.post("/add_name", (req, res) => {
  const name = req.body.name;
  db.addName(name)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => res.status(400).send(err));
});

app.post("/add_email_by_name", (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  const email = req.body.email;
  db.addEmailByName(name, email)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => res.status(400).send(err));
});

// addPhoneNumberByName
// addAddressByName

// updateEmailById
// updatePhoneNumberById
// updateAddressById

// deleteEmailById
// deletePhoneNumberById
// deleteAddressById
// deleteContactByName

// deletes an entire contact (including name/email/addy/phone#)
app.post("/delete_contact_by_name", (req, res) => {
  const name = req.body.name;
  db.deleteContactByName(name)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => res.status(400).send(err));
});
