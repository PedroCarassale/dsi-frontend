import { Plus, Search, Home, BookOpen } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

function TrabajosPublicados() {
  return (
    <>
      {/* Sección de título con breadcrumb */}
      <div className="mb-6">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <Home className="h-4 w-4 mr-1" />
          <BookOpen className="h-4 w-4 mr-1" />
          <span>Trabajos Publicados</span>
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Trabajos Publicados</h1>
            <p className="text-gray-600 mt-1">Gestión de publicaciones, papers y trabajos académicos</p>
          </div>
        </div>
        
        {/* Barra de búsqueda y botón Nueva Publicación */}
        <div className="flex items-center gap-4">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              type="text" 
              placeholder="Buscar por título o autor..." 
              className="pl-10 bg-white border-gray-300"
            />
          </div>
          
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Nueva Publicación
          </Button>
        </div>
      </div>
    </>
  );
}

export default TrabajosPublicados;