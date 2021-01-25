const http = require("http");
const fs = require("fs");

const server = http.createServer((request, response) => {
  //Cargamos páginas
  let path = request.url.split("/")[1];
  let log =
    `\n${request.method}|${new Date().toLocaleTimeString()}|` +
    `${request.headers.host}/${path}`;

  const extension = "." + request.url.split(".")[1]; //conseguir extension del fichero que se pide
  if (extension !== "") {
    let contentType;
    switch (extension) {
      case ".js":
        contentType = "text/javascript";
        break;
      case ".css":
        contentType = "text/css";
        break;
      case ".html":
        contentType = "text/html";
        break;
      default:
        contentType = "";
    }

    fs.appendFile("server.log", log, (error) => {
      if (error) {
        console.log("No se ha podido registar el request");
      }
    });

    fs.readFile(path, (error, data) => {
      if (error) {
        fs.readFile("index.html", (error, data) => {
          if (error) {
            response.writeHead(404);
            response.write("<h1>Pagina no encontrada</h1>");
            response.end();
          } else {
            response.writeHead(200, { "Content-Type": contentType });
            response.write(data);
            response.end();
          }
        });
      } else {
        response.writeHead(200, { "Content-Type": contentType });
        response.write(data);
        response.end();
      }
    });
  }
});

server.listen(1111);
console.log("Server running at localhost:1111");
