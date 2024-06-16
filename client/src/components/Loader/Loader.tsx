import { FC } from "react";

import styles from "./styles.module.scss";

export const Loader: FC = () => {
  return (
    <div className={styles.loader}>
      <img src="/assets/images/icons/loader.svg" />
    </div>
  );
};
