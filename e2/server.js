const http = require("http");
const fs = require("fs");

const server = http
  .createServer((request, response) => {
    let path;
    let contentType;
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
    }

    let log =
      `\n${request.method}|${new Date().toLocaleTimeString()}|` +
      `${request.headers.host}${request.url}`;
    fs.appendFile("server.log", log, (error) => {
      if (error) {
        console.log("Request not found");
      }
    });

    fs.readFile(path, (error, data) => {
      if (error) {
        fs.readFile("./public/html/index.html", (error, data) => {
          if (error) {
            response.writeHead(404, { "Content-Type": "text/html" });
            response.write("<h1>Page not found</h1>");
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
  })
  .listen(2221);

console.log("Server is running at port 2221");
