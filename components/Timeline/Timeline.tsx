import React from "react";
import Link from "next/link";
import styles from "./Timeline.module.css";
import {
  imageLoader,
  pokemonImageLoader,
  ImageWrapper,
} from "../../utils/imageLoader";

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
          key={idx}
          className={`${styles.timelineContainer} ${
            idx % 2 === 0 ? styles.timelineLeft : styles.timelineRight
          }`}
        >
          <Link href={content.name || ""}>
            <div className={styles.timelineContent}>
              <h4>{content.name}</h4>
              <ImageWrapper
                loader={() => pokemonImageLoader(content.id)}
                src={imageLoader()}
                loading={"lazy"}
                className={styles.pokemonDetailsImage}
                width={300}
                height={300}
              />
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
