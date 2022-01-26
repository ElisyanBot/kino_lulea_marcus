import express from "express";
import { engine } from "express-handlebars";
import { marked } from "marked";
import { movieObj } from "./fetchApi.js";
import { logger } from "./movieLogger.js";
 
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

app.get("/movies", logger, async (req, res) => {
  const allMovies = await movieObj();
  res.render("allMovies", { movies: allMovies.data });
});

app.get("/movies/:movieId", async (req, res) => {
  const movie = await movieObj(req.params.movieId);
  movie.data === null
    ? res.status(404).render("404page", {
        status: "404:",
        message: "Movie Page not found",
      })
    : res.render("movie", { movie: movie.data.attributes });
});

app.all("*", (req, res) => {
  res.status(404).render("404page", { status: "404:", message: " not found" });
});

export default app;