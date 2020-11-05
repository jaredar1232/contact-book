import React from "react";

interface Props {
  name: string;
  setSelectedNameMethod: (name: string) => void;
}

// A NAME COMPONENT: A SINGLE NAME CARD TO BE RENDERED IN THE NAME LIST
export const AName: React.FC<Props> = (props) => {
  const name = props.name;
  return (
    <div className="a-name" onClick={() => props.setSelectedNameMethod(name)}>
      {name}
    </div>
  );
};

export default AName;
