import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import SearchBar from "./Components/SearchBar";
import AddButton from "./Components/AddButton";
import NamesList from "./Components/NamesList";
import AddModal from "./Components/AddModal";
import ContactModal from "./Components/ContactModal";

export const App: React.FC = () => {
  // HOOKS
  // const [displayInfoModal, setDisplayInfoModal] = useState(false);
  const [displayAddModal, setDisplayAddModal] = useState(false);
  const [inputText, setInputText] = useState("");
  const [listOfNames, setListOfNames] = useState([""]);
  const [filteredListOfNames, setFilteredListOfNames] = useState([""]);

  /////////////////////////////////////////////////////////
  // METHODS
  /////////////////////////////////////////////////////////
  // FILTER listOfNames BASED ON SEARCHBAR inputText
  const filterListOfNames = (arrayOfItems: any[], targetString: string) => {
    const arrayOfFilteredNames = [];
    // iterates over names list, creating a filted list based on what is typed in the search bar
    for (let i = 0; i < arrayOfItems.length; i++) {
      const lowerTargetString = targetString.toLocaleLowerCase();
      const lowerString = arrayOfItems[i].toLocaleLowerCase();
      if (lowerString.includes(lowerTargetString)) {
        arrayOfFilteredNames.push(arrayOfItems[i]);
      }
    }
    // this second set of names is used to prevent permanent removal from the names list when searching
    return arrayOfFilteredNames;
  };

  /////////////////////////////////////////////////////////
  // QUERIES
  /////////////////////////////////////////////////////////
  const getAllNames = async () => {
    await axios
      .get("/get_all_names")
      .then((result) => {
        // converts from array of objects w/ name property to array of string names
        const dataArray = [];
        for (const person in result.data) {
          const name = result.data[person].name;
          dataArray.push(name);
        }

        setListOfNames(dataArray);
        setFilteredListOfNames(filterListOfNames(dataArray, ""));
      })
      .catch((err) => console.log(err));
  };

  /////////////////////////////////////////////////////////
  // USE EFFECTS
  /////////////////////////////////////////////////////////
  // ON MOUNT: get all names from db and populate the filtered list of names
  useEffect(() => {
    getAllNames();
  }, []);

  // UPDATES listOfNames WHENEVER SOMEONE TYPES IN SEARCHBAR
  useEffect(() => {
    setFilteredListOfNames(filterListOfNames(listOfNames, inputText));
  }, [inputText]);

  return (
    <div>
      <div className="header-text">The Compendium</div>

      <SearchBar inputText={inputText} setInputText={setInputText} />
      <AddButton
        displayAddModal={displayAddModal}
        setDisplayAddModal={setDisplayAddModal}
      />
      <br></br>
      <NamesList filteredListOfNames={filteredListOfNames} />
      <br></br>

      <AddModal displayAddModal={displayAddModal} getAllNames={getAllNames} />
      <br></br>
      <ContactModal />

      <div className="footer-text">
        Copyright &copy; 2020, &nbsp; Jared Rothenberg. &nbsp; All Rights
        Reserved
      </div>
    </div>
  );
};

export default App;
