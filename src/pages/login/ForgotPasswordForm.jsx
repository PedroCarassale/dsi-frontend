import styled from "styled-components";
import Column from "../../../components/Column";
import Row from "../../../components/Row";
import { Typography } from "../../../components/Typography";
import TextAndInput from "../../../components/TextAndInput";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 60vh;
`;

const FormContainer = styled(Column)`
  padding: 24px;
  flex: 1 0 0;
  gap: 30px;
  min-width: 350px;
  max-width: 400px;
`;
const TitlesContainer = styled(Column)`
  align-items: center;
  gap: 10px;
`;

// Popup reutilizable (igual que en LoginForm)
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

const ForgotPasswordForm = ({ onBack }) => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [code, setCode] = useState("");
  const [codeChecked, setCodeChecked] = useState(false);
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleSendCode = () => {
    // Aquí iría la lógica para enviar el código al email
    setSent(true);
  };

  const handleCheckCode = () => {
    // Aquí iría la lógica para verificar el código
    if (code.length === 5 && /^[0-9]{5}$/.test(code)) {
      setCodeChecked(true);
      setError("");
      // Aquí podrías continuar con el flujo de cambio de contraseña
    } else {
      setError("El código debe ser de 5 números");
      setShowPopup(true);
    }
  };

  return (
    <MainContainer>
      <FormContainer>
        <TitlesContainer>
          <Typography variant="heading" fontWeight="bold">
            Recuperar contraseña
          </Typography>
          <Typography variant="small">
            Ingresa tu email académico para recibir un código de recuperación
          </Typography>
        </TitlesContainer>
        <Column style={{ width: "100%", gap: 16, alignItems: "stretch" }}>
          {!sent && (
            <>
              <TextAndInput
                text="Email"
                input=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={sent}
              />
              <Button variant="default" onClick={handleSendCode} disabled={sent || !email}>
                {sent ? "Código enviado" : "Enviar código"}
              </Button>
            </>
          )}
          {sent && (
            <>
              <TextAndInput
                text="Código de verificación"
                input=""
                value={code}
                onChange={e => {
                  const val = e.target.value.replace(/[^0-9]/g, "");
                  if (val.length <= 5) setCode(val);
                }}
                maxLength={5}
                placeholder={"_ _ _ _ _"}
                style={{ width: "100%", textAlign: "center" }}
              />
              <Column style={{ gap: 12, width: "100%" }}>
                <Button variant="default" onClick={handleCheckCode} disabled={codeChecked}>
                  Verificar código
                </Button>
                <Button variant="ghost" onClick={onBack}>
                  Volver al login
                </Button>
              </Column>
              {/* Popup de advertencia para error de código */}
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
                      {error}
                    </Typography>
                    <PopupButton onClick={() => setShowPopup(false)}>
                      Cerrar
                    </PopupButton>
                  </PopupBox>
                </PopupOverlay>
              )}
            </>
          )}
        </Column>
      </FormContainer>
    </MainContainer>
  );
};

export default ForgotPasswordForm;
