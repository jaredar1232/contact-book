import React from "react";

interface Props {
  aNumber: string;
}

export const NumberList: React.FC<Props> = (props) => {
  return <div>{props.aNumber}</div>;
};

export default NumberList;
