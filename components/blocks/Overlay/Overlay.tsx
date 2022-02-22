import React from "react";

import styles from "./Overlay.module.css";

export type Props = {
  title: string;
  content: string;
};

export default function Overlay(props: Props) {
  const [isVisible, setIsVisible] = React.useState(true);

  return (
    <>
      {isVisible && (
        <div className={styles.overlay} onClick={() => setIsVisible(false)}>
          <div className={styles.overlayContent}>
            <h5>{props.title}</h5>
            <h4>{props.content}</h4>
          </div>
        </div>
      )}
    </>
  );
}
