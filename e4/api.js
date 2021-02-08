const express = require("express");
const api = express();
const fs = require("fs");
const bodyParser = require("body-parser");
const FILM_DB = "db/dbFake.json";

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
  fs.readFile(FILM_DB, (error, data) => {
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
api.get("/api/films/:id", (request, response) => {
  fs.readFile(FILM_DB, (error, data) => {
    if (error) throw error;
    const filmList = JSON.parse(data);
    let filmId = Number(request.params.id);
    let filmIndex = filmList.findIndex((film) => film.id === filmId);
    response.status(200).send({
      success: true,
      message: "APIFilms",
      url: `/api/films/${filmId}`,
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
    !request.body.genre ||
    !request.body.actors
  ) {
    response.status(400).send({
      success: false,
      url: "/api/films",
      method: "POST",
      message: "All fields are required!",
    });
  } else {
    fs.readFile(FILM_DB, (error, data) => {
      if (error) throw error;
      let filmList = JSON.parse(data);
      let actors = request.body.actors.split(",").map((actor) => actor.trim());
      let newFilm = {
        id: Math.max(...filmList.map((film) => film.id)) + 1,
        title: request.body.title,
        director: request.body.director,
        genre: request.body.genre,
        year: request.body.year,
        actors: actors,
      };
      filmList.push(newFilm);
      fs.writeFile(FILM_DB, JSON.stringify(filmList), (error) => {
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
api.delete("/api/films", (request, response) => {
  if (!request.body.id) {
    response.status(400).send({
      success: false,
      url: "/api/films",
      method: "DELETE",
      message: "Film is required!",
    });
  } else {
    fs.readFile(FILM_DB, (error, data) => {
      if (error) throw error;
      let filmList = JSON.parse(data);
      let filmId = Number(request.body.id);
      newFilmList = filmList.filter((film) => film.id !== filmId);
      if (newFilmList.length === filmList.length) {
        response.status(400).send({
          success: false,
          message: "Film was not found. Can not delete!",
          url: "/api/films",
          method: "DELETE",
        });
      } else {
        fs.writeFile(FILM_DB, JSON.stringify(newFilmList), (error) => {
          if (error) {
            response.status(400).send({
              success: false,
              message: "Could not delete the film, something went wrong!",
              url: "/api/films",
              method: "DELETE",
            });
          } else {
            response.status(200).send({
              success: false,
              message: "Film was deleted successfully!",
              url: "/api/films",
              method: "DELETE",
            });
          }
        });
      }
    });
  }
});

// Get genre
api.get("/api/films/genre", (request, response) => {
  fs.readFile(FILM_DB, (error, data) => {
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

//Put
api.put("/api/films/:id", (request, response) => {
  fs.readFile("db/dbFake.json", (error, data) => {
    if (error) throw error;
    let filmList = JSON.parse(data);
    let id = Number.parseInt(request.params.id);
    let newDataProps = Object.keys(request.body);
    let wantedIndex = filmList.findIndex((film) => film.id === id);
    if (wantedIndex === -1) {
      response.status(400).send({
        success: false,
        message: "APIFilms",
        url: `/api/films/${id}`,
        method: "PUT",
        message: "Can not update this film!",
      });
    } else {
      newDataProps.map(
        (prop) => (filmList[wantedIndex][prop] = request.body[prop])
      );
      fs.writeFile(FILM_DB, JSON.stringify(filmList), (error) => {
        if (error) {
          response.status(400).send({
            success: false,
            message: "APIFilms",
            url: `/api/films/${id}`,
            method: "PUT",
            message: "Can not update this film!",
          });
        } else {
          response.status(200).send({
            success: true,
            message: "APIFilms",
            url: `/api/films/${id}`,
            method: "PUT",
            message: "Film updated!",
          });
        }
      });
    }
  });
});

api.listen(1114, () => {
  console.log("API running at port 1114");
});
