import { type PropsWithChildren } from "react";
import { classNames } from "@eulersoft/classnames";
import { About } from "@/components/about";
import styles from "./layout.module.css";

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

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <About />
      </div>
    </footer>
  );
}

function Layout(props: PropsWithChildren) {
  return <div className={styles.layout} {...props} />;
}

Layout.Header = Header;
Layout.Main = Main;
Layout.Footer = Footer;

export { Layout };
