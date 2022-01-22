import { movieObj } from "./fetchApi.js";

async function movieLogger(res, req, next) {
  const movieList = await movieObj();
  console.log("\n ========= movie list ========= \n");
  for (let movie of movieList.data) {
    console.log(`id: ${movie.id}, Title: ${movie.attributes.title} `);
  }
  next();
}

export { movieLogger as logger };
