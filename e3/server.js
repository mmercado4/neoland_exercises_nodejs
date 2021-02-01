const http = require("http");
const fs = require("fs");

const server = http
  .createServer((request, response) => {
    const HOME_PATH = "./public/html/index.html";
    let path;
    let contentType;
    let log;
    let extension = request.url.split(".")[1];
    switch (extension) {
      case "html":
        path = `./public/html${request.url}`;
        contentType = "text/html";
        break;
      case "js":
        path = `./public/js${request.url}`;
        contentType = "text/javascript";
        break;
      case "css":
        path = `./public/css${request.url}`;
        contentType = "text/css";
        break;
      default:
        path = `./public/html${request.url}.html`;
        contentType = "text/html";
        break;
    }

    log =
      `${request.method}|${new Date().toLocaleTimeString()}` +
      `|${request.headers.host}${request.url}\n`;

    fs.appendFile("server.log", log, (error) => {
      if (error) {
        console.log("Can not write the last LOG");
      }
    });

    fs.readFile(path, (error, data) => {
      if (error) {
        fs.readFile(HOME_PATH, (error, data) => {
          if (error) {
            response.writeHead(404, { "Content-Type": "text/html" });
            response.write("<h1>Page not found</h1>");
            response.end();
          } else {
            response.writeHead(200);
            response.write(data);
            response.end();
          }
        });
      } else {
        response.writeHead(200);
        response.write(data);
        response.end();
      }
    });
  })
  .listen(1113);

console.log("Server running at port 1113");
