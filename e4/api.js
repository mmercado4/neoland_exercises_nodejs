const express = require("express");
const api = express();

api.get("/api/films", (request, response) => {
  response.status(200).send({
    success: true,
    message: "APIFilms",
  });
});

api.listen(1114, () => {
  console.log("API running at port 1114");
});
