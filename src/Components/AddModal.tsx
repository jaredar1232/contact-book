import React, { useState, useEffect } from "react";
import axios from "axios";
var Filter = require("bad-words"),
  filter = new Filter();

interface Props {
  displayAddModal: boolean;
  getAllNames: () => void;
  setDisplayAddModal: (displayAddModal: boolean) => void;
}

export const AddModal: React.FC<Props> = (props) => {
  const [nameVal, setNameVal] = useState("");
  const [returnID, setReturnID] = useState(-1);
  const [numberVal1, setNumberVal1] = useState("");
  const [numberVal2, setNumberVal2] = useState("");
  const [numberVal3, setNumberVal3] = useState("");
  const [addressVal1, setAddressVal1] = useState("");
  const [addressVal2, setAddressVal2] = useState("");
  const [addressVal3, setAddressVal3] = useState("");
  const [emailVal1, setEmailVal1] = useState("");
  const [emailVal2, setEmailVal2] = useState("");
  const [emailVal3, setEmailVal3] = useState("");

  // USED TO CLEAR FORM
  const clearForm = async () => {
    setNameVal("");
    setNumberVal1("");
    setNumberVal2("");
    setNumberVal3("");
    setAddressVal1("");
    setAddressVal2("");
    setAddressVal3("");
    setEmailVal1("");
    setEmailVal2("");
    setEmailVal3("");
  };

  // USED IN TWO METHODS
  const arrayOfNumbers = [numberVal1, numberVal2, numberVal3],
    arrayOfAddresses = [addressVal1, addressVal2, addressVal3],
    arrayOfEmails = [emailVal1, emailVal2, emailVal3];

  // CHECKS VALUES OF FORM
  const checkForm = () => {
    const nameRegex = /^([a-zA-Z]+){1,25} ([a-zA-Z]+){1,25}$/;
    const numberRegex = /^([0-9]){10,15}$/;
    const addressRegex = /^([a-zA-Z0-9\. ]){5,100}$/;
    const emailRegex = /^([a-zA-Z0-9]+@[a-zA-Z]+\.com){1}$/;

    const numberAlert =
      "Please enter a valid number in the form 8003334444. Limitations: [15 digits]";
    const addressAlert =
      "Please enter a valid address. Limitations: [Between 4-100 characters]";
    const emailAlert = `Please enter a valid email. Limitations: [50 characters]`;

    // CHECKS NAME VALUE: ALERTS IF INVALID
    if (!nameRegex.test(nameVal)) {
      window.alert(
        `Please enter a valid first and last name. Limitations: [50 letters]`
      );
      return false;
    }

    // CHECKS SECONDARY INPUTS: ALERTS IF INVALID
    const secondaryInputFilter = (
      arrayOfValues: string[],
      regexFilter: RegExp,
      alertMessage: string
    ) => {
      for (let i = 0; i < arrayOfValues.length; i++) {
        if (!regexFilter.test(arrayOfValues[i]) && arrayOfValues[i] !== "") {
          window.alert(alertMessage);
          return false;
        }
      }
      return true;
    };

    if (!secondaryInputFilter(arrayOfNumbers, numberRegex, numberAlert)) {
      return false;
    } else if (
      !secondaryInputFilter(arrayOfAddresses, addressRegex, addressAlert)
    ) {
      return false;
    } else if (!secondaryInputFilter(arrayOfEmails, emailRegex, emailAlert)) {
      return false;
    }

    return true;
  };

  // POSTS ALL INPUTS TO DATABASE BY NAME ID
  const multiQuery = async (
    arrayOfValues: string[],
    path: string,
    dataType: string
  ) => {
    for (let i = 0; i < arrayOfValues.length; i++) {
      let cleanedVal = filter.clean(arrayOfValues[i]);
      if (cleanedVal !== "" && nameVal !== "") {
        await axios
          .post(`${path}${returnID}`, {
            [dataType]: cleanedVal,
          })
          .catch((err) => {
            window.alert(
              `The ${dataType} field encounted an issue being saved. Ensure this info isn't already being used for a contact and try again.`
            );
            console.log(err);
          });
      }
    }
  };

  // POSTS A NAME TO THE DATABASE AND GETS A NAME ID IN RESPONSE
  const addNameQuery = async () => {
    let cleanedVal = filter.clean(nameVal);
    if (cleanedVal !== "") {
      await axios
        .post("/add_name", {
          name: cleanedVal,
        })
        .then(async (response) => {
          setReturnID(response.data.name_id);
        })
        .catch((err) => console.log(err));
    }
  };

  // CHECKS INPUTS, SUBMITS NAME
  const submitDataHandler = async () => {
    // CHECKS FOR VALID INPUTS: IF NOT VALID, RETURNS FALSE AND STOPS SUBMIT
    if (checkForm() === false) {
      return false;
    }
    // ADDS NAME TO DATABASE BEFORE ADDING RELATED DATA
    await addNameQuery();
  };

  // SUBMITS SECONDARY INPUTS
  const followUpSubmit = async () => {
    const numbersPath = "/add_phone_number_by_id?ID=",
      addressesPath = "/add_address_by_id?ID=",
      emailsPath = "/add_email_by_id?ID=";

    // AWAITS USED TO PREVENT A TIMING BUG ON THE FONTEND
    await multiQuery(arrayOfNumbers, numbersPath, "number");
    await multiQuery(arrayOfAddresses, addressesPath, "address");
    await multiQuery(arrayOfEmails, emailsPath, "email");

    await clearForm();
    props.getAllNames();
    props.setDisplayAddModal(false);
  };

  // WAITS FOR ID TO BE RETURNED FROM A NAME SUBMISSION TO DATABASE BEFORE ADDING SECONDARY INPUTS
  useEffect(() => {
    followUpSubmit();
  }, [returnID]);

  return (
    <div
      className="add-modal"
      style={{ display: props.displayAddModal ? "block" : "none" }}
    >
      <div>
        <div className="modal-content ">
          <div
            className="exit-button"
            onClick={() => props.setDisplayAddModal(!props.displayAddModal)}
          >
            X
          </div>
          <div className="add-modal-header">Add Contact</div>
          <div className="add-modal-name-container">
            <input
              className="add-modal-inputs"
              placeholder="Name: First Last"
              value={nameVal}
              onChange={(event) => setNameVal(event.target.value)}
            ></input>
          </div>

          <div className="add-modal-secondary-inputs">
            <div className="add-modal-secondary-inputs-sub">
              <input
                className="add-modal-inputs"
                placeholder="Address"
                value={addressVal1}
                onChange={(event) => setAddressVal1(event.target.value)}
              />
              <input
                className="add-modal-inputs"
                placeholder="Email"
                value={emailVal1}
                onChange={(event) => setEmailVal1(event.target.value)}
              />
              <input
                className="add-modal-inputs"
                placeholder="Phone Number"
                value={numberVal1}
                onChange={(event) => setNumberVal1(event.target.value)}
              />
            </div>

            <div>
              <div className="add-modal-secondary-inputs-sub">
                <input
                  className="add-modal-inputs"
                  placeholder="Alt Address"
                  value={addressVal2}
                  onChange={(event) => setAddressVal2(event.target.value)}
                />
                <input
                  className="add-modal-inputs"
                  placeholder="Alt Email"
                  value={emailVal2}
                  onChange={(event) => setEmailVal2(event.target.value)}
                />
                <input
                  className="add-modal-inputs"
                  placeholder="Alt Phone Number"
                  value={numberVal2}
                  onChange={(event) => setNumberVal2(event.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="add-modal-secondary-inputs-sub">
                <input
                  className="add-modal-inputs"
                  placeholder="Alt Address"
                  value={addressVal3}
                  onChange={(event) => setAddressVal3(event.target.value)}
                />
                <input
                  className="add-modal-inputs"
                  placeholder="Alt Email"
                  value={emailVal3}
                  onChange={(event) => setEmailVal3(event.target.value)}
                />
                <input
                  className="add-modal-inputs"
                  placeholder="Alt Phone Number"
                  value={numberVal3}
                  onChange={(event) => setNumberVal3(event.target.value)}
                />
              </div>
            </div>
          </div>

          <button
            className="button"
            onClick={() => {
              submitDataHandler();
            }}
          >
            Save Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
