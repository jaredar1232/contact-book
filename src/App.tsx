import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import SearchBar from "./Components/SearchBar";
import AddButton from "./Components/AddButton";
import NamesList from "./Components/NamesList/NamesList";
import AddModal from "./Components/AddModal";
import ContactModal from "./Components/ContactModal/ContactModal";

export const App: React.FC = () => {
  // STATE
  const [displayInfoModal, setDisplayInfoModal] = useState(false);
  const [selectedName, setSelectedName] = useState("");
  const [selectedID, setSelectedID] = useState(0);
  const [displayAddModal, setDisplayAddModal] = useState(false);
  const [inputText, setInputText] = useState("");
  const [listOfNamesAndIDs, setListOfNamesAndIDs] = useState([
    { name_id: 0, name: "" },
  ]);
  const [filteredListOfNames, setFilteredListOfNames] = useState([{}]);

  // METHODS
  // FILTER listOfNames BASED ON SEARCHBAR inputText
  const filterListOfNames = (
    arrayOfObjects: { name_id: number; name: string }[],
    targetString: string
  ) => {
    const arrayOfFilteredNamesAndIDs = [];
    // iterates over names, creating a filted list based on what is typed in the search bar
    for (let i = 0; i < arrayOfObjects.length; i++) {
      const lowerTargetString = targetString.toLowerCase();
      const lowerString = arrayOfObjects[i].name.toLowerCase();

      if (lowerString.includes(lowerTargetString)) {
        arrayOfFilteredNamesAndIDs.push(arrayOfObjects[i]);
      }
    }
    // this second set of names is used to prevent permanent removal from the names list when searching
    return arrayOfFilteredNamesAndIDs;
  };

  const nameClickHandler = (ID: number, name: string) => {
    setSelectedID(ID);
    setSelectedName(name);
    setDisplayInfoModal(true);
  };

  // QUERIES
  const getAllNames = async () => {
    await axios
      .get("/get_all_names_and_ids")
      .then((result) => {
        setListOfNamesAndIDs(result.data);
        setFilteredListOfNames(filterListOfNames(result.data, ""));
      })
      .catch((err) => console.log(err));
  };

  // USE EFFECTS
  // ON MOUNT: GET ALL NAMES FROM DB AND POPULATE listOfNamesAndIDs / filteredListOfNames
  useEffect(() => {
    getAllNames();
  }, []);

  // UPDATES listOfNames WHENEVER SOMEONE TYPES IN SEARCHBAR
  useEffect(() => {
    setFilteredListOfNames(filterListOfNames(listOfNamesAndIDs, inputText));
  }, [inputText]);

  return (
    <div className="page-container">
      <header className="header">The Compendium</header>
      <div className="content-wrap">
        <div className="search-and-add">
          <SearchBar inputText={inputText} setInputText={setInputText} />
          <AddButton setDisplayAddModal={setDisplayAddModal} />
        </div>

        <NamesList
          filteredListOfNames={filteredListOfNames}
          nameClickHandler={nameClickHandler}
        />

        <AddModal
          displayAddModal={displayAddModal}
          getAllNames={getAllNames}
          setDisplayAddModal={setDisplayAddModal}
        />

        <ContactModal
          selectedName={selectedName}
          setSelectedName={setSelectedName}
          selectedID={selectedID}
          displayInfoModal={displayInfoModal}
          setDisplayInfoModal={setDisplayInfoModal}
          getAllNames={getAllNames}
          setSelectedID={setSelectedID}
        />
      </div>
      <footer className="footer">
        Copyright &copy; 2020, &nbsp; Jared Rothenberg. &nbsp; All Rights
        Reserved
      </footer>
    </div>
  );
};

export default App;
