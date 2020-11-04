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
  const [listOfNames, setListOfNames] = useState([""]);
  const [filteredListOfNames, setFilteredListOfNames] = useState([""]);

  /////////////////////////////////////////////////////////
  // METHODS
  /////////////////////////////////////////////////////////
  // FILTER listOfNames BASED ON SEARCHBAR inputText
  function filterListOfNames() {
    const arrayOfFilteredNames = [];
    // iterates over names list, creating a filted list based on what is typed in the search bar
    for (let i = 0; i < listOfNames.length; i++) {
      const lowerInputText = inputText.toLocaleLowerCase();
      const lowerName = listOfNames[i].toLocaleLowerCase();
      if (lowerName.includes(lowerInputText)) {
        arrayOfFilteredNames.push(listOfNames[i]);
      }
    }
    // this second set of names is used to prevent permanent removal from the names list when searching
    setFilteredListOfNames(arrayOfFilteredNames);
  }

  /////////////////////////////////////////////////////////
  // QUERIES
  /////////////////////////////////////////////////////////
  const getAllNames = () => {
    axios
      .get("/get_all_names")
      .then((result) => {
        // converts from array of objects w/ name property to array of string names
        const dataArray = [];
        for (const person in result.data) {
          const name = result.data[person].name;
          dataArray.push(name);
        }

        setListOfNames(dataArray);
      })
      .catch((err) => console.log(err));
  };

  /////////////////////////////////////////////////////////
  // USE EFFECTS
  /////////////////////////////////////////////////////////
  // ON MOUNT: get all names from db and populate the filtered list of names
  useEffect(() => {
    getAllNames();
    filterListOfNames();
  }, []);

  // UPDATES listOfNames WHENEVER SOMEONE TYPES IN SEARCHBAR
  useEffect(() => {
    filterListOfNames();
  }, [inputText]);

  return (
    <div>
      <div className="header-text">FACEBOOK</div>

      <SearchBar inputText={inputText} setInputText={setInputText} />
      <AddButton />
      <NamesList filteredListOfNames={filteredListOfNames} />

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
