import { type LinkProps, Link } from "@tanstack/react-router";
import type { PropsWithChildren } from "react";
import styles from "./keywords.module.css";

function Item(props: LinkProps) {
  return (
    <li>
      <Link className={styles.keyword} {...props} />
    </li>
  );
}

function Keywords(props: PropsWithChildren) {
  return (
    <ul className={styles.keywords} aria-label="Search By Keyword" {...props} />
  );
}

Keywords.Item = Item;

export { Keywords };
