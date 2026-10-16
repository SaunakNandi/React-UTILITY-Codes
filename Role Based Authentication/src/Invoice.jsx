import React from "react";
import Can from "./Can";

const Invoice = () => {
  return (
    <div>
      <p>Invoice</p>
      <Can permission="user:invite">
        <button type="button">View Invoice</button>
      </Can>
    </div>
  );
};

export default Invoice;
