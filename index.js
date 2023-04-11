import createBareServer from "@tomphttp/bare-server-node";
import http from "node:http";

const httpServer = http.createServer();
const bareServer = createBareServer("/bare/", {logErrors: true});

httpServer.on("request", (req, res) => {
    if (bareServer.shouldRoute(req)) {
      bareServer.routeRequest(req, res);
    } else {
        res.writeHead(404).end();
    }
  });
  httpServer.on("upgrade", (req, socket, head) => {
    if (bareServer.shouldRoute(req)) {
      bareServer.routeUpgrade(req, socket, head);
    } else {
      socket.end();
      //return;
    }
  });


  httpServer.on("listening", () => {
    console.log('listening on http://localhost:${8081}/');
  });
  
  httpServer.listen({
    port: 8081
  });