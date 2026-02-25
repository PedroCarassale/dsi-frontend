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
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled(Column)`
  padding: 24px;
  flex: 1 0 0;
  gap: 30px;
  align-items: center;
  justify-content: center;
  height: 100%;
  max-width: 400px;
`;
const TitlesContainer = styled(Column)`
  align-items: center;
  gap: 10px;
`;
const InputWrapper = styled.div`
  width: 100%;
  max-width: 400px;
`;

// Popup simple reutilizable
const PopupOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

const PopupBox = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.18);
  padding: 32px 24px 20px 24px;
  min-width: 280px;
  max-width: 90vw;
  text-align: center;
  border: 1px solid #e11d48;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PopupButton = styled.button`
  margin-top: 18px;
  background: #e11d48;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 20px;
  font-size: 1rem;
  cursor: pointer;
`;

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setErrorMsg("");
    if (!email || !password) {
      setErrorMsg("Por favor, complete ambos campos.");
      setShowPopup(true);
      return;
    }
    setLoading(true);
    try {
      const result = await dispatch(login({ email, password })).unwrap();
      if (result.access_token) {
        console.log("Login exitoso, token recibido:", result.access_token);
        navigate("/");
      }
    } catch (error) {
      setErrorMsg("Email o contraseña incorrectos.");
      setShowPopup(true);
      console.error("Error en el login:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
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
        {/* Popup de error */}
        {showPopup && (
          <PopupOverlay>
            <PopupBox>
              <Typography
                variant="medium"
                style={{
                  color: "#e11d48",
                  marginBottom: 8,
                  textAlign: "center",
                  width: "100%",
                }}
              >
                {errorMsg}
              </Typography>
              <PopupButton onClick={() => setShowPopup(false)}>
                Cerrar
              </PopupButton>
            </PopupBox>
          </PopupOverlay>
        )}
        <InputWrapper>
          <TextAndInput
            text="Ingrese su Email"
            input=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </InputWrapper>
        <InputWrapper>
          <TextAndInput
            text="Ingrese su Contraseña"
            input=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            onKeyDown={handleKeyDown}
          />
        </InputWrapper>
        <Button
          variant="link"
          onClick={() => setShowForgot(true)}
          style={{
            alignSelf: "flex-end",
            fontSize: "0.85rem",
            marginTop: -16,
            marginBottom: 8,
            padding: 0,
            height: "auto",
            minHeight: 0,
            lineHeight: 1,
            marginRight: 0,
          }}
        >
          ¿Olvidaste tu contraseña?
        </Button>
        <Button
          variant="default"
          onClick={handleLogin}
          disabled={loading}
          style={{ width: "100%", maxWidth: 400 }}
        >
          {loading ? "Cargando..." : "Iniciar sesión"}
        </Button>
      </FormContainer>
    </MainContainer>
  );
};

export default LoginForm;
