import { Icon } from "../icon";
import styles from "./about.module.css";

function About() {
  return (
    <a className={styles.wrapper} href="https://www.stevemeredith.com">
      <p>
        Example app written by Steve Meredith, a lead front-end developer
        specialising in accessible, performant, and well-tested web products.
      </p>

      <p className={styles.cta}>
        <Icon name="link" /> Learn More
      </p>
    </a>
  );
}

export { About };
