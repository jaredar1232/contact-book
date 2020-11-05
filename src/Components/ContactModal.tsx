import React from "react";

interface Props {
  selectedName: string;
  displayInfoModal: boolean;
  setDisplayInfoModal: (displayInfoModal: boolean) => void;
}

export const ContactModal: React.FC<Props> = () => {
  // const [,] = useState(false);

  return (
    <div className="contact-modal">
      <div>CONTACT MODAL</div>
    </div>
  );
};

export default ContactModal;
