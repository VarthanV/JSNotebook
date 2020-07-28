import React, { useState } from "react";
import ExecuteButton from "../executebutton";
import "./codeblock.scss";

const CodeBlock = () => {
  const [block, setBlock] = useState({ code: "", output: "" });
  const handleCodeChange = (event) => {
    const { value } = event.target;
    setBlock({ ...block, code: value });
  };

  const showOutput = (output) => {
    setBlock({ ...block, output: output });
  };

  const evaluate = async function () {
    console.log(block.code);
    const response = await fetch("http://localhost:3000/run", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: block.code,
        data: "string",
      }),
    });

    let data = await response.json();
    showOutput(data.data);
  };

  return (
    <div className="codeblock">
      <div className="code">
        <div className="cell-execution-container">
          <ExecuteButton execute={evaluate}></ExecuteButton>
        </div>
        <textarea
          name="codeblock"
          value={block.code}
          className="codeblock__code language-js"
          onChange={handleCodeChange}
          role="textarea"
          contentEditable
        ></textarea>
      </div>
      <div className="output">
        <div className="output-info"></div>
        {block.output && <p className="codeblock__output">{block.output}</p>}
      </div>
    </div>
  );
};

export default CodeBlock;
