import React from "react";

interface Props {
  name: string;
}

// A NAME COMPONENT: A SINGLE NAME CARD TO BE RENDERED IN THE NAME LIST
export const AName: React.FC<Props> = (props) => {
  return <div className="a-name">{props.name}</div>;
};

export default AName;
