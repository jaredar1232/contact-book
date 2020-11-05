import React from "react";

interface Props {
  aAddress: string;
}

export const AddressList: React.FC<Props> = (props) => {
  return <div>{props.aAddress}</div>;
};

export default AddressList;
