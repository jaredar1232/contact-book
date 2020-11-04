import React from "react";

interface Props {
  inputText: string;
  setInputText: (inputValue: string) => void;
}

// SEARCH BAR COMPONENT: PASSES VALUE BACK UP TO APP LEVEL
export const SearchBar: React.FC<Props> = (props) => {
  return (
    <div className="search-bar">
      <input
        value={props.inputText}
        onChange={(event) => props.setInputText(event.target.value)}
        placeholder="Search a name"
      ></input>
    </div>
  );
};

export default SearchBar;
