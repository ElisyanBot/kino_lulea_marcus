import express from "express";
import { movies } from "./static/js/fetchApi.js";
import { engine } from "express-handlebars";
import { marked } from "marked";

const app = express();

app.set("view engine", "hbs");
app.engine(
  "hbs",
  engine({
    extname: "hbs",
    defaultLayout: "index",
    helpers: {
      markdown: (md) => marked(md),
    },
  })
);

app.use("/", express.static("static"));

app.get("/", (req, res) => {
  res.render("homepage", {});
});

app.get("/movies", async (req, res) => {
  const allMovies = await movies();
  res.render("allMovies", { movies: allMovies });
});

app.get("/movies/:movieId", async (req, res) => {
  const movie = await movies(req.params.movieId);
  movie.data === null
    ? res.render("404page", {
        status: movie.error.status + ":",
        message: movie.error.message,
      })
    : res.render("movie", { movie: movie.data.attributes });
});

app.all("*", (req, res) => {
  res.render("404page", { status: "404:", message: " not found" });
});

export default app;