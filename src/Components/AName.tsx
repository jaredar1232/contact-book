import React, { useState } from "react";

interface Props {
  name: string;
}

export const AName: React.FC<Props> = (props) => {
  return <div className="a-name">{props.name}</div>;
};

export default AName;
