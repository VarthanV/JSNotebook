import React, { useState } from "react";
import ExecuteButton from "../executebutton";

const CodeBlock = () => {
  const [block, setBlock] = useState({ code: "", output: "" });

  const handleCodeChange = (event) => {
    const { value } = event.target;
    setBlock({ ...block, code: value });
  };

  const showOutput = (output) => {
    setBlock({ ...block, output: output });
  };

  const evaluate = function () {
    try {
      console.oldLog = console.log;
      console.log = function (value) {
        console.oldLog(value);
        return value;
      };
      let data = eval(block.code);
      showOutput(data);
    } catch (error) {
      showOutput(error);
    }
  };

  return (
    <div>
      <textarea
        name="codeblock"
        value={block.code}
        onChange={handleCodeChange}
      ></textarea>
      <ExecuteButton execute={evaluate}></ExecuteButton>
      <textarea
        className="output"
        value={block.output}
        onChange={() => {}}
      ></textarea>
    </div>
  );
};

export default CodeBlock;
