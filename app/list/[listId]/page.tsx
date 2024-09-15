import { getPlayListById } from "@/actions/getPlayListById";
import Container from "@/app/components/Container";
import ListDetail from "./ListDetail";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import ListRating from "./ListRating";
import AddRating from "./AddRating";
interface IPrams {
  listId: string;
}
const ListPage = async ({ params }: { params: IPrams }) => {
  const list = await getPlayListById(params.listId);
  const currentUser = await getCurrentUser();
  const isOwner = currentUser ? currentUser.id === list?.userId : false;
  if (!list) return <NullData title="No listing available" />;
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
