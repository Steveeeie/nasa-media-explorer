import { Link } from "@tanstack/react-router";
import { type PropsWithChildren } from "react";
import { Icon } from "../icon";
import styles from "./audio-results.module.css";

interface ItemProps {
  id: string;
  title: string;
  date: string;
}

function Item({ id, title }: ItemProps) {
  return (
    <li className={styles.item}>
      <Link to="/audio/$id" params={{ id }}>
        <Icon name="audio" />
        <h2>{title}</h2>
      </Link>
    </li>
  );
}

function AudioResults(props: PropsWithChildren) {
  return <ul className={styles.group} aria-label="Audio Results" {...props} />;
}

AudioResults.Item = Item;

export { AudioResults };
