const express = require("express");
const api = express();
const fs = require("fs");
const bodyParser = require("body-parser");

api.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
  api.options("*", (request, response) => {
    response.header(
      "Access-Control-Allow-Methods",
      "GET, PATCH, PUT, POST, DELETE, OPTIONS"
    );
    response.send();
  });
});

api.use(bodyParser.urlencoded({ extended: true }));

api.get("/api/films", (request, response) => {
  fs.readFile("db/dbFake.json", (error, data) => {
    if (error) throw error;
    const filmList = JSON.parse(data);
    response.status(200).send({
      success: true,
      message: "APIFilms",
      url: "/api/films",
      method: "GET",
      films: filmList,
    });
  });
});

api.post("/api/films", (request, response) => {
  fs.readFile("db/dbFake.json", (error, data) => {
    if (error) throw error;
    let filmList = JSON.parse(data);
    let newFilm = {
      id: Math.max(...filmList.map((film) => film.id)) + 1,
      title: request.body.title,
      director: request.body.director,
      genre: request.body.genre,
      year: request.body.year,
    };
    filmList.push(newFilm);
    fs.writeFile("db/dbFake.json", JSON.stringify(filmList), (error) => {
      if (error) {
        response.status(400).send({
          success: false,
          message: "Could not insert the film, something went wrong!",
          url: "/api/films",
          method: "POST",
        });
      } else {
        response.status(200).send({
          success: false,
          message: "Film was inserted successfully!",
          url: "/api/films",
          method: "POST",
        });
      }
    });
  });
});

api.listen(1114, () => {
  console.log("API running at port 1114");
});
