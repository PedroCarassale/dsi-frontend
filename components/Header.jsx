import { Bell, Home, ChevronDown, BookOpen, Shield, FileText, X, Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useNotifications } from "../src/context/NotificationContext";

// Función para obtener clases de estilo según dark mode
const getStyleClass = (styleKey, isDarkMode = false) => {
  const styles = {
    'header.bg': isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200',
    'text.primary': isDarkMode ? 'text-white' : 'text-gray-900',
    'text.secondary': isDarkMode ? 'text-gray-400' : 'text-gray-600',
    'text.nav': isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-700',
    'icons.primary': isDarkMode ? 'text-blue-400' : 'text-blue-600',
    'icons.secondary': isDarkMode ? 'text-gray-400' : 'text-gray-600',
    'icons.cyan': isDarkMode ? 'text-cyan-400' : 'text-cyan-600',
    'icons.green': isDarkMode ? 'text-green-400' : 'text-green-600',
    'icons.blue': isDarkMode ? 'text-blue-400' : 'text-blue-600',
    'panel.bg': isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200',
    'panel.border': isDarkMode ? 'border-gray-700' : 'border-gray-200',
    'panel.hover': isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50',
    'panel.item': isDarkMode ? 'border-gray-700' : 'border-gray-100',
    'panel.unread': isDarkMode ? 'bg-blue-900' : 'bg-blue-50',
    'iconBg.cyan': isDarkMode ? 'bg-cyan-900' : 'bg-cyan-100',
    'iconBg.green': isDarkMode ? 'bg-green-900' : 'bg-green-100',
    'iconBg.blue': isDarkMode ? 'bg-blue-900' : 'bg-blue-100',
    'button.darkToggle': isDarkMode ? 'bg-yellow-500 border-yellow-400 text-gray-900 hover:bg-yellow-400' : 'bg-gray-800 border-gray-700 text-yellow-400 hover:bg-gray-700'
  };
  return styles[styleKey] || '';
};

function Header({ isDarkMode = false, toggleDarkMode }) {
  const navigate = useNavigate();
  const { notifications, getUnreadCount, markAsRead } = useNotifications();
  const [showNotifications, setShowNotifications] = useState(false);

  const handleNotificationClick = (notification) => {
    markAsRead(notification.id);
    setShowNotifications(false);
    navigate(notification.link);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'publicacion':
        return <BookOpen className={`h-4 w-4 ${getStyleClass('icons.cyan', isDarkMode)}`} />;
      case 'patente':
        return <Shield className={`h-4 w-4 ${getStyleClass('icons.green', isDarkMode)}`} />;
      case 'memoria':
        return <FileText className={`h-4 w-4 ${getStyleClass('icons.blue', isDarkMode)}`} />;
      default:
        return <Bell className={`h-4 w-4 ${getStyleClass('icons.secondary', isDarkMode)}`} />;
    }
  };

  return (
    <header className={`${getStyleClass('header.bg', isDarkMode)} border-b shadow-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo y título */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <Home className={`h-6 w-6 ${getStyleClass('icons.primary', isDarkMode)}`} />
                <span className={`ml-3 text-lg font-semibold ${getStyleClass('text.primary', isDarkMode)}`}>
                  Interfaz de usuario DSI
                </span>
              </Link>
            </div>

            {/* Navegación */}
            <nav className="ml-10 flex items-baseline space-x-8">
              <Link
                to="/memorias-anuales"
                className={`${getStyleClass('text.nav', isDarkMode)} px-3 py-2 rounded-md text-sm font-medium`}
              >
                Memorias Anuales
              </Link>
              <Link
                to="/registros-patentes"
                className={`${getStyleClass('text.nav', isDarkMode)} px-3 py-2 rounded-md text-sm font-medium`}
              >
                Registros y Patentes
              </Link>
              <Link
                to="/trabajos-publicados"
                className={`${getStyleClass('text.nav', isDarkMode)} px-3 py-2 rounded-md text-sm font-medium`}
              >
                Trabajos Publicados
              </Link>
            </nav>
          </div>

          {/* Navegación derecha */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            {toggleDarkMode && (
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg border transition-all duration-300 ${getStyleClass('button.darkToggle', isDarkMode)}`}
                title={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            )}

            {/* Notificaciones */}
            <div className="relative">
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className={`h-5 w-5 ${getStyleClass('icons.secondary', isDarkMode)}`} />
                {getUnreadCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getUnreadCount()}
                  </span>
                )}
              </Button>

              {/* Panel de notificaciones */}
              {showNotifications && (
                <div className={`absolute right-0 mt-2 w-80 ${getStyleClass('panel.bg', isDarkMode)} rounded-lg shadow-lg border z-50`}>
                  <div className={`p-4 border-b ${getStyleClass('panel.border', isDarkMode)}`}>
                    <div className="flex items-center justify-between">
                      <h3 className={`text-lg font-semibold ${getStyleClass('text.primary', isDarkMode)}`}>Notificaciones</h3>
                      <button
                        onClick={() => setShowNotifications(false)}
                        className={`${getStyleClass('text.secondary', isDarkMode)} hover:${getStyleClass('text.primary', isDarkMode)}`}
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className={`p-4 text-center ${getStyleClass('text.secondary', isDarkMode)}`}>
                        No hay notificaciones
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          onClick={() => handleNotificationClick(notification)}
                          className={`p-4 border-b ${getStyleClass('panel.item', isDarkMode)} ${getStyleClass('panel.hover', isDarkMode)} cursor-pointer transition-colors ${
                            !notification.read ? getStyleClass('panel.unread', isDarkMode) : ''
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              notification.type === 'publicacion' ? getStyleClass('iconBg.cyan', isDarkMode) :
                              notification.type === 'patente' ? getStyleClass('iconBg.green', isDarkMode) : 
                              getStyleClass('iconBg.blue', isDarkMode)
                            }`}>
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1">
                              <p className={`text-sm font-medium ${!notification.read ? getStyleClass('text.primary', isDarkMode) : getStyleClass('text.secondary', isDarkMode)}`}>
                                {notification.title}
                              </p>
                              <p className={`text-xs ${getStyleClass('text.secondary', isDarkMode)} mt-1`}>
                                {notification.message}
                              </p>
                              <p className={`text-xs ${getStyleClass('text.secondary', isDarkMode)} mt-2`}>
                                {notification.time}
                              </p>
                            </div>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
            {/* Dropdown Grupo */}
            <div className="flex items-center text-sm">
              <span className={`${getStyleClass('text.secondary', isDarkMode)} mr-1`}>Grupo:</span>
              <Button
                variant="ghost"
                size="sm"
                className={`${getStyleClass('text.primary', isDarkMode)} hover:${getStyleClass('text.secondary', isDarkMode)}`}
              >
                Grupo 11
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
