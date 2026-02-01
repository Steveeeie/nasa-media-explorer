import { LinkButton } from "../button";
import styles from "./details.module.css";

interface DetailsProps {
  title: string;
  downloadHref?: string;
  description?: string;
}

function Details({ title, description, downloadHref }: DetailsProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <h1 className={styles.heading}>{title}</h1>

        {downloadHref && (
          <LinkButton
            href={downloadHref}
            variant="primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download Original
          </LinkButton>
        )}
      </div>

      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
}

export { Details };
