import React from "react";
import AName from "./AName";

interface Props {
  filteredListOfNames: any[];
  setSelectedNameMethod: (name: string) => void;
}

// LIST OF NAMES COMPONENT: FILTERS NAME "CARDS" BASED ON WHAT IS TYPED IN SEARCH BAR
export const NamesList: React.FC<Props> = (props) => {
  return (
    <div className="names-list">
      <div>
        {props.filteredListOfNames.map((aName) => {
          return (
            <AName
              name={aName}
              key={aName}
              setSelectedNameMethod={props.setSelectedNameMethod}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NamesList;
