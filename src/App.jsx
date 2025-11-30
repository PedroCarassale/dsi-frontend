import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import MemoriasAnuales from "./pages/memorias-anuales/MemoriasAnuales";
import RegistrosPatentes from "./pages/registros-patentes/RegistrosPatentes";
import TrabajosPublicados from "./pages/trabajos-publicados/TrabajosPublicados";
import AppLayout from "../components/AppLayout";
import { NotificationProvider } from "./context/NotificationContext";
import Login from "./pages/login/Login";

function App() {
  return (
    <div className="app">
      <NotificationProvider>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/memorias-anuales" element={<MemoriasAnuales />} />
            <Route path="/registros-patentes" element={<RegistrosPatentes />} />
            <Route path="/trabajos-publicados" element={<TrabajosPublicados />} />
          </Routes>
        </AppLayout>
      </NotificationProvider>
    </div>
  );
}

export default App;
