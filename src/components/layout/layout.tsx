import { type PropsWithChildren } from "react";
import styles from "./layout.module.css";
import { classNames } from "@eulersoft/classnames";

interface HeaderProps {
  padded?: boolean;
}

function Header({ padded, ...rest }: PropsWithChildren<HeaderProps>) {
  return (
    <header className={classNames(styles.header, padded && styles.padded)}>
      <div className={styles.container} {...rest} />
    </header>
  );
}

function Main(props: PropsWithChildren) {
  return (
    <main className={styles.main}>
      <div className={styles.container} {...props} />
    </main>
  );
}

function Layout(props: PropsWithChildren) {
  return <div className={styles.layout} {...props} />;
}

Layout.Header = Header;
Layout.Main = Main;

export { Layout };
