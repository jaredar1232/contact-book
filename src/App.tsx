import React, { useState } from "react";
import "./App.css";
import SearchBar from "./Components/SearchBar";
import AddButton from "./Components/AddButton";
import NameList from "./Components/NameList";
import AddModal from "./Components/AddModal";
import ContactModal from "./Components/ContactModal";

export const App: React.FC = () => {
  // these hooks will be used to determine if infocard modal or add contact modal are showing
  const [infoCardModal, setInfoCard] = useState(false);
  const [addCardModal, setAddCard] = useState(false);

  return (
    <div>
      <div className="header-text">FACEBOOK</div>

      <SearchBar></SearchBar>
      <AddButton></AddButton>
      <NameList></NameList>

      <AddModal></AddModal>
      <ContactModal></ContactModal>

      <div className="footer-text">
        Copyright &copy; 2020, &nbsp; Jared Rothenberg. &nbsp; All Rights
        Reserved
      </div>
    </div>
  );
};

export default App;
