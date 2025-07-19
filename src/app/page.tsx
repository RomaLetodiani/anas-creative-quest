import { HomePageView } from "$/components/home-page-view";
import { challengesMap } from "$/lib/images.data";
import { SearchParams } from "$/types/params.type";
import { Metadata } from "next";

type HomeProps = SearchParams<{ challenge?: string | null }>;

export async function generateMetadata({ searchParams }: HomeProps): Promise<Metadata> {
  const { challenge } = await searchParams;

  const challengeData = challenge ? challengesMap.get(challenge) : null;
  const image = challengeData?.images[0];

  return {
    description: challengeData?.name,
    openGraph: {
      description: challengeData?.name,
      images: image ? [image] : ["/images/img1.jpeg"],
    },
  };
}

const Home = async ({ searchParams }: HomeProps) => {
  const { challenge } = await searchParams;
  return <HomePageView challengeSlug={challenge} />;
};

export default Home;
