import { observer } from "mobx-react-lite";
import { Loader } from "src/components";
import { discordService } from "src/shared/services/DiscordService";
import styles from "./styles.module.scss";
import SettingsPopup from "./components/SettingsPopup/SettingsPopup";
import { useEffect, useState } from "react";
import PackPopup from "./components/PackPopup/PackPopup";
import { useNavigate } from "react-router-dom";
import { socketService } from "src/shared/services/SocketService";
import { SyncGameData } from "src/shared/types/game";
import { gameService } from "src/shared/services/GameService";

export const HomePage = observer(() => {
  const { loading, users, getLinkPhoto, discordSdk } = discordService;
  const { socket } = socketService;
  const { syncGame, setTime, startGame } = gameService;

  const navigate = useNavigate();

  const [isOpenedSettings, setIsOpenedSettings] = useState(false);
  const [isOpenedPack, setIsOpenedPack] = useState(false);

  const handleInvite = () => {
    discordSdk.commands.openInviteDialog();
  };

  const handleOpenedSettings = () => {
    setIsOpenedSettings((prev) => !prev);
  };

  const handleOpenedPack = () => {
    setIsOpenedPack((prev) => !prev);
  };

  const handleStartGame = () => {
    startGame(users);
  };

  useEffect(() => {
    const handleSyncGame = (data: SyncGameData) => {
      syncGame(data);
      navigate("/game");
    };

    const handleSyncTime = (time: string) => {
      setTime(time);
    };

    socket.on("syncGame", handleSyncGame);
    socket.on("syncTime", handleSyncTime);

    return () => {
      socket.off("syncGame", handleSyncGame);
      socket.off("syncTime", handleSyncTime);
    };
  }, [socket, syncGame, setTime]);

  return (
    <>
      {loading ? (
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      ) : (
        <>
          <div className={styles.home}>
            <div className={styles.home__title}>Secret Word</div>
            <div className={styles.home__users}>
              {users.map((user) => (
                <img src={getLinkPhoto(user.id, user?.avatar)} />
              ))}
              <img
                src="/assets/images/icons/plusMath.svg"
                className={styles.home__users__plus}
                onClick={handleInvite}
              />
            </div>
            <button className={styles.home__button} onClick={handleStartGame}>
              Start
            </button>
            <div className={styles.home__settings}>
              <img
                src="/assets/images/icons/settings.svg"
                onClick={handleOpenedSettings}
              />
              <img
                src="/assets/images/icons/addDatabase.svg"
                onClick={handleOpenedPack}
              />
            </div>
          </div>
          <SettingsPopup
            opened={isOpenedSettings}
            handleClose={handleOpenedSettings}
          />
          <PackPopup opened={isOpenedPack} handleClose={handleOpenedPack} />
        </>
      )}
    </>
  );
});
