import React, { useState } from "react";

interface Props {
  inputText: string;
  setInputText: (inputValue: string) => void;
}

export const SearchBar: React.FC<Props> = (props) => {
  return (
    <div className="search-bar">
      <input
        value={props.inputText}
        onChange={(event) => props.setInputText(event.target.value)}
      ></input>
    </div>
  );
};

export default SearchBar;
