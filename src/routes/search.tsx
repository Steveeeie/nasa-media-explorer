import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { AudioResults } from "@/components/audio-results";
import { Filters } from "@/components/filters";
import { ImageResults } from "@/components/image-results";
import { Layout } from "@/components/layout/layout";
import { Loading } from "@/components/loading";
import { NoResults } from "@/components/no-results";
import { Pagination } from "@/components/pagination";
import { SearchForm } from "@/components/search-form";
import { VideoResults } from "@/components/video-results";
import { useNasaMediaSearch } from "@/hooks/use-media-search";
import { searchPageParams } from "@/schema";
import styles from "./search.module.css";

export const Route = createFileRoute("/search")({
  component: Search,
  validateSearch: searchPageParams.parse,
  beforeLoad: ({ search }) => {
    if (!search.query) {
      throw redirect({ to: "/" });
    }
  },
});

function Search() {
  const { query, page = 1, type = "image" } = Route.useSearch();

  const { data, isLoading, isError } = useNasaMediaSearch({
    query,
    page,
    type,
  });

  const hasResults = Boolean(data?.totalResults);

  return (
    <Layout>
      <Layout.Header>
        <div className={styles.form}>
          <Link to="/">
            <img
              src={`${import.meta.env.BASE_URL}logo-worm.svg`}
              alt="NASA"
              width={142}
              height={40}
              loading="eager"
            />
          </Link>

          <SearchForm defaultValue={query} fill />
        </div>

        <Filters label="Filter By Type">
          <Filters.Item
            active={type === "image"}
            search={({ query }) => ({ query, type: "image" })}
          >
            Images
          </Filters.Item>

          <Filters.Item
            active={type === "video"}
            search={({ query }) => ({ query, type: "video" })}
          >
            Videos
          </Filters.Item>

          <Filters.Item
            active={type === "audio"}
            search={({ query }) => ({ query, type: "audio" })}
          >
            Audio
          </Filters.Item>
        </Filters>
      </Layout.Header>

      <Layout.Main>
        <h1 className="sr-only">Search Results for &quot;{query}&quot;</h1>

        <div className="sr-only" aria-live="polite" aria-atomic>
          {<p>Found {data?.totalResults} results</p>}

          {isError && <p>Failed to search. Please try again.</p>}
        </div>

        <Loading shown={isLoading} />

        {!isLoading && !hasResults && <NoResults />}

        {hasResults && type === "image" && (
          <ImageResults>
            {data?.results.map(({ id, title, thumbnail }) => (
              <ImageResults.Item
                key={id}
                id={id}
                title={title}
                thumbnail={thumbnail!}
              />
            ))}
          </ImageResults>
        )}

        {hasResults && type === "audio" && (
          <AudioResults>
            {data?.results.map(({ id, title, date }) => (
              <AudioResults.Item key={id} id={id} title={title} date={date} />
            ))}
          </AudioResults>
        )}

        {hasResults && type === "video" && (
          <VideoResults>
            {data?.results.map(({ id, title, thumbnail, description }) => (
              <VideoResults.Item
                key={id}
                id={id}
                title={title}
                thumbnail={thumbnail!}
                description={description}
              />
            ))}
          </VideoResults>
        )}

        {data && data.totalPages > 1 && (
          <Pagination aria-label="Pagination">
            <Pagination.Button
              search={(prev) => ({ ...prev, page: page - 1 })}
              disabled={page === 1}
            >
              Previous
            </Pagination.Button>

            <Pagination.Info current={page} total={data.totalPages} />

            <Pagination.Button
              search={(prev) => ({ ...prev, page: page + 1 })}
              disabled={page === data.totalPages}
            >
              Next
            </Pagination.Button>
          </Pagination>
        )}
      </Layout.Main>
    </Layout>
  );
}
