import { classNames } from "@eulersoft/classnames";
import { Link, type LinkProps } from "@tanstack/react-router";
import { type PropsWithChildren } from "react";
import styles from "./filters.module.css";

interface ItemProps extends LinkProps {
  active?: boolean;
}

function Item({ active, ...rest }: ItemProps) {
  return (
    <li>
      <Link
        className={classNames(styles.item, active && styles.active)}
        {...rest}
      />
    </li>
  );
}

interface FiltersProps {
  label: string;
}

function Filters({ label, children }: PropsWithChildren<FiltersProps>) {
  return (
    <nav className={styles.group}>
      <ul aria-label={label}>{children}</ul>
    </nav>
  );
}

Filters.Item = Item;

export { Filters };
