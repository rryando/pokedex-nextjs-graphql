import React from "react";
import Link from "next/link";
import styles from "./Card.module.css";
import {
  imageLoader,
  pokemonImageLoader,
  ImageWrapper,
} from "../../../utils/imageLoader";

export type CardProps = {
  name: string;
  id: number;
  imgUrl: string;
  isLoading: boolean;
  offlineReady?: boolean;
};

export default function Cards(props: CardProps) {
  const parseId = (id: number = 0) => {
    const stringId = id.toString();
    return `#${stringId.padStart(3, "0")}`;
  };

  return (
    <Link href={props.name} data-cy="card-nav-link" passHref>
      <div className={styles.card} id={"pokemon-homepage-card"}>
        {props.isLoading ? (
          <>
            <div className={styles.skeletonBox}>
              <div className={styles.cardImageSkeleton}>{"Loading..."}</div>
            </div>
            <div className={styles.skeletonBox}>
              <div className={styles.cardInfoSkeleton}>{"Loading..."}</div>
            </div>
          </>
        ) : (
          <>
            <ImageWrapper
              loader={() => pokemonImageLoader(props.id)}
              src={imageLoader()}
              loading={"lazy"}
              className={styles.pokemonDetailsImage}
              width={300}
              height={300}
            />
            <div className={styles.cardInfoContainer}>
              {props.offlineReady && (
                <button className={styles.pillButton} id={"offline-bookmark"}>
                  {"offline ✔️ "}
                </button>
              )}
              <h4>
                <b>{parseId(props.id)}</b>
              </h4>
              <h4>
                <b>{props.name}</b>
              </h4>
            </div>
          </>
        )}
      </div>
    </Link>
  );
}
