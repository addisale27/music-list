import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "../components/Container";
import Display from "./Display";
import NullData from "../components/NullData";
import { getYourOwnPlayList } from "@/actions/getYourOwnPlayLists";
import MusicCard from "../components/MusicCard";

const YourPlayLists = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return <NullData title="Please sign in first" />;
  const yourPlaylists = await getYourOwnPlayList(currentUser.id);
  if (!yourPlaylists) return <NullData title="No playlist found" />;
  if (yourPlaylists?.length === 0)
    return <NullData title="You haven`t created any list yet" />;
  return (
    <div className="p-8">
      <Container>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {yourPlaylists.map((list) => {
            return <MusicCard key={list.id} list={list} />;
          })}
        </div>
      </Container>
    </div>
  );
};

export default YourPlayLists;
