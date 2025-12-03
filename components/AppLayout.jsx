import { useLocation } from "react-router-dom";
import Layout from "./Layout";

function AppLayout({ children }) {
  const location = useLocation();

  const noLayoutPages = ["/login"];

  const shouldShowLayout = !noLayoutPages.includes(location.pathname);

  if (shouldShowLayout) {
    return <Layout>{children}</Layout>;
  }

  return <div className="min-h-screen">{children}</div>;
}

export default AppLayout;
