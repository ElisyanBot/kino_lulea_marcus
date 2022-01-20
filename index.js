import express from "express";
import { movies } from "./backend/js/fetchApi.js";
import { engine } from "express-handlebars";
import path from "path";

const app = express();


app.set("view engine", "hbs");
app.engine(
  "hbs",
  engine({
    extname: "hbs",
    defaultLayout: "index",
  })
  );
  
app.use("/", express.static("./static"));

app.get("/", (req, res) => {
  res.render("homepage", {});
});

app.get("/movies", (req, res) => {
  movies().then((movieArr) => res.render(
    "allMovies", 
    { movies: movieArr.data}
    ));
  });
  
app.use("/movies", express.static("./static"));
app.get("/movies/:movieId", (req, res) => {
  movies(req.params.movieId).then((movie) => res.render("movie", {movie : movie.data.attributes}));
});

app.all("*",(req, res) =>{
  res.render("404page",{message: "404: not found"})
})


app.listen(5080, () => {
  console.log(" \n ============ server is running ============= ");
});
