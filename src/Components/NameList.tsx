import React, { useState } from "react";
import AName from "./AName";

interface Props {
  listOfNames: any[];
}

export const NamesList: React.FC<Props> = (props) => {
  return (
    <div className="names-list">
      <div>
        {props.listOfNames.map((aName) => {
          return <AName name={aName.name} />;
        })}
      </div>
    </div>
  );
};

export default NamesList;
