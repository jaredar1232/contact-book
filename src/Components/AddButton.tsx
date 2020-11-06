import React from "react";

interface Props {
  setDisplayAddModal: (displayAddModal: boolean) => void;
}

export const AddButton: React.FC<Props> = (props) => {
  return (
    <div className="add-button">
      <button onClick={() => props.setDisplayAddModal(true)}>
        Add Contact
      </button>
    </div>
  );
};

export default AddButton;
