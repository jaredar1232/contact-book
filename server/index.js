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
  //   console.log(req.body.name);
  const name = req.body.name;
  db.addName(name)
    .then((data) => {
      //   console.log(data);
      res.status(200).send(data);
    })
    .catch((err) => res.status(400).send(err));
});

// addEmailByName
// addPhoneNumberByName
// addAddressByName

// updateEmailById
// updatePhoneNumberById
// updateAddressById

// deleteEmailById
// deletePhoneNumberById
// deleteAddressById
// deleteContactByName

// app.post("/search", (req, res) => {
//   const name = req.body.text;
//   db.searchString(name)
//     .then((data) => {
//       res.status(200).send(data.rows);
//     })
//     .catch((err) => res.status(400).send(err));
// });

// app.post("/id", (req, res) => {
//   const id = req.body.id;
//   db.searchId(id)
//     .then((data) => {
//       res.status(200).send(data.rows);
//     })
//     .catch((err) => res.status(400).send(err));
// });

// app.post("/search_related", (req, res) => {
//   const name = req.body.text;
//   // console.log('should log what is typed', name)
//   db.searchRelated(name)
//     .then((data) => {
//       res.status(200).send(data.rows);
//     })
//     .catch((err) => res.status(400).send(err));
// });

// app.get("/get_items", (req, res) => {
//   db.getAllItems()
//     .then((data) => {
//       res.status(200).send(data.rows);
//     })
//     .catch((err) => res.status(400).send(err));
// });
