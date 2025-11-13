import { Plus, Search, Home, FolderOpen } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

function MemoriasAnuales() {
  return (
    <>
      {/* Sección de título con breadcrumb */}
      <div className="mb-6">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <Home className="h-4 w-4 mr-1" />
          <FolderOpen className="h-4 w-4 mr-1" />
          <span>Memoria Anual</span>
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Memoria Anual</h1>
            <p className="text-gray-600 mt-1">Gestión de memorias anuales del grupo</p>
          </div>
        </div>
        
        {/* Barra de búsqueda y botón Nueva Memoria */}
        <div className="flex items-center gap-4">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              type="text" 
              placeholder="Buscar por año..." 
              className="pl-10 bg-white border-gray-300"
            />
          </div>
          
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Nueva Memoria
          </Button>
        </div>
      </div>
    </>
  );
}

export default MemoriasAnuales;