import app from "../static/js/app.js";
import request from "supertest";
import { response } from "express";

test("check if responese is working on home page", async () => {
  const response = await request(app).get("/").expect(200);
});

test("checks if a movie ids tile is right", async () => {
  const response = await request(app).get("/movies/1").expect(200);
  expect(response.text.includes("Shawshank")).toBeTruthy();
});
