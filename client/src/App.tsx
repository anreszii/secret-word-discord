import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { discordService } from "shared/services/DiscordService";
import { HomePage } from "pages/Home";
import { GamePage } from "pages/Game";
import "assets/styles/index.css";

const App = () => {
  const { authDiscord } = discordService;

  useEffect(() => {
    const init = async () => {
      await authDiscord();
    };

    init();
  }, []);

  const [scaleFactor, setScaleFactor] = useState<number>(1);

  useEffect(() => {
    const handleResize = () => {
      const scaleFactor = window.innerWidth / 1080;

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
    </div>
  );
};

export default App;
