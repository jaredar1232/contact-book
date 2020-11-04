import React, { useState } from "react";
import axios from "axios";

interface Props {
  displayAddModal: boolean;
  getAllNames: () => void;
  setDisplayAddModal: (displayAddModal: boolean) => void;
}

export const AddModal: React.FC<Props> = (props) => {
  const [nameVal, setNameVal] = useState("");
  const [numberVal1, setNumberVal1] = useState("");
  const [numberVal2, setNumberVal2] = useState("");
  const [numberVal3, setNumberVal3] = useState("");
  const [addressVal1, setAddressVal1] = useState("");
  const [addressVal2, setAddressVal2] = useState("");
  const [addressVal3, setAddressVal3] = useState("");
  const [emailVal1, setEmailVal1] = useState("");
  const [emailVal2, setEmailVal2] = useState("");
  const [emailVal3, setEmailVal3] = useState("");

  // creat arrays of each value
  // create a function that does an appropriate axios call
  // iterate over the array using the axios call on each element

  const submitDataHandler = () => {
    const arrayOfNumbers = [numberVal1, numberVal2, numberVal3],
      arrayOfAddresses = [addressVal1, addressVal2, addressVal3],
      arrayOfEmails = [emailVal1, emailVal2, emailVal3];

    const numbersPath = "/add_phone_number_by_name",
      addressesPath = "/add_address_by_name",
      emailsPath = "/add_email_by_name";

    const multiQuery = async (
      arrayOfValues: string[],
      path: string,
      dataType: string
    ) => {
      for (let i = 0; i < arrayOfValues.length; i++) {
        if (arrayOfValues[i] !== "" && nameVal !== "") {
          await axios
            .post(`${path}`, {
              [dataType]: arrayOfValues[i],
              name: nameVal,
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

    const addName = async () => {
      if (nameVal !== "") {
        await axios
          .post("/add_name", {
            name: nameVal,
          })
          .catch((err) => console.log(err));
      }
    };

    addName();
    multiQuery(arrayOfNumbers, numbersPath, "number");
    multiQuery(arrayOfAddresses, addressesPath, "address");
    multiQuery(arrayOfEmails, emailsPath, "email");
    props.getAllNames();
    props.setDisplayAddModal(!props.displayAddModal);
  };

  return (
    <div
      className="add-modal"
      style={{ display: props.displayAddModal ? "block" : "none" }}
    >
      <div onClick={() => props.setDisplayAddModal(!props.displayAddModal)}>
        Exit
      </div>

      <div>
        <div>ADD MODAL</div>
        <div>
          <input
            placeholder="Name"
            value={nameVal}
            onChange={(event) => setNameVal(event.target.value)}
          ></input>
        </div>

        <div>
          <input
            placeholder="Phone Number"
            value={numberVal1}
            onChange={(event) => setNumberVal1(event.target.value)}
          ></input>
          <input
            placeholder="Address"
            value={addressVal1}
            onChange={(event) => setAddressVal1(event.target.value)}
          ></input>
          <input
            placeholder="Email"
            value={emailVal1}
            onChange={(event) => setEmailVal1(event.target.value)}
          ></input>
        </div>

        <div>
          <input
            placeholder="Alt Phone Number"
            value={numberVal2}
            onChange={(event) => setNumberVal2(event.target.value)}
          ></input>
          <input
            placeholder="Alt Address"
            value={addressVal2}
            onChange={(event) => setAddressVal2(event.target.value)}
          ></input>
          <input
            placeholder="Alt Email"
            value={emailVal2}
            onChange={(event) => setEmailVal2(event.target.value)}
          ></input>
        </div>

        <div>
          <input
            placeholder="Alt Phone Number"
            value={numberVal3}
            onChange={(event) => setNumberVal3(event.target.value)}
          ></input>
          <input
            placeholder="Alt Address"
            value={addressVal3}
            onChange={(event) => setAddressVal3(event.target.value)}
          ></input>
          <input
            placeholder="Alt Email"
            value={emailVal3}
            onChange={(event) => setEmailVal3(event.target.value)}
          ></input>
        </div>

        <button
          onClick={() => {
            submitDataHandler();
          }}
        >
          Save Contact
        </button>
      </div>
    </div>
  );
};

export default AddModal;
