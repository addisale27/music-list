import Container from "@/app/components/Container";
import ListDetail from "./ListDetail";
import { list } from "@/app/utils/list";
import ListRating from "./ListRating";

interface IPrams {
  listId: string;
}

const ListPage = ({ params }: { params: IPrams }) => {
  return (
    <div className="p-8">
      <Container>
        <ListDetail list={list} />
        <ListRating list={list} />
      </Container>
    </div>
  );
};

export default ListPage;
