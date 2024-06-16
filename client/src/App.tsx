import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { discordService } from "shared/services/DiscordService";
import { HomePage } from "pages/Home";
import { GamePage } from "pages/Game";
import "assets/styles/index.css";
import { socketService } from "./shared/services/SocketService";

const App = () => {
  const { authDiscord, getUsers } = discordService;
  const { socket, sendSocket } = socketService;
  const [message, setMessage] = useState(JSON.stringify(""));

  useEffect(() => {
    const init = async () => {
      await authDiscord();
      await getUsers();
    };

    init();
  }, []);

  useEffect(() => {
    setInterval(() => {
      sendSocket();
      console.log(socket);
    }, 1000);

    socket.on("message", (message) => {
      setMessage(JSON.stringify(message));
    });
  }, []);

  const [scaleFactor, setScaleFactor] = useState<number>(1);

  useEffect(() => {
    const handleResize = () => {
      const scaleFactor = window.innerWidth / 1280;

      setScaleFactor(scaleFactor);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div style={{ transform: `scale(${scaleFactor})` }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game" element={<GamePage />} />
        </Routes>
      </BrowserRouter>
      {message}
    </div>
  );
};

export default App;
