import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner";
import MusicCard from "./components/MusicCard";
import { musicList } from "./utils/MusicList";

export default function Home() {
  return (
    <div className="p-8">
      <Container>
        <div>
          <HomeBanner />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {musicList.map((list) => {
            return <MusicCard key={list.id} list={list} />;
          })}
        </div>
      </Container>
    </div>
  );
}
