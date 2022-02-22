import React from "react";

import styles from "./InlineContentList.module.css";

export type Props = {
  title: string;
  content: any;
};

export default function InlineContentList(props: Props) {
  return (
    <div className={styles.contentInline}>
      <p className={styles.contentLabel}>{props.title}</p>
      <p className={styles.contentValue}>{props.content}</p>
    </div>
  );
}
