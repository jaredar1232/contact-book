import React, { useEffect, useState } from "react";
import axios from "axios";
import DataList from "./DataList";

interface Props {
  selectedName: string;
  setSelectedName: (selectedName: string) => void;
  selectedID: number;
  setSelectedID: (selectedID: number) => void;
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
  const deleteContactByID = (ID: number) => {
    axios
      .post(`/delete_contact_by_id?ID=${ID}`)
      .then(() => {
        props.getAllNames();
        props.setSelectedID(-1);
        props.setDisplayInfoModal(!props.displayInfoModal);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getInfoByID = (ID: number) => {
    axios
      .get(`/get_info_by_id?ID=${ID}`)
      .then((response) => {
        setDataArrays(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // GETS DATA RELATED TO selectedName WHENEVER selectedName CHANGES AND STORES IT
  useEffect(() => {
    getInfoByID(props.selectedID);
  }, [props.selectedID]);

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
          getInfoByID={getInfoByID}
          selectedID={props.selectedID}
        />
      ))}
      {emailArray.map((aEmail) => (
        <DataList
          dataForContact={aEmail}
          key={aEmail}
          dataType="Email"
          getInfoByID={getInfoByID}
          selectedID={props.selectedID}
        />
      ))}
      {numberArray.map((aNumber) => (
        <DataList
          dataForContact={aNumber}
          key={aNumber}
          dataType="Number"
          getInfoByID={getInfoByID}
          selectedID={props.selectedID}
        />
      ))}
      <div onClick={() => deleteContactByID(props.selectedID)}>
        DELETE CONTACT
      </div>
    </div>
  );
};

export default ContactModal;

// edit button
