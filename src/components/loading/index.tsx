import { classNames } from "@eulersoft/classnames";
import styles from "./loading.module.css";

interface LoadingProps {
  shown?: boolean;
}

function Loading({ shown }: LoadingProps) {
  return (
    <div className={classNames(styles.wrapper, shown && styles.shown)}>
      <div className={styles.loading} aria-label="Loading" />
    </div>
  );
}

export { Loading };
