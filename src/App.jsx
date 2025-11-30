import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import MemoriasAnuales from "./pages/memorias-anuales/MemoriasAnuales";
import RegistrosPatentes from "./pages/registros-patentes/RegistrosPatentes";
import TrabajosPublicados from "./pages/trabajos-publicados/TrabajosPublicados";
import AppLayout from "../components/AppLayout";
import { NotificationProvider } from "./context/NotificationContext";
import Login from "./pages/login/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeAuth } from "./store/slices/auth/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return (
    <div className="app">
      <NotificationProvider>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/memorias-anuales" element={<ProtectedRoute><MemoriasAnuales /></ProtectedRoute>} />
            <Route path="/registros-patentes" element={<ProtectedRoute><RegistrosPatentes /></ProtectedRoute>} />
            <Route path="/trabajos-publicados" element={<ProtectedRoute><TrabajosPublicados /></ProtectedRoute>} />
          </Routes>
        </AppLayout>
      </NotificationProvider>
    </div>
  );
}

export default App;
