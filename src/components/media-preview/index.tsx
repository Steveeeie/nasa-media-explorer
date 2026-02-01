import type { PropsWithChildren } from "react";
import styles from "./media-preview.module.css";

function MediaPreview(props: PropsWithChildren) {
  return <div className={styles.wrapper} {...props} />;
}

export { MediaPreview };
