import { createFileRoute, useParams, useRouter } from "@tanstack/react-router";
import { Button } from "@/components/button";
import { Icon } from "@/components/icon";
import { Keywords } from "@/components/keywords";
import { Layout } from "@/components/layout/layout";
import { useMediaDetail } from "@/hooks/use-media-detail";
import { MediaPreview } from "@/components/media-preview";
import { Loading } from "@/components/loading";
import { MetaData } from "@/components/meta-data";
import { Details } from "@/components/details";

export const Route = createFileRoute("/video/$id")({
  component: Video,
});

function Video() {
  const router = useRouter();
  const { id } = useParams({ from: "/video/$id" });
  const { data, isLoading, isError } = useMediaDetail({ id });

  if (isLoading) {
    return <Loading shown={true} />;
  }

  if (isError) {
    return <p>Sorry there was a problem</p>;
  }

  if (data?.metadata.type !== "video") {
    return null;
  }

  const originalVideo = data?.links.find((link) =>
    link.href.includes("~orig"),
  )?.href;

  const previewVideo = data?.links.find((link) =>
    link.href.includes("~preview"),
  )?.href;

  const hasUniqueDescription = data.metadata.excerpt !== data.metadata.title;

  const description = hasUniqueDescription ? data.metadata.excerpt : undefined;

  function handleBackClick() {
    router.history.back();
  }

  return (
    <Layout>
      <Layout.Header padded>
        <Button onClick={handleBackClick}>
          <Icon name="back" /> Back
        </Button>
      </Layout.Header>

      <Layout.Main>
        {data && (
          <>
            <MediaPreview>
              {previewVideo && (
                <video
                  src={previewVideo}
                  controls
                  autoPlay
                  muted
                  aria-label={data.metadata.title}
                />
              )}
            </MediaPreview>

            <Details
              title={data.metadata.title}
              description={description}
              downloadHref={originalVideo}
            />

            <MetaData>
              <MetaData.Item heading="Type">
                <p>Video</p>
              </MetaData.Item>

              <MetaData.Item heading="Date">
                <p>{data.metadata.date}</p>
              </MetaData.Item>

              <MetaData.Item heading="Duration">
                <p>{data.metadata.duration}</p>
              </MetaData.Item>

              <MetaData.Item heading="Size">
                <p>{data.metadata.fileSize}</p>
              </MetaData.Item>

              <MetaData.Item heading="Keywords">
                <Keywords>
                  {data.metadata.keywords?.map((keyword) => (
                    <Keywords.Item
                      key={keyword}
                      to="/search"
                      search={{ query: keyword }}
                    >
                      {keyword}
                    </Keywords.Item>
                  ))}
                </Keywords>
              </MetaData.Item>
            </MetaData>
          </>
        )}
      </Layout.Main>
    </Layout>
  );
}
