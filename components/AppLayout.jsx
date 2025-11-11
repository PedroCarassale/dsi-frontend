import { useLocation } from "react-router-dom";
import Layout from "./Layout";

function AppLayout({ children }) {
  const location = useLocation();
  
  // Páginas que NO usan el header (como login)
  const noLayoutPages = ['/login'];
  
  const shouldShowLayout = !noLayoutPages.includes(location.pathname);
  
  if (shouldShowLayout) {
    return <Layout>{children}</Layout>;
  }
  
  // Para páginas sin layout (como Login)
  return <div className="min-h-screen">{children}</div>;
}

export default AppLayout;