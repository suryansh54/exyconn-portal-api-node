const PORT = process.env.PORT || 5000
const http = require('http');

//create a server object:
http.createServer(function (req, res) {
  res.write('Hello World! Suryansh'); //write a response to the client
  res.end(); //end the response
}).listen(PORT); //the server object listens on port 8080