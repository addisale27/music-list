import Container from "../components/Container";
import FormWrap from "../components/FormWrap";
import RegisterForm from "./registerForm";

const register = async () => {
  return (
    <Container>
      <FormWrap>
        <RegisterForm />
      </FormWrap>
    </Container>
  );
};

export default register;
