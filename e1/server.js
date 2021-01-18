const http = require("http");
const fs = require("fs");

const server = http.createServer((request, response) => {
  //Cargamos páginas
  let path = request.url.split("/")[1];
  fs.readFile(path, (error, data) => {
    if (error) {
      fs.readFile("index.html", (error, data) => {
        if (error) {
          response.writeHead(404);
          response.write("<h1>Pagina no encontrada</h1>");
          response.end();
        } else {
          response.writeHead(200, { "Content-Type": "text/html" });
          response.write(data);
          response.end();
        }
      });
    } else {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.write(data);
      response.end();
    }
  });
});

server.listen(1111);
console.log("Server running at localhost:1111");
