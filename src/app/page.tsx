import { HomePageView } from "$/components/home-page-view";
import { challengesMap } from "$/lib/images.data";
import { SearchParams } from "$/types/params.type";
import { Metadata } from "next";

type HomeProps = SearchParams<{ challengeId?: string | null }>;

export async function generateMetadata({ searchParams }: HomeProps): Promise<Metadata> {
  const { challengeId } = await searchParams;

  const challenge = challengesMap.get(Number(challengeId));
  const image = challenge?.images[0];

  return {
    description: challenge?.name,
    openGraph: {
      description: challenge?.name,
      images: image ? [image] : ["/images/img1.jpeg"],
    },
  };
}

const Home = async ({ searchParams }: HomeProps) => {
  const { challengeId } = await searchParams;
  return <HomePageView challengeId={challengeId} />;
};

export default Home;
