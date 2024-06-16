import express from "express";
import dotenv from "dotenv";
import { OAuth2TokenResponse } from "./types/response";
import http from "http";
import { Server, Socket } from "socket.io";
dotenv.config({ path: "./.env" });

const app = express();
const port = 3001;
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());

app.post("/api/token", async (req, res) => {
  const response = await fetch(`https://discord.com/api/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: process.env.VITE_DISCORD_CLIENT_ID || "",
      client_secret: process.env.DISCORD_CLIENT_SECRET || "",
      grant_type: "authorization_code",
      code: req.body.code,
      redirect_uri: "",
      scope: "",
    }),
  });

  const { access_token } = (await response.json()) as OAuth2TokenResponse;

  res.send({ access_token });
});

io.on("connection", (socket: Socket) => {
  console.log("New client connected");

  socket.on("message", (msg: string) => {
    console.log(`Message received: ${msg}`);
    // Здесь можно добавить логику обработки сообщений
    io.emit("message", msg);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
