import { Popup } from "src/ui";
import styles from "./styles.module.scss";
import { gameService } from "src/shared/services/GameService";
import { observer } from "mobx-react-lite";

interface SettingsPopupProps {
  opened: boolean;
  handleClose: () => void;
}

const SettingsPopup: React.FC<SettingsPopupProps> = observer(
  ({ opened, handleClose }) => {
    const { setTime, syncTime, time } = gameService;

    const handleChangeTime = (
      type: "minutes" | "seconds",
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const [minutes, seconds] = time.split(":");
      console.log(seconds);
      switch (type) {
        case "minutes":
          setTime(`${Number(e.target.value)}:${seconds}`);

          break;
        case "seconds":
          setTime(`${minutes}:${Number(e.target.value)}`);

          break;
      }
    };

    const handleClosePopup = () => {
      syncTime();
      handleClose();
    };

    return (
      <Popup opened={opened} handleClose={handleClosePopup}>
        <div className={styles.settings}>
          <div className={styles.settings__title}>Settings</div>
          <div className={styles.settings__time}>
            <div className={styles.settings__time__title}>Time</div>
            <div className={styles.settings__time__content}>
              <input
                className={styles.settings__time__content__input}
                type="number"
                value={time.split(":")[0]}
                onChange={(e) => handleChangeTime("minutes", e)}
              />
              m
              <input
                className={styles.settings__time__content__input}
                type="number"
                value={time.split(":")[1]}
                onChange={(e) => handleChangeTime("seconds", e)}
              />
              ss
            </div>
          </div>
        </div>
      </Popup>
    );
  }
);

export default SettingsPopup;
