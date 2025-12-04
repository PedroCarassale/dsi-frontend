import { useLocation } from "react-router-dom";
import { useDarkMode } from "../src/context/DarkModeContext";
import Layout from "./Layout";

// Función para obtener clases de estilo según dark mode
const getStyleClass = (styleKey, isDarkMode = false) => {
  const styles = {
    'background': isDarkMode ? 'bg-gray-900' : 'bg-gray-50',
    'text.primary': isDarkMode ? 'text-white' : 'text-gray-900'
  };
  return styles[styleKey] || '';
};

function AppLayout({ children }) {
  const location = useLocation();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const noLayoutPages = ["/login"];

  const shouldShowLayout = !noLayoutPages.includes(location.pathname);

  if (shouldShowLayout) {
    return <Layout isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}>{children}</Layout>;
  }

  return (
    <div className={`min-h-screen ${getStyleClass('background', isDarkMode)}`}>
      {children}
    </div>
  );
}

export default AppLayout;
