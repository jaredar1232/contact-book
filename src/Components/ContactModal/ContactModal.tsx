import React, { useEffect, useState } from "react";
import axios from "axios";
import AddressList from "./AddressList";
import EmailList from "./EmailList";
import NumberList from "./NumberList";

interface Props {
  selectedName: string;
  displayInfoModal: boolean;
  setDisplayInfoModal: (displayInfoModal: boolean) => void;
}

export const ContactModal: React.FC<Props> = (props) => {
  const [addressArray, setAddressArray] = useState([""]);
  const [emailArray, setEmailArray] = useState([""]);
  const [numberArray, setNumberArray] = useState([""]);

  const setDataArrays = (dataToBeStored: any) => {
    setAddressArray(dataToBeStored.address);
    setEmailArray(dataToBeStored.email);
    setNumberArray(dataToBeStored.number);
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
        <AddressList aAddress={aAddress} key={aAddress} />
      ))}
      {emailArray.map((aEmail) => (
        <EmailList aEmail={aEmail} key={aEmail} />
      ))}
      {numberArray.map((aNumber) => (
        <NumberList aNumber={aNumber} key={aNumber} />
      ))}
    </div>
  );
};

export default ContactModal;
