import express, { response } from "express";
import { readFile } from "fs";
import { movies } from "./backend/js/fetchApi.js";

const app = express();
app.get("/", (req, res) => {
  readFile("./static/index.html", "utf8", (error, data) => {
    !error
      ? res.status(200).send(data)
      : console.log("ERR: could not find local file");
  });
});

app.get("/movies", (req, res) => {
  movies().then((data) => res.status(200).send(data));
});

app.get("/movies/:movieId", (req, res) => {
  movies(req.params.movieId).then((data) => res.status(200).send(data));
});

app.use(express.static("./static"));

app.listen(5080, () => {
  console.log(" \n ============ server is upp and running ============= ");
});
