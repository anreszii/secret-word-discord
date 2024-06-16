import { Popup } from "src/ui";
import styles from "./styles.module.scss";

interface SettingsPopupProps {
  opened: boolean;
  handleClose: () => void;
}

const SettingsPopup: React.FC<SettingsPopupProps> = ({
  opened,
  handleClose,
}) => {
  return (
    <Popup opened={opened} handleClose={handleClose}>
      <div className={styles.settings}>
        <div className={styles.settings__title}>Settings</div>
        <div className={styles.settings__time}>
          <div className={styles.settings__time__title}>Time</div>
          <div className={styles.settings__time__content}>
            <input
              className={styles.settings__time__content__input}
              type="number"
            />
            m
            <input
              className={styles.settings__time__content__input}
              type="number"
            />
            ss
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default SettingsPopup;
