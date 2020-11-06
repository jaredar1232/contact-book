import React, { useState } from "react";
import axios from "axios";

interface Props {
  dataForContact: string;
  dataType: string;
  getInfoByID: (ID: number) => void;
  selectedID: number;
}

// DATA LIST COMPONENT: RENDERES A PIECE OF INFO FROM AN ARRAY OF DATA AND PROVIDES DELETE ABILITIES
export const DataList: React.FC<Props> = (props) => {
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(props.dataForContact);

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

  const deleteDataFieldQuery = (type: string, dataToBeDeleted: string) => {
    let path = setPath(type) || "";
    let dataKey = type.toLowerCase();
    axios
      .post(path, {
        [dataKey]: `${dataToBeDeleted}`,
      })
      .then((response) => {
        props.getInfoByID(props.selectedID);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editDataQuery = () => {
    let path = "",
      oldValue = "",
      newValue = "";

    if (props.dataType === "Address") {
      path = "/update_address";
      oldValue = "oldAddress";
      newValue = "newAddress";
    } else if (props.dataType === "Email") {
      path = "/update_email";
      oldValue = "oldEmail";
      newValue = "newEmail";
    } else if (props.dataType === "Number") {
      path = "/update_phone_number";
      oldValue = "oldNumber";
      newValue = "newNumber";
    }

    axios
      .post(path, {
        [oldValue]: `${props.dataForContact}`,
        [newValue]: `${inputValue}`,
      })
      .then((response) => {
        props.getInfoByID(props.selectedID);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editOnClickHandler = () => {
    if (editing) {
      editDataQuery();
    }

    setEditing(!editing);
  };

  return (
    <div>
      {editing ? (
        <input
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
      ) : (
        <div>{props.dataForContact}</div>
      )}

      <button onClick={() => editOnClickHandler()}>
        {editing ? "Save" : "Edit"}
      </button>
      <button
        onClick={() =>
          deleteDataFieldQuery(props.dataType, props.dataForContact)
        }
      >{`Delete ${props.dataType}`}</button>
    </div>
  );
};

export default DataList;
