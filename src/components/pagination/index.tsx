import { Link, type LinkProps } from "@tanstack/react-router";
import type { PropsWithChildren } from "react";
import styles from "./pagination.module.css";

function Button(props: LinkProps) {
  return <Link className={styles.button} {...props} />;
}
interface InfoProps {
  current: number;
  total: number;
}
function Info({ current, total }: InfoProps) {
  return (
    <p className={styles.info}>
      Page {current} of {total}
    </p>
  );
}

function Pagination(props: PropsWithChildren) {
  return <nav className={styles.group} {...props} />;
}

Pagination.Button = Button;
Pagination.Info = Info;

export { Pagination };
