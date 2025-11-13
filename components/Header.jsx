import { Bell, Home, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";

function Header() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo y título */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Home className="h-6 w-6 text-blue-600" />
              <span className="ml-3 text-lg font-semibold text-gray-900">Interfaz de usuario DSI</span>
            </div>
          </div>

          {/* Navegación derecha */}
          <div className="flex items-center space-x-6">
            {/* Notificaciones */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Button>

            {/* Dropdown Grupo */}
            <div className="flex items-center text-sm">
              <span className="text-gray-600 mr-1">Grupo:</span>
              <Button variant="ghost" size="sm" className="text-gray-900 hover:text-gray-700">
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