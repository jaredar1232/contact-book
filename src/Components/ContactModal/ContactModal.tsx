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

// CONTACT MODAL COMPONENT: A MODAL POPUP THAT DISPLAYS INFO ASSOCIATED WITH THE CLICKED NAME
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

  // QUERIES
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
      <div className={props.displayInfoModal? "modal-functionality-shown" : "modal-functionality-hiden"} onClick={() => props.setDisplayInfoModal(!props.displayInfoModal)}></div>
      <div className="modal-content">
        <div
          className="exit-button"
          onClick={() => props.setDisplayInfoModal(!props.displayInfoModal)}
        >
          X
        </div>
        <div className="contact-modal-header">Contact Info</div>
        <div className="contact-modal-name">{props.selectedName}</div>

        <div className="contact-modal-secondary-data">
          <div className="contact-modal-datalist">
            {addressArray.length === 0 ? (
              <div>No addresses added</div>
            ) : (
              addressArray.map((aAddress) => (
                <DataList
                  dataForContact={aAddress}
                  key={aAddress}
                  dataType="Address"
                  getInfoByID={getInfoByID}
                  selectedID={props.selectedID}
                />
              ))
            )}
          </div>

          <div className="contact-modal-datalist">
            {emailArray.length === 0 ? (
              <div>No emails added</div>
            ) : (
              emailArray.map((aEmail) => (
                <DataList
                  dataForContact={aEmail}
                  key={aEmail}
                  dataType="Email"
                  getInfoByID={getInfoByID}
                  selectedID={props.selectedID}
                />
              ))
            )}
          </div>

          <div className="contact-modal-datalist">
            {numberArray.length === 0 ? (
              <div>No numbers added</div>
            ) : (
              numberArray.map((aNumber) => (
                <DataList
                  dataForContact={aNumber}
                  key={aNumber}
                  dataType="Number"
                  getInfoByID={getInfoByID}
                  selectedID={props.selectedID}
                />
              ))
            )}
          </div>
        </div>

        <button
          className="contact-modal-delete-all-button button"
          onClick={() => deleteContactByID(props.selectedID)}
        >
          Delete Contact
        </button>
      </div>
    </div>
  );
};

export default ContactModal;

// edit button
