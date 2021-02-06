const express = require("express");
const fs = require("fs");

const api = express();

api.get("/api/users", (req, res) => {
  fs.readFile("db/users.json", (error, data) => {
    if (error) throw error;
    const users = JSON.parse(data);
    res.status(200).send({
      success: "true",
      users: users,
    });
  });
});

api.get("/api/users/:id", (req, res) => {
  fs.readFile("db/users.json", (error, data) => {
    if (error) throw error;
    const users = JSON.parse(data);

    const user = users.find(
      (user) => user.id === Number.parseInt(req.params.id)
    );
    console.log(user);

    if (user) {
      res.status(200).send({
        success: "true",
        user: user,
      });
    } else {
      res.status(200).send({
        success: "true",
        message: "Usuario no encontrado",
      });
    }
  });
});

api.get("/api/users/gender/:gender", (req, res) => {
  fs.readFile("db/users.json", (error, data) => {
    if (error) throw error;
    const users = JSON.parse(data);

    const usersByGender = users.filter(
      (user) => user.gender === req.params.gender
    );

    if (usersByGender) {
      res.status(200).send({
        success: true,
        message: "Usuarios por genero encontrados",
        users: usersByGender,
      });
    } else {
      res.status(200).send({
        success: true,
        message: "Usuarios por genero no encontrados",
      });
    }
  });
});

api.listen(1234, function () {
  console.log(`API corriendo`);
});
