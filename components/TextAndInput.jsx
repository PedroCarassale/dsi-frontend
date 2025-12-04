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
  isDarkMode = false,
  ...props
}) => {
  return (
    <TextAndInputContainer>
      <TextContainer>
        <Typography 
          variant="tiny" 
          fontWeight="bold"
          style={{ color: isDarkMode ? '#f3f4f6' : '#111827' }}
        >
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
        type={text === "Contraseña" ? "password" : "email"}
        placeholder={input}
        value={value}
        onChange={onChange}
        style={{
          backgroundColor: isDarkMode ? '#374151' : '#ffffff',
          borderColor: isDarkMode ? '#4b5563' : '#d1d5db',
          color: isDarkMode ? '#f3f4f6' : '#111827',
          '::placeholder': {
            color: isDarkMode ? '#9ca3af' : '#6b7280'
          }
        }}
        {...props}
      />
    </TextAndInputContainer>
  );
};

export default TextAndInput;
