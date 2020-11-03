import React, { useState } from "react";

export const SearchBar: React.FC = () => {
  const [inputText, setInputText] = useState([{ text: "Search a name" }]);

  return (
    <div className="search-bar">{/* <input value={inputText}></input> */}</div>
  );
};

export default SearchBar;
