export const revalidate = 0;
import getAllMusicLists, { IParams } from "@/actions/getAllPlayList";
import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner";
import MusicCard from "./components/MusicCard";

import NullData from "./components/NullData";
interface HomeProps {
  searchParams: IParams;
}
export default async function Home({ searchParams }: HomeProps) {
  const musicLists = await getAllMusicLists(searchParams);
  if (!musicLists)
    return <NullData title="Oops! No playlist found. Create your own!" />;
  if (musicLists.length === 0)
    return <NullData title="Oops! No playlist found. Create your own!" />;
  return (
    <div className="p-8">
      <Container>
        <div>
          <HomeBanner />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {musicLists.map((list) => {
            return <MusicCard key={list.id} list={list} />;
          })}
        </div>
      </Container>
    </div>
  );
}
