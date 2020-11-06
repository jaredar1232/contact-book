import React from "react";
import axios from "axios";

interface Props {
  dataForContact: string;
  dataType: string;
  getInfoByID: (ID: number) => void;
  selectedID: number;
}

// DATA LIST COMPONENT: RENDERES A PIECE OF INFO FROM AN ARRAY OF DATA AND PROVIDES DELETE ABILITIES
export const dataList: React.FC<Props> = (props) => {
  // SETS QUERY PATH BASED ON WHAT DATA COMPONENT IS RENDERING
  const setPath = (type: string) => {
    if (type === "Address") {
      return "/delete_address";
    } else if (type === "Number") {
      return "/delete_phone_number";
    } else if (type === "Email") {
      return "/delete_email";
    }
  };

  const deleteDataField = (type: string, dataToBeDeleted: string) => {
    let path = setPath(type) || "";
    let dataKey = type.toLowerCase();

    axios
      .post(path, {
        [dataKey]: `${dataToBeDeleted}`,
      })
      .then((response) => {
        console.log(response);
        props.getInfoByID(props.selectedID);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div>{props.dataForContact}</div>
      <button
        onClick={() => deleteDataField(props.dataType, props.dataForContact)}
      >{`Delete ${props.dataType}`}</button>
    </div>
  );
};

export default dataList;
