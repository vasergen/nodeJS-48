const http = require("node:http");

// request: an object has properties from http
// response: an object that has methods to set reponse
const server = http.createServer((request, response) => {
  const { url } = request;
  if (url === "/") {
    response.write("<h2>Home page</h2>");
  } else if (url === "/movies") {
    response.write("<h2>Movies page</h2>");
  } else {
    response.write("<h2>Not found</h2>");
  }
  response.end();
});

server.listen(3000, (error) => {
  console.log("server is listening!");
});
