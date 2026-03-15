import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/components/about";
import { Moon } from "@/components/moon";
import { SearchForm } from "@/components/search-form";
import { Suggestions } from "@/components/suggestions";
import styles from "./index.module.css";

export const Route = createFileRoute("/")({
  component: Home,
});

const suggestions = [
  "Mercury",
  "Venus",
  "Earth",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune",
  "Pluto",
  "Moon",
  "Europa",
];

function Home() {
  return (
    <>
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
          {suggestions.map((suggestion) => (
            <Suggestions.Item
              key={suggestion}
              to="/search"
              search={{ query: suggestion }}
            >
              {suggestion}
            </Suggestions.Item>
          ))}
        </Suggestions>

        <About />
      </main>

      <Moon />
    </>
  );
}
