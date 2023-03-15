import React from "react";
const Table = (props) => {
  return (
    <table>
      <td>{props.data}</td>
      {React.createElement("td", null, "xxxxxxxx")}
    </table>
  );
};
export default Table;
