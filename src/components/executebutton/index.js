import React from "react";

const ExecuteButton = (props) => {
  return (
    <button onClick={props.execute}>
      <i className="fas fa-play"></i>
    </button>
  );
};

export default ExecuteButton;
