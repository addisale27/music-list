import Container from "@/app/components/Container";
import ListDetail from "./ListDetail";

import ListRating from "./ListRating";
import { getPlayListById } from "@/actions/getPlayListById";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import AddList from "@/app/admin/add-list/page";
import AddRating from "./AddRating";

interface IPrams {
  listId: string;
}

const ListPage = async ({ params }: { params: IPrams }) => {
  const list = await getPlayListById(params.listId);
  if (!list) return <NullData title="No Playlist found" />;
  const currentUser = await getCurrentUser();
  let isOwner = false;
  if (currentUser) {
    isOwner = currentUser.id === list?.userId;
  }
  return (
    <div className="p-8">
      <Container>
        <ListDetail list={list} isOwner={isOwner} />
        <div className="flex flex-col mt-20 gap-4">
          <AddRating list={list} user={currentUser} />
          <ListRating list={list} />
        </div>
      </Container>
    </div>
  );
};

export default ListPage;
