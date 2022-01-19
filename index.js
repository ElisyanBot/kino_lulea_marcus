import express, { response } from "express";
import { readFile } from "fs";
import { movies } from "./backend/js/fetchApi.js";
import { engine } from "express-handlebars";

const app = express();

app.use(express.static("./static"));

app.set("view engine", "hbs");
app.engine(
  "hbs",
  engine({
    extname: "hbs",
    defaultLayout: "index",
  })
);

app.get("/", (req, res) => {
  res.render("homepage", {});
});

app.get("/movies", (req, res) => {
  res.render("allMovies", {});
  // movies().then((movieArr) => res.status(200).send(movieArr.data));
});

app.get("/movies/:movieId", (req, res) => {
  res.render("movie", {});
  // movies(req.params.movieId).then((movie) => res.status(200).send(movie.data));
});

app.all("*",(req, res) =>{
  res.render("404page",{message: "not found"})
})

app.listen(5080, () => {
  console.log(" \n ============ server is running ============= ");
});
