import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import SearchBar from "./Components/SearchBar";
import AddButton from "./Components/AddButton";
import NamesList from "./Components/NameList";
import AddModal from "./Components/AddModal";
import ContactModal from "./Components/ContactModal";

export const App: React.FC = () => {
  // these hooks will be used to determine if infocard modal or add contact modal are showing

  // HOOKS
  const [displayInfoModal, setDisplayInfoModal] = useState(false);
  const [displayAddModal, setDisplayAddModal] = useState(false);
  const [inputText, setInputText] = useState("");
  const [listOfNames, setListOfNames] = useState([]);

  // QUERIES
  const getAllNames = () => {
    axios
      .get("/get_all_names")
      .then((result) => {
        setListOfNames(result.data);
      })
      .catch((err) => console.log(err));
  };

  // GET INFO ON MOUNT
  useEffect(() => {
    getAllNames();
  }, []);

  return (
    <div>
      <div className="header-text">FACEBOOK</div>

      <SearchBar inputText={inputText} setInputText={setInputText} />
      <AddButton />
      <NamesList listOfNames={listOfNames} />

      <AddModal />
      <ContactModal />

      <div className="footer-text">
        Copyright &copy; 2020, &nbsp; Jared Rothenberg. &nbsp; All Rights
        Reserved
      </div>
    </div>
  );
};

export default App;
