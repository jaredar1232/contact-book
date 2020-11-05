import React, { useEffect, useState } from "react";
import axios from "axios";
import DataList from "./DataList";

interface Props {
  selectedName: string;
  displayInfoModal: boolean;
  setDisplayInfoModal: (displayInfoModal: boolean) => void;
  getAllNames: () => void;
}

export const ContactModal: React.FC<Props> = (props) => {
  const [addressArray, setAddressArray] = useState([""]);
  const [emailArray, setEmailArray] = useState([""]);
  const [numberArray, setNumberArray] = useState([""]);

  // SETS STATE WITH DATA FROM QUERIES
  const setDataArrays = (dataToBeStored: any) => {
    setAddressArray(dataToBeStored.address);
    setEmailArray(dataToBeStored.email);
    setNumberArray(dataToBeStored.number);
  };

  //////////////////////////////
  // QUERIES
  //////////////////////////////
  const deleteContactByName = (nameToDelete: string) => {
    axios
      .post("/delete_contact_by_name", { name: `${nameToDelete}` })
      .then(() => {
        props.getAllNames();
        props.setDisplayInfoModal(!props.displayInfoModal);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // GETS DATA RELATED TO selectedName WHENEVER selectedName CHANGES AND STORES IT
  useEffect(() => {
    axios
      .get("/get_info_by_name", { params: { name: `${props.selectedName}` } })
      .then((response) => {
        setDataArrays(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.selectedName]);

  return (
    <div
      className="contact-modal"
      style={{ display: props.displayInfoModal ? "block" : "none" }}
    >
      <div onClick={() => props.setDisplayInfoModal(!props.displayInfoModal)}>
        Exit
      </div>
      <div>CONTACT MODAL</div>
      <div>{props.selectedName}</div>
      {addressArray.map((aAddress) => (
        <DataList dataForContact={aAddress} key={aAddress} />
      ))}
      {emailArray.map((aEmail) => (
        <DataList dataForContact={aEmail} key={aEmail} />
      ))}
      {numberArray.map((aNumber) => (
        <DataList dataForContact={aNumber} key={aNumber} />
      ))}
      <div onClick={() => deleteContactByName(props.selectedName)}>
        DELETE CONTACT
      </div>
    </div>
  );
};

export default ContactModal;

// edit button
// delete individual
