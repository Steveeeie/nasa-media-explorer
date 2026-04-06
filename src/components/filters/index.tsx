import { classNames } from "@eulersoft/classnames";
import { Link, type LinkProps } from "@tanstack/react-router";
import { type PropsWithChildren } from "react";
import styles from "./filters.module.css";

interface ItemProps extends LinkProps {
  active?: boolean;
}

function Item({ active, ...rest }: ItemProps) {
  return (
    <Link
      role="tab"
      aria-selected={active}
      className={classNames(styles.item, active && styles.active)}
      {...rest}
    />
  );
}

interface FiltersProps {
  label: string;
}

function Filters({ label, children }: PropsWithChildren<FiltersProps>) {
  return (
    <nav className={styles.group} role="tablist" aria-label={label}>
      {children}
    </nav>
  );
}

Filters.Item = Item;

export { Filters };
