import { getCurrentUser } from "@/actions/getCurrentUser";
import { getPlayListById } from "@/actions/getPlayListById";
import Container from "@/app/components/Container";
import NullData from "@/app/components/NullData";

import FormWrap from "@/app/components/FormWrap";
import UpdateForm from "./UpdataForm";

interface IParams {
  listId: string;
}
const Update = async ({ params }: { params: IParams }) => {
  const currentUser = await getCurrentUser();
  if (!currentUser)
    return <NullData title="Oops! Access denied. Sign up first." />;

  const playList = await getPlayListById(params.listId);

  // Handle cases where the playlist is not found
  if (!playList) return <NullData title="Playlist not found." />;

  // Ensure that the current user is the owner of the playlist

  if (playList.userId !== currentUser.id) {
    return <NullData title="You can update only your own playlist." />;
  }

  return (
    <div>
      <Container>
        <FormWrap>
          <UpdateForm playList={playList} />
        </FormWrap>
      </Container>
    </div>
  );
};

export default Update;
