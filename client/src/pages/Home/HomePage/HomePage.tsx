import { observer } from "mobx-react-lite";
import { Loader } from "src/components";
import { discordService } from "src/shared/services/DiscordService";
import styles from "./styles.module.scss";
import SettingsPopup from "./components/SettingsPopup/SettingsPopup";
import { useState } from "react";
import { socketService } from "src/shared/services/SocketService";

export const HomePage = observer(() => {
  const { loading, users, getLinkPhoto, discordSdk } = discordService;
  const { sendSocket } = socketService;

  const [isOpenedSettings, setIsOpenedSettings] = useState(false);

  const handleInvite = () => {
    discordSdk.commands.openInviteDialog();
  };

  const handleOpenedSettings = () => {
    setIsOpenedSettings((prev) => !prev);
  };

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
            <button className={styles.home__button}>Start</button>
            <div className={styles.home__settings}>
              <img
                src="/assets/images/icons/settings.svg"
                onClick={handleOpenedSettings}
              />
              <img
                src="/assets/images/icons/addDatabase.svg"
                onClick={sendSocket}
              />
            </div>
          </div>
          <SettingsPopup
            opened={isOpenedSettings}
            handleClose={handleOpenedSettings}
          />
        </>
      )}
    </>
  );
});
