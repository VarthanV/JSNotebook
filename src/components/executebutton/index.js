import React from "react";
import "./executebutton.scss";

const ExecuteButton = (props) => {
  return (
    <button onClick={props.execute} className="btn-execute">
      <i className="fas fa-play"></i>
    </button>
  );
};

export default ExecuteButton;
