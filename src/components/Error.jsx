import React from "react";

function Error({ title, massege }) {
  return (
    <div className="error-message ">
      <h2>{title}</h2>
      <p>{massege}</p>
    </div>
  );
}
export default Error;
