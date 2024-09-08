import Container from "@/app/components/Container";
import AddListForm from "./AddListFrom";
import FormWrap from "@/app/components/FormWrap";
import { Redressed } from "next/font/google";
const redressed = Redressed({ subsets: ["latin"], weight: "400" });
const AddList = () => {
  return (
    <div className={`${redressed.className} p-8`}>
      <Container>
        <FormWrap>
          <AddListForm />
        </FormWrap>
      </Container>
    </div>
  );
};

export default AddList;
