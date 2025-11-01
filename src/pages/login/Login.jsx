import styled from "styled-components";
import Row from "../../../components/Row";
import LoginForm from "./LoginForm";
import UTNLogo from "../../assets/UTN.svg";

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4f4f5;
  height: 100vh;
  width: 100vw;
`;

const FormAndLogoContainer = styled(Row)`
  width: 750px;
  height: 380px;

  background-color: #fff;
  border-radius: 15px;

  & > * {
    border: 1px solid #e5e5e5;
  }
`;

const LogoContainer = styled.div`
  width: 40%;
  height: 100%;
  background-color: #fff;
`;

const Login = () => {
  return (
    <MainContainer>
      <FormAndLogoContainer>
        <LoginForm />
        <LogoContainer>
          <img
            src={UTNLogo}
            alt="UTN Logo"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </LogoContainer>
      </FormAndLogoContainer>
    </MainContainer>
  );
};

export default Login;
