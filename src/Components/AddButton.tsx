import React from "react";

interface Props {
  displayAddModal: boolean;
  setDisplayAddModal: (displayAddModal: boolean) => void;
}

export const AddButton: React.FC<Props> = (props) => {
  return (
    <div className="add-button">
      <button onClick={() => props.setDisplayAddModal(!props.displayAddModal)}>
        Add Contact
      </button>
    </div>
  );
};

export default AddButton;
