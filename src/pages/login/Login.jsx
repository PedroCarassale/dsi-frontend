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

const FormAndLogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 48px;
`;

const FormAndLogoContainer = styled(Row)`
  width: 480px;
  height: 420px;
  background-color: #fff;
  border-radius: 22px;
  border: 1px solid #222;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LogoContainer = styled.div`
  width: 260px;
  height: 260px;
  background-color: #fff;
  border-radius: 22px;
  box-shadow: 0 0 0 1px #222;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Login = () => {
  return (
    <MainContainer>
      <FormAndLogoWrapper>
        <FormAndLogoContainer>
          <LoginForm />
        </FormAndLogoContainer>
        <LogoContainer>
          <img
            src={UTNLogo}
            alt="UTN Logo"
            style={{ width: "80%", height: "80%", objectFit: "contain" }}
          />
        </LogoContainer>
      </FormAndLogoWrapper>
    </MainContainer>
  );
};

export default Login;
