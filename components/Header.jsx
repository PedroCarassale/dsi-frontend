import { Bell, Home, ChevronDown, BookOpen, Shield, FileText, X } from "lucide-react";
import { Button } from "./ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useNotifications } from "../src/context/NotificationContext";

function Header() {
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
        return <BookOpen className="h-4 w-4 text-cyan-600" />;
      case 'patente':
        return <Shield className="h-4 w-4 text-green-600" />;
      case 'memoria':
        return <FileText className="h-4 w-4 text-blue-600" />;
      default:
        return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo y título */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <Home className="h-6 w-6 text-blue-600" />
                <span className="ml-3 text-lg font-semibold text-gray-900">
                  Interfaz de usuario DSI
                </span>
              </Link>
            </div>

            {/* Navegación */}
            <nav className="ml-10 flex items-baseline space-x-8">
              <Link
                to="/memorias-anuales"
                className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Memorias Anuales
              </Link>
              <Link
                to="/registros-patentes"
                className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Registros y Patentes
              </Link>
              <Link
                to="/trabajos-publicados"
                className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Trabajos Publicados
              </Link>
            </nav>
          </div>

          {/* Navegación derecha */}
          <div className="flex items-center space-x-6">
            {/* Notificaciones */}
            <div className="relative">
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="h-5 w-5 text-gray-600" />
                {getUnreadCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getUnreadCount()}
                  </span>
                )}
              </Button>

              {/* Panel de notificaciones */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Notificaciones</h3>
                      <button
                        onClick={() => setShowNotifications(false)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-gray-500">
                        No hay notificaciones
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          onClick={() => handleNotificationClick(notification)}
                          className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                            !notification.read ? 'bg-blue-50' : ''
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              notification.type === 'publicacion' ? 'bg-cyan-100' :
                              notification.type === 'patente' ? 'bg-green-100' : 'bg-blue-100'
                            }`}>
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1">
                              <p className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                                {notification.title}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-400 mt-2">
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
              <span className="text-gray-600 mr-1">Grupo:</span>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-900 hover:text-gray-700"
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
