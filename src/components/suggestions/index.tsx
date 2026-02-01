import { type LinkProps, Link } from "@tanstack/react-router";
import type { PropsWithChildren } from "react";
import styles from "./suggestions.module.css";

function Item(props: LinkProps) {
  return (
    <li>
      <Link className={styles.suggestion} {...props} />
    </li>
  );
}

function Suggestions(props: PropsWithChildren) {
  return (
    <ul
      className={styles.suggestions}
      aria-label="Search Suggestions"
      {...props}
    />
  );
}

Suggestions.Item = Item;

export { Suggestions };
