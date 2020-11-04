import React, { useState } from "react";
import AName from "./AName";

interface Props {
  filteredListOfNames: any[];
}

export const NamesList: React.FC<Props> = (props) => {
  return (
    <div className="names-list">
      <div>
        {props.filteredListOfNames.map((aName) => {
          return <AName name={aName} />;
        })}
      </div>
    </div>
  );
};

export default NamesList;
