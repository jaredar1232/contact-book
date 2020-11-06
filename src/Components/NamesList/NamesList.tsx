import React from "react";
import AName from "./AName";

interface Props {
  filteredListOfNames: any[];
  nameClickHandler: (ID: number, name: string) => void;
}

// LIST OF NAMES COMPONENT: FILTERS NAME "CARDS" BASED ON WHAT IS TYPED IN SEARCH BAR
export const NamesList: React.FC<Props> = (props) => {
  return (
    <div className="names-list">
      <div>
        {props.filteredListOfNames.map((aNameAndID) => {
          return (
            <AName
              name={aNameAndID.name}
              ID={aNameAndID.name_id}
              key={aNameAndID.name_id}
              nameClickHandler={props.nameClickHandler}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NamesList;
