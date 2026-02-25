import { useDispatch } from "react-redux";
import { logout } from "../src/store/slices/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useState } from "react";

export default function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = () => setShowConfirm(true);
  const confirmLogout = () => {
    dispatch(logout());
    setShowConfirm(false);
    navigate("/login");
  };
  const cancelLogout = () => setShowConfirm(false);

  return (
    <>
      <Button variant="outline" size="sm" onClick={handleLogout} style={{ border: "1px solid #222", marginLeft: 12 }}>
        Cerrar sesión
      </Button>
      {showConfirm && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.3)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50 }}>
          <div style={{ background: "white", padding: 24, borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.2)", minWidth: 300, border: "3px solid #222" }}>
            <p style={{ marginBottom: 16 }}>¿Seguro que deseas cerrar sesión?</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <Button variant="outline" onClick={cancelLogout} style={{ border: "1px solid #222" }}>Cancelar</Button>
              <Button variant="destructive" onClick={confirmLogout} style={{ border: "1px solid #222" }}>Cerrar sesión</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
