import React, { useEffect, useState } from "react";
import axios from "axios";
import DataList from "./DataList";

interface Props {
  selectedName: string;
  setSelectedName: (selectedName: string) => void;
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
        props.setSelectedName("");
        props.setDisplayInfoModal(!props.displayInfoModal);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getInfoByName = (name: string) => {
    axios
      .get("/get_info_by_name", {
        params: { name: `${name}` },
      })
      .then((response) => {
        setDataArrays(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // GETS DATA RELATED TO selectedName WHENEVER selectedName CHANGES AND STORES IT
  useEffect(() => {
    getInfoByName(props.selectedName);
  }, [props.selectedName]);
  // props.selectedName;
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
        <DataList
          dataForContact={aAddress}
          key={aAddress}
          dataType="Address"
          getInfoByName={getInfoByName}
          currentName={props.selectedName}
        />
      ))}
      {emailArray.map((aEmail) => (
        <DataList
          dataForContact={aEmail}
          key={aEmail}
          dataType="Email"
          getInfoByName={getInfoByName}
          currentName={props.selectedName}
        />
      ))}
      {numberArray.map((aNumber) => (
        <DataList
          dataForContact={aNumber}
          key={aNumber}
          dataType="Number"
          getInfoByName={getInfoByName}
          currentName={props.selectedName}
        />
      ))}
      <div onClick={() => deleteContactByName(props.selectedName)}>
        DELETE CONTACT
      </div>
    </div>
  );
};

export default ContactModal;

// edit button
