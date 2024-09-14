import Container from "@/app/components/Container";
import ListDetail from "./ListDetail";
import ListRating from "./ListRating";
import { getPlayListById } from "@/actions/getPlayListById";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import AddRating from "./AddRating";

interface IParams {
  listId: string;
}

const ListPage = async ({ params }: { params: IParams }) => {
  const list = await getPlayListById(params.listId);
  if (!list) return <NullData title="No Playlist found" />;

  const currentUser = await getCurrentUser();

  // Type guard to handle cases where `currentUser` might be null
  const isOwner = currentUser ? currentUser.id === list.userId : false;

  return (
    <div className="p-8">
      <Container>
        <ListDetail list={list} isOwner={isOwner} />
        <div className="flex flex-col mt-20 gap-4">
          <AddRating list={list} user={currentUser || null} />
          <ListRating list={list} />
        </div>
      </Container>
    </div>
  );
};

export default ListPage;
