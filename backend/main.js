const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const chalk = require("chalk");
const fs = require("fs");
const childProcess = require("child_process");
const cors = require("cors");

app.listen(3000, () => {
  console.log(chalk.green.bold("server started on port 3000"));
});

app.use(bodyParser.json());

app.use(cors());

app.post("/run", (req, res) => {
  const { code } = req.body;
  console.log(code);
  var tempFileName = Date.now() + ".js";
  fs.writeFile(tempFileName, code, function (err) {
    // if (err) console.error(err);
    childProcess.execFile("node", [tempFileName], function (
      err,
      stdout,
      stderr
    ) {
      if (err) console.error(err);
      fs.unlink(tempFileName, (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("removed" + tempFileName);
      });
      console.log(typeof stdout);
      console.log(JSON.stringify(stdout));
      if (stderr) {
        console.log(typeof stderr);
        return res.status(200).json({ data: stderr });
      }
      res.status(200).json({ data: stdout });
    });
  });
});
