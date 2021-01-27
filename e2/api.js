const express = require("express");
const api = express();

// CONFIGURACION: CORS
api.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  // authorized headers for preflight requests
  // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
  app.options("*", (req, res) => {
    // allowed XHR methods
    res.header(
      "Access-Control-Allow-Methods",
      "GET, PATCH, PUT, POST, DELETE, OPTIONS"
    );
    res.send();
  });
});

const cursos = require("./cursos");

//https://www.youtube.com/watch?v=ElcuQfA6aNY

api.get("/api/cursos", (request, response) => {
  response.status(200).send({
    success: true,
    message: "Cursos neoland",
    courses: cursos.cursos,
  });
});

api.listen(2223, () => {
  console.log("API corriendo en el puerto 2223");
});
