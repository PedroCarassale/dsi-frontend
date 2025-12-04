import styled from "styled-components";
import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import Row from "../../../components/Row";
import LoginForm from "./LoginForm";
import UTNLogo from "../../assets/UTN.svg";

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.isDarkMode ? '#111827' : '#f4f4f5'};
  height: 100vh;
  width: 100vw;
  transition: background-color 0.3s ease;
  position: relative;
`;

const DarkModeToggle = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  border: 1px solid ${props => props.isDarkMode ? '#374151' : '#e5e7eb'};
  background-color: ${props => props.isDarkMode ? '#374151' : '#ffffff'};
  color: ${props => props.isDarkMode ? '#fbbf24' : '#111827'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.isDarkMode ? '#4b5563' : '#f3f4f6'};
  }
`;

const FormAndLogoContainer = styled(Row)`
  width: 750px;
  height: 380px;
  background-color: ${props => props.isDarkMode ? '#1f2937' : '#fff'};
  border-radius: 15px;
  transition: background-color 0.3s ease;

  & > * {
    border: 1px solid ${props => props.isDarkMode ? '#374151' : '#e5e5e5'};
  }
`;

const LogoContainer = styled.div`
  width: 40%;
  height: 100%;
  background-color: ${props => props.isDarkMode ? '#1f2937' : '#fff'};
  transition: background-color 0.3s ease;
`;

const Login = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <MainContainer isDarkMode={isDarkMode}>
      <DarkModeToggle 
        isDarkMode={isDarkMode} 
        onClick={toggleDarkMode}
        title={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </DarkModeToggle>
      
      <FormAndLogoContainer isDarkMode={isDarkMode}>
        <LoginForm isDarkMode={isDarkMode} />
        <LogoContainer isDarkMode={isDarkMode}>
          <img
            src={UTNLogo}
            alt="UTN Logo"
            style={{ 
              width: "100%", 
              height: "100%", 
              objectFit: "contain",
              filter: isDarkMode ? 'brightness(0.8) contrast(1.2)' : 'none'
            }}
          />
        </LogoContainer>
      </FormAndLogoContainer>
    </MainContainer>
  );
};

export default Login;

