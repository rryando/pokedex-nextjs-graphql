import React from "react";
import styles from "../styles/Home.module.css";
import { Cards } from "../components";

export default function offlineMode() {
  return (
    <div className={styles.container}>
      <h4>{"you are offline"}</h4>
    </div>
  );
}
