import { classNames } from "@eulersoft/classnames";
import { Link } from "@tanstack/react-router";
import { type PropsWithChildren, useState } from "react";
import styles from "./video-results.module.css";

interface ItemProps {
  id: string;
  title: string;
  thumbnail: string;
  description?: string;
}

function Item({ id, title, thumbnail, description }: ItemProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <li className={classNames(styles.item, loaded && styles.loaded)}>
      <Link to="/video/$id" params={{ id }}>
        {thumbnail && (
          <img
            className={styles.image}
            src={thumbnail}
            alt={title}
            onLoad={() => setLoaded(true)}
          />
        )}

        <div className={styles.content}>
          <h2 className={styles.heading}>{title}</h2>

          {description && <p className={styles.description}>{description}</p>}
        </div>
      </Link>
    </li>
  );
}

function VideoResults(props: PropsWithChildren) {
  return <ul className={styles.group} aria-label="Video Results" {...props} />;
}

VideoResults.Item = Item;

export { VideoResults };
