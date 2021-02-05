const http = require("http");

const server = http.createServer((request, response) => {
  fs.readFile("index.html",  (error, data) => {
    if (error) {
      console.error(error.message, error.code);
      response.writeHead(404);
      response.write('Error: Pagina no encontrada');
    } else {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.write(data);
    }
    response.end();
  });
});

server.listen(1000);
console.log("Server 1000 Init");