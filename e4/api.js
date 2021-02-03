const express = require("express");
const api = express();

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

api.get("/api/films", (request, response) => {
  response.status(200).send({
    success: true,
    message: "APIFilms",
  });
});

api.listen(1114, () => {
  console.log("API running at port 1114");
});
