import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/Login";
import MemoriasAnuales from "./pages/memorias-anuales/MemoriasAnuales";
import RegistrosPatentes from "./pages/registros-patentes/RegistrosPatentes";
import TrabajosPublicados from "./pages/trabajos-publicados/TrabajosPublicados";
import AppLayout from "../components/AppLayout";

function App() {
  return (
    <div className="app">
      <AppLayout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/memorias-anuales" element={<MemoriasAnuales />} />
          <Route path="/registros-patentes" element={<RegistrosPatentes />} />
          <Route path="/trabajos-publicados" element={<TrabajosPublicados />} />
        </Routes>
      </AppLayout>
    </div>
  );
}

export default App;
