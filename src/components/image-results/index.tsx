import { classNames } from "@eulersoft/classnames";
import { Link } from "@tanstack/react-router";
import { type PropsWithChildren, useState } from "react";
import styles from "./image-results.module.css";

interface ItemProps {
  id: string;
  title: string;
  thumbnail: string;
}

function Item({ id, thumbnail, title }: ItemProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <li className={classNames(styles.item, loaded && styles.loaded)}>
      <Link to="/image/$id" params={{ id }}>
        <img
          className={styles.image}
          src={thumbnail}
          alt={title}
          onLoad={() => setLoaded(true)}
        />

        <h2 className={styles.heading}>{title}</h2>
      </Link>
    </li>
  );
}

function ImageResults(props: PropsWithChildren) {
  return <ul className={styles.group} aria-label="Image Results" {...props} />;
}

ImageResults.Item = Item;

export { ImageResults };
