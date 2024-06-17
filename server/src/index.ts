import http from "http";
import { Server } from "socket.io";
import loadEnv from "./config/dotenv";
import createApp from "./app";
import socketRoutes from "./routes/socketRoutes";

loadEnv();

const app = createApp();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
  path: "/",
  transports: ["websocket", "polling"],
});

socketRoutes(io);

const port = 3001;

server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
