import React from "react";
import Link from "next/link";
import styles from "./Card.module.css";

export type CardProps = {
  name: string;
  id: number;
  imgUrl: string;
  isLoading: boolean;
};

export default function Cards(props: CardProps) {
  const parseId = (id: number = 0) => {
    const stringId = id.toString();
    return `#${stringId.padStart(3, "0")}`;
  };

  return (
    <Link href={props.name || ""}>
      <div className={styles.card}>
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
            <img
              src={props.imgUrl}
              alt={props.name}
              style={{ width: "100%" }}
              loading={"lazy"}
            />
            <div className={styles.cardInfoContainer}>
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
