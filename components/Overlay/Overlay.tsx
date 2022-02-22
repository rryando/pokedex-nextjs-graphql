import React from "react";

import styles from "./Overlay.module.css";

export type Props = {
  title: string;
  content: string;
};

export default function Overlay(props: Props) {
  return (
    <div className={styles.overlay}>
      <div className={styles.overlayContent}>
        <h4>{props.title}</h4>
        <h3>{props.content}</h3>
      </div>
    </div>
  );
}
