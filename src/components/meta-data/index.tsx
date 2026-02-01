import { type PropsWithChildren } from "react";
import styles from "./meta-data.module.css";

interface ItemProps {
  heading: string;
}

function Item({ heading, children }: PropsWithChildren<ItemProps>) {
  return (
    <div className={styles.item}>
      <h2 className={styles.heading}>{heading}</h2>

      {children}
    </div>
  );
}

function MetaData(props: PropsWithChildren) {
  return <div className={styles.group} {...props} />;
}

MetaData.Item = Item;

export { MetaData };
