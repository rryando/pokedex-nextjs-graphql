import React from "react";
import Link from "next/link";
import styles from "./Timeline.module.css";

type TimelineContent = {
  name: string;
  id: number;
  evolutions: any;
};

export type Props = {
  content?: any;
};

export default function Timeline(props: Props) {
  return (
    <div className={styles.timeline}>
      {props.content?.map((content: TimelineContent, idx: number) => (
        <div
          className={`${styles.timelineContainer} ${
            idx % 2 === 0 ? styles.timelineLeft : styles.timelineRight
          }`}
        >
          <Link href={content.name || ""}>
            <div className={styles.timelineContent}>
              <h4>{content.name}</h4>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                  content?.id || 0
                }.png`}
                alt={content.name}
                style={{ width: "100%" }}
                loading={"lazy"}
              />
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
