import { movieObj } from "../src/js/fetchApi.js";

test("check to se that the ID param on fetchMovieApi retreives single movie with the right id", async () => {
  const param_ID = 1;
  const fetchMovieObj = await movieObj(param_ID);
  expect(fetchMovieObj.data.id).toEqual(param_ID);
});

test("check to se that that fetchMovieApi fetches atleast one movie", async () => {
  const fetchMovieObj = await movieObj();
  expect(fetchMovieObj.data.length).toBeGreaterThanOrEqual(1);
});