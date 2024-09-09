import Container from "@/app/components/Container";
import AddListForm from "./AddListFrom";
import FormWrap from "@/app/components/FormWrap";
import { Redressed } from "next/font/google";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";

const redressed = Redressed({
  subsets: ["latin"],
  weight: ["400"],
});
const AddList = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return <NullData title="Sign in first" />;
  return (
    <div className={`${redressed.className} font-normal text-xl   p-8`}>
      <Container>
        <FormWrap>
          <AddListForm />
        </FormWrap>
      </Container>
    </div>
  );
};

export default AddList;
