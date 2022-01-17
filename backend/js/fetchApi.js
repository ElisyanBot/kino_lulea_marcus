import fetch from "node-fetch";

/**@param id:
 * take the id of a moive, if not filled in then all movies will be fetched
 * */
async function fetchMovieApi(id = null) {
  const uri =
    id === null
      ? `https://lernia-kino-cms.herokuapp.com/api/movies`
      : `https://lernia-kino-cms.herokuapp.com/api/movies/${id}`;

  const res = await fetch(uri);
  const movies = await res.json();
  return movies;
}

export { fetchMovieApi as movies };
