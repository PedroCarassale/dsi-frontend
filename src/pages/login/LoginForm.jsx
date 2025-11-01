import styled from "styled-components";
import Column from "../../../components/Column";
import Row from "../../../components/Row";
import { Typography } from "../../../components/Typography";
import TextAndInput from "../../../components/TextAndInput";
import { Button } from "@/components/ui/button";

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
        <TextAndInput text="Email" input="" />
        <TextAndInput text="Contraseña" input="" />
        <Button variant="default">Iniciar sesión</Button>
      </FormContainer>
    </MainContainer>
  );
};

export default LoginForm;
