import React from "react";

interface Props {
  dataForContact: string;
}

export const dataList: React.FC<Props> = (props) => {
  return <div>{props.dataForContact}</div>;
};

export default dataList;
