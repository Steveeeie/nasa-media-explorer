import { classNames } from "@eulersoft/classnames";
import { useNavigate } from "@tanstack/react-router";
import type { FormEvent } from "react";
import { Icon } from "@/components/icon";
import { searchPageParams } from "@/schema";
import styles from "./search-form.module.css";

interface SearchFormProps {
  defaultValue?: string;
  fill?: boolean;
}

function SearchForm({ defaultValue, fill }: SearchFormProps) {
  const navigate = useNavigate();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const search = searchPageParams.parse(Object.fromEntries(formData));

    navigate({ to: "/search", search });
  }

  return (
    <form
      className={classNames(styles.form, fill && styles.fill)}
      role="search"
      onSubmit={handleSubmit}
    >
      <input
        className={styles.input}
        name="query"
        aria-label="Search Term"
        enterKeyHint="search"
        placeholder="e.g. Mars Rover"
        defaultValue={defaultValue}
        required
      />

      <div className={styles.icon}>
        <Icon name="search" title="Search" />
      </div>
    </form>
  );
}

export { SearchForm };
