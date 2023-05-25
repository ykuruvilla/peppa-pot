const http = require("http");
const app = require("./app/app");

//create the server
const PORT = process.env.port || 8080;
const server = http.createServer(app);

server.listen(PORT, console.log(`Server is running on port ${PORT}`));
