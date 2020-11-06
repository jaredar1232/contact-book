import React from "react";

interface Props {
  name: string;
  ID: number;
  nameClickHandler: (ID: number, name: string) => void;
}

// A NAME COMPONENT: A SINGLE NAME CARD TO BE RENDERED IN THE NAME LIST
export const AName: React.FC<Props> = (props) => {
  const ID = props.ID;
  const name = props.name;
  return (
    <div className="a-name" onClick={() => props.nameClickHandler(ID, name)}>
      {name}
    </div>
  );
};

export default AName;
