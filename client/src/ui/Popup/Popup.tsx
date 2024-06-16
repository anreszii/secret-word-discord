import { FC, PropsWithChildren } from "react";

import classNames from "classnames";
import styles from "./styles.module.scss";

interface Props extends PropsWithChildren {
  opened: boolean;
  handleClose: () => void;
}

export const Popup: FC<Props> = ({ opened, children, handleClose }) => {
  const popupClassName = classNames(
    { [styles["popup--active"]]: opened },
    styles.popup
  );

  const popupContainer = classNames(styles.popup__container);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };
  return (
    <div className={popupClassName}>
      <div className={styles.popup__overlay} onClick={handleOverlayClick}>
        <div className={popupContainer}>{children}</div>
      </div>
    </div>
  );
};
