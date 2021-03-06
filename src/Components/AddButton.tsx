import React from "react";

interface Props {
  setDisplayAddModal: (displayAddModal: boolean) => void;
}

// ADD BUTTON COMPONENT: A BUTTON TO TRIGGER THE ADD CONTACT MODAL
export const AddButton: React.FC<Props> = (props) => {
  return (
    <button
      className="add-button button"
      onClick={() => props.setDisplayAddModal(true)}
    >
      Add Contact
    </button>
  );
};

export default AddButton;
