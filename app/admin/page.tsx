import { getCurrentUser } from "@/actions/getCurrentUser";
import { getYourOwnPlayList } from "@/actions/getYourOwnPlayLists";
import NullData from "../components/NullData";

import Summary from "./Summary";
import Container from "../components/Container";

const AdminPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return <NullData title="Please! sign up first" />;
  const playList = await getYourOwnPlayList(currentUser?.id);

  return (
    <div className="p-8">
      <Container>
        <Summary playList={playList} />
      </Container>{" "}
    </div>
  );
};

export default AdminPage;
