import React from "react";

import styles from "./BottomAlert.module.css";

export type Props = {
  title: string;
  content: string;
  bg?: string;
};

export default function BottomAlert(props: Props) {
  const [isVisible, setIsVisible] = React.useState(true);

  return (
    <div className={styles.bottomAlertWrapper}>
      {isVisible && (
        <div
          className={styles.bottomAlert}
          style={{ background: `${props.bg || "orange"}` }}
          onClick={() => setIsVisible(false)}
        >
          <div className={styles.bottomAlertContent}>
            <p>{props.title}</p>
            <p>{props.content}</p>
          </div>
        </div>
      )}
    </div>
  );
}
