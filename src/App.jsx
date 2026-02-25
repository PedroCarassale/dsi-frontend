import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import MemoriasAnuales from "./pages/memorias-anuales/MemoriasAnuales";
import RegistrosPatentes from "./pages/registros-patentes/RegistrosPatentes";
import TrabajosPublicados from "./pages/trabajos-publicados/TrabajosPublicados";
import AppLayout from "../components/AppLayout";
import Login from "./pages/login/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="app">
      <AppLayout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/memorias-anuales"
            element={
              <ProtectedRoute>
                <MemoriasAnuales />
              </ProtectedRoute>
            }
          />
          <Route
            path="/registros-patentes"
            element={
              <ProtectedRoute>
                <RegistrosPatentes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trabajos-publicados"
            element={
              <ProtectedRoute>
                <TrabajosPublicados />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AppLayout>
    </div>
  );
}

export default App;
