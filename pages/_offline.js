import React from "react";
import styles from "../styles/Home.module.css";
import { Cards } from "../components";

export default function offlineMode() {
  const isMoreCardLoading = true;

  return (
    <div className={styles.container}>
      <div className={styles.pokemonCardContainer}>
        <h4>{"you are offline"}</h4>
      </div>
    </div>
  );
}
