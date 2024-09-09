import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "../components/Container";
import FormWrap from "../components/FormWrap";
import LogInForm from "./LogInForm";

const LogIn = async () => {
  const currentUser = await getCurrentUser();
  return (
    <Container>
      <FormWrap>
        <LogInForm currentUser={currentUser} />
      </FormWrap>
    </Container>
  );
};

export default LogIn;
