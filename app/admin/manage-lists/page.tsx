import Container from "@/app/components/Container";
import ManageListClient from "./ManageListClient";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import { getYourOwnPlayList } from "@/actions/getYourOwnPlayLists";

const ManagePlaylists = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <NullData title="Please create an account" />;
  }

  const yourPlayList = await getYourOwnPlayList(currentUser.id);

  // Handle the case where the playlist is null or not an array
  if (!yourPlayList || !Array.isArray(yourPlayList)) {
    return <NullData title="No playlists available" />;
  }

  return (
    <div className="p-8">
      <Container>
        <ManageListClient playList={yourPlayList} />
      </Container>
    </div>
  );
};

export default ManagePlaylists;
