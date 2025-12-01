import styled from "styled-components";
import Column from "../../../components/Column";
import Row from "../../../components/Row";
import { Typography } from "../../../components/Typography";
import TextAndInput from "../../../components/TextAndInput";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/auth/authActions";
import { useNavigate } from "react-router-dom";
import ForgotPasswordForm from "./ForgotPasswordForm";

const MainContainer = styled(Row)`
  width: 60%;
`;

const FormContainer = styled(Column)`
  padding: 24px;
  flex: 1 0 0;
  gap: 30px;
`;
const TitlesContainer = styled(Column)`
  align-items: center;
  gap: 10px;
`;


const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await dispatch(login({ email, password })).unwrap();
      if (result.access_token) {
        console.log("Login exitoso, token recibido:", result.access_token);
        navigate("/");
      }
    } catch (error) {
      console.error("Error en el login:", error);
    }
  };

  if (showForgot) {
    return <ForgotPasswordForm onBack={() => setShowForgot(false)} />;
  }

  return (
    <MainContainer>
      <FormContainer>
        <TitlesContainer>
          <Typography variant="heading" fontWeight="bold">
            Bienvenido
          </Typography>
          <Typography variant="small">
            Inicia sesión con tu email académico
          </Typography>
        </TitlesContainer>
        <TextAndInput
          text="Email"
          input=""
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Row style={{ alignItems: "center", justifyContent: "space-between" }}>
          <TextAndInput
            text="Contraseña"
            input=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="link" onClick={() => setShowForgot(true)} style={{ marginLeft: 12, whiteSpace: "nowrap" }}>
            ¿Olvidó su contraseña?
          </Button>
        </Row>
        <Button variant="default" onClick={handleLogin}>
          Iniciar sesión
        </Button>
      </FormContainer>
    </MainContainer>
  );
};

export default LoginForm;
