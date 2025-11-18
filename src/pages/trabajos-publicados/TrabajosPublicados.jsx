import { Plus, Search, Home, BookOpen, Users, Calendar, Eye } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { useState } from "react";
import DetallePublicacion from "./DetallePublicacion";

function TrabajosPublicados() {
  // Estados
  const [publicacionSeleccionada, setPublicacionSeleccionada] = useState(null);
  
  // Datos mock
  const [publicaciones, setPublicaciones] = useState([
    {
      id: 1,
      title: "Machine Learning Applications in Healthcare",
      journal: "Journal of Medical AI",
      type: "Artículo",
      authors: 3,
      year: 2025,
      issn: "2234-5678",
      autoresList: ["Dr. García", "Dr. Martínez", "Dr. López"]
    },
    {
      id: 2,
      title: "Deep Learning for Medical Imaging",
      journal: "Medical Imaging Review", 
      type: "Capítulo de libro",
      authors: 2,
      year: 2025,
      issn: "1234-5678",
      autoresList: ["Dr. Rodríguez", "Dr. Fernández"]
    }
  ]);

  const handleVerDetalle = (publicacion) => {
    setPublicacionSeleccionada(publicacion);
  };

  const handleVolver = () => {
    setPublicacionSeleccionada(null);
  };

  // Si hay una publicación seleccionada, mostrar el detalle
  if (publicacionSeleccionada) {
    return (
      <DetallePublicacion 
        publicacion={publicacionSeleccionada} 
        onBack={handleVolver}
        onDelete={(publicacion) => {
          setPublicaciones(publicaciones.filter(p => p.id !== publicacion.id));
          setPublicacionSeleccionada(null);
        }}
        onUpdate={(updatedPublicacion) => {
          setPublicaciones(publicaciones.map(p => 
            p.id === updatedPublicacion.id ? updatedPublicacion : p
          ));
          setPublicacionSeleccionada(updatedPublicacion);
        }}
      />
    );
  }

  return (
    <>
      {/* Header con breadcrumb */}
      <div className="mb-6">
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Home className="h-4 w-4 mr-1" />
          <span className="mx-1">/</span>
          <BookOpen className="h-4 w-4 mr-1" />
          <span>Trabajos Publicados</span>
        </div>
        
        {/* Título con ícono de fondo */}
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-cyan-100 p-2.5 rounded-lg border border-cyan-200">
            <BookOpen className="h-5 w-5 text-cyan-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Trabajos Publicados</h1>
        </div>
        
        <p className="text-gray-600 text-sm ml-20">Gestión de publicaciones y artículos del grupo</p>
        
        {/* Buscador y botón */}
        <div className="flex items-center gap-4 mt-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar publicaciones..."
              className="pl-10 bg-white border-gray-200"
            />
          </div>
          
          <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            Nueva Publicación
          </Button>
        </div>
      </div>

      {/* Cards de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Publicaciones</p>
              <p className="text-2xl font-bold text-gray-900">{publicaciones.length}</p>
            </div>
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Este Año</p>
              <p className="text-2xl font-bold text-gray-900">{publicaciones.filter(p => p.year === 2025).length}</p>
            </div>
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-4 h-4 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Autores Únicos</p>
              <p className="text-2xl font-bold text-gray-900">5</p>
            </div>
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-4 h-4 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Lista de publicaciones */}
      <div className="space-y-4">
        {publicaciones.map((pub) => (
          <div key={pub.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{pub.title}</h3>
                <p className="text-gray-600 mb-3">{pub.journal}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {pub.authors} autores
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {pub.year}
                  </div>
                </div>

                {/* Badge del tipo */}
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {pub.type}
                </span>
              </div>

              {/* Botones de acción */}
              <div className="flex items-center gap-2 ml-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleVerDetalle(pub)}
                  className="flex items-center gap-2"
                >
                  <Eye className="h-4 w-4" />
                  Ver Detalles
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default TrabajosPublicados;