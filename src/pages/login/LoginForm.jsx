import styled from "styled-components";
import Column from "../../../components/Column";
import Row from "../../../components/Row";
import { Typography } from "../../../components/Typography";
import TextAndInput from "../../../components/TextAndInput";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/slices/auth/authActions";
import { useNavigate } from "react-router-dom";
import { AlertCircle, CheckCircle } from "lucide-react";

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
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authLoading = useSelector(state => state.auth.loading);

  const handleLogin = async () => {
    // Limpiar mensajes anteriores
    setError("");
    setSuccess("");

    // Validar que los campos no estén vacíos
    if (!email || !password) {
      setError("Por favor completa email y contraseña");
      return;
    }

    // Validar formato de email básico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Por favor ingresa un email válido");
      return;
    }

    setIsLoading(true);
    console.log("Intentando login con:", { email });
    
    try {
      const result = await dispatch(login({ email, password })).unwrap();
      console.log("Login exitoso:", result);

      if (result.access_token) {
        setSuccess("¡Login exitoso! Redirigiendo...");
        console.log("Token recibido:", result.access_token);
        
        // Esperar un poco para mostrar el mensaje antes de redirigir
        setTimeout(() => {
          navigate("/");
        }, 500);
      }
    } catch (error) {
      console.error("Error en el login:", error);
      
      // Manejar diferentes tipos de errores
      if (error === "Credenciales inválidas" || error === "Invalid credentials") {
        setError("Email o contraseña incorrectos. Por favor intenta de nuevo.");
      } else if (error === "User not found") {
        setError("El usuario no existe. Por favor verifica tu email.");
      } else if (error?.includes("Network") || error?.includes("ECONNREFUSED")) {
        setError("Error de conexión. Verifica que el servidor esté disponible.");
      } else if (error?.includes("timeout")) {
        setError("La solicitud tardó demasiado. Intenta de nuevo.");
      } else {
        setError(error || "Error al iniciar sesión. Por favor intenta de nuevo.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };
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

        {/* Mensaje de error */}
        {error && (
          <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-800">{error}</p>
            </div>
          </div>
        )}

        {/* Mensaje de éxito */}
        {success && (
          <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-green-800">{success}</p>
            </div>
          </div>
        )}

        <TextAndInput
          text="Email"
          input=""
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading || authLoading}
          placeholder="tu.email@utn.edu.ar"
        />
        <TextAndInput
          text="Contraseña"
          input=""
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading || authLoading}
          placeholder="Tu contraseña"
          type="password"
        />
        <Button 
          variant="default" 
          onClick={handleLogin}
          disabled={isLoading || authLoading}
          className="w-full"
        >
          {isLoading || authLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </Button>
      </FormContainer>
    </MainContainer>
  );
};

export default LoginForm;
