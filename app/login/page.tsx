import Container from "../components/Container";
import FormWrap from "../components/FormWrap";
import LogInForm from "./LogInForm";

const LogIn = async () => {
  return (
    <Container>
      <FormWrap>
        <LogInForm />
      </FormWrap>
    </Container>
  );
};

export default LogIn;
