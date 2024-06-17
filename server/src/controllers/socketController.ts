import { Socket, Server } from "socket.io";
import { OAuth2TokenResponse } from "../types/response";

const socketController = (io: Server, socket: Socket): void => {
  socket.on("pack", (pack: string[]) => {
    io.emit("pack", pack);
  });

  socket.on("syncGame", (game: any) => {
    io.emit("syncGame", game);
  });

  socket.on("endGame", () => {
    io.emit("endGame");
  });

  socket.on("syncTime", (time: string) => {
    io.emit("syncTime", time);
  });

  socket.on("token", async (code: string) => {
    const response = await fetch(`https://discord.com/api/oauth2/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.VITE_DISCORD_CLIENT_ID || "",
        client_secret: process.env.DISCORD_CLIENT_SECRET || "",
        grant_type: "authorization_code",
        code: code,
        redirect_uri: "",
        scope: "",
      }),
    });

    const { access_token } = (await response.json()) as OAuth2TokenResponse;

    io.emit("token", access_token);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
};

export default socketController;
