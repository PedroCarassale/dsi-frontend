import Header from "./Header";

// Función para obtener clases de estilo según dark mode
const getStyleClass = (styleKey, isDarkMode = false) => {
  const styles = {
    'background': isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
  };
  return styles[styleKey] || '';
};

function Layout({ children, isDarkMode = false, toggleDarkMode }) {
  return (
    <div className={`min-h-screen transition-colors duration-300 ${getStyleClass('background', isDarkMode)}`}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main className="mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
    </div>
  );
}

export default Layout;