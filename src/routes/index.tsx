import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/components/about";
import { Moon } from "@/components/moon";
import { SearchForm } from "@/components/search-form";
import { Suggestions } from "@/components/suggestions";
import { useNoScroll } from "@/hooks/use-no-scroll";
import styles from "./index.module.css";

export const Route = createFileRoute("/")({
  component: Home,
});

interface Suggestion {
  query: string;
  yearStart?: number;
  yearEnd?: number;
}

const suggestions: Suggestion[] = [
  { query: "Artemis", yearStart: 2026, yearEnd: 2026 },
  { query: "Mercury" },
  { query: "Venus" },
  { query: "Earth" },
  { query: "Mars" },
  { query: "Jupiter" },
  { query: "Saturn" },
  { query: "Uranus" },
  { query: "Neptune" },
  { query: "Pluto" },
  { query: "Moon" },
];

function Home() {
  useNoScroll();

  return (
    <div className={styles.wrapper}>
      <main className={styles.content}>
        <img
          className={styles.logo}
          src={`${import.meta.env.BASE_URL}logo.svg`}
          alt="NASA"
          width={200}
          loading="eager"
        />

        <h1 className="sr-only">NASA Media Explorer</h1>

        <p className={styles.intro}>
          Search NASA's multimedia library for images, videos and audio.
        </p>

        <SearchForm />

        <Suggestions>
          {suggestions.map(({ query, yearStart, yearEnd }) => (
            <Suggestions.Item
              key={query}
              to="/search"
              search={{ query, yearStart, yearEnd }}
            >
              {query}
            </Suggestions.Item>
          ))}
        </Suggestions>

        <div className={styles.about}>
          <About />
        </div>
      </main>

      <Moon />
    </div>
  );
}
