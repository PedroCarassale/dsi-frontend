import styled from "styled-components";
import { Typography } from "./Typography";
import { Input } from "@/components/ui/input";
import Row from "./Row";

const TextAndInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 13px;
`;

const TextContainer = styled(Row)`
  width: 100%;
  justify-content: space-between;
`;

const ForgotPasswordContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;
const TextAndInput = ({
  text,
  input,
  value = "",
  onChange = () => {},
  ...props
}) => {
  return (
    <TextAndInputContainer>
      <TextContainer>
        <Typography variant="tiny" fontWeight="bold">
          {text}
        </Typography>
        {/* {text === "Contraseña" && (
          <ForgotPasswordContainer>
            <Typography variant="tiny" fontWeight="normal">
              Olvidó su contraseña?
            </Typography>
          </ForgotPasswordContainer>
        )} */}
      </TextContainer>
      <Input
        type={text === "Contraseña" ? "password" : "text"}
        placeholder={input}
        value={value}
        onChange={onChange}
        {...props}
      />
    </TextAndInputContainer>
  );
};

export default TextAndInput;
