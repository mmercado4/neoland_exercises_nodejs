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

//Get all films
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

//Get one film
api.get("/api/film", (request, response) => {
  fs.readFile("db/dbFake.json", (error, data) => {
    if (error) throw error;
    const filmList = JSON.parse(data);
    let filmId = Number(request.body.id);
    let filmIndex = filmList.findIndex((film) => film.id === filmId);
    response.status(200).send({
      success: true,
      message: "APIFilms",
      url: "/api/film",
      method: "GET",
      films: filmList[filmIndex],
    });
  });
});

//Post
api.post("/api/films", (request, response) => {
  if (
    !request.body.title ||
    !request.body.director ||
    !request.body.year ||
    !request.body.genre
  ) {
    response.status(400).send({
      success: false,
      url: "/api/films",
      method: "POST",
      message: "All fields are required!",
    });
  } else {
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
  }
});

//Delete
api.delete("/api/film", (request, response) => {
  if (!request.body.id) {
    response.status(400).send({
      success: false,
      url: "/api/films",
      method: "DELETE",
      message: "Film is required!",
    });
  } else {
    fs.readFile("db/dbFake.json", (error, data) => {
      if (error) throw error;
      let filmList = JSON.parse(data);
      let filmId = Number(request.body.id);
      newFilmList = filmList.filter((film) => film.id !== filmId);
      fs.writeFile("db/dbFake.json", JSON.stringify(newFilmList), (error) => {
        if (error) {
          response.status(400).send({
            success: false,
            message: "Could not delete the film, something went wrong!",
            url: "/api/film",
            method: "DELETE",
          });
        } else {
          response.status(200).send({
            success: false,
            message: "Film was deleted successfully!",
            url: "/api/film",
            method: "DELETE",
          });
        }
      });
    });
  }
});

// Get genre
api.get("/api/films/genre", (request, response) => {
  fs.readFile("db/dbFake.json", (error, data) => {
    if (error) throw error;
    let filmList = JSON.parse(data);
    let genre = request.body.genre;
    let genreFilmList = filmList.filter((film) => film.genre === genre);
    response.status(200).send({
      success: true,
      message: "APIFilms",
      url: "/api/films/genre",
      method: "GET",
      films: genreFilmList,
    });
  });
});

api.listen(1114, () => {
  console.log("API running at port 1114");
});
