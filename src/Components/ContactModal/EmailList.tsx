import React from "react";

interface Props {
  aEmail: string;
}

export const EmailList: React.FC<Props> = (props) => {
  return <div>{props.aEmail}</div>;
};

export default EmailList;
