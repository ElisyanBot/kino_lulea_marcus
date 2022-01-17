import express from "express";
import { readFile } from "fs";

const app = express();
app.get("/", (req, res) => {
  readFile("./static/index.html", "utf8", (error, data) => {
    !error
      ? res.status(200).send(data)
      : console.log("ERR: could not find local file");
  });
});

app.use(express.static("./static"));

app.listen(5080, () => {
  console.log("============ server is upp and running =============");
});
