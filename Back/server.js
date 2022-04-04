const http = require("http");
const app = require("./app");

app.set("port", process.PORT || 3000);
const server = http.createServer(app);

server.listen(process.PORT || 3000);
