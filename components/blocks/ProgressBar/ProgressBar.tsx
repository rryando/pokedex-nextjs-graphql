import React from "react";

import styles from "./ProgressBar.module.css";

export type Props = {
  title: string;
  value: any;
};

const MAX_STAT_VALUE = 300;

export default function ProgressBar(props: Props) {
  const progressWidth = (props.value / MAX_STAT_VALUE) * 100;
  return (
    <div className={styles.progressContainer}>
      <h4>{props.title}</h4>
      <div className={styles.progressWrapper}>
        <div
          className={styles.progressBar}
          style={{ width: `${progressWidth}%` }}
        >
          {props.value}
        </div>
      </div>
    </div>
  );
}
