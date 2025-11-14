import { Plus, Search, Home, BookOpen, FileText, Users, Calendar, Eye } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { useState } from "react";

function TrabajosPublicados() {
  // Estados
  const [publicacionSeleccionada, setPublicacionSeleccionada] = useState(null);
  
  // Datos mock
  const [publicaciones] = useState([
    {
      id: 1,
      title: "Machine Learning Applications in Healthcare",
      journal: "Journal of Medical AI",
      type: "Libro",
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
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header con botón volver */}
          <div className="flex items-center gap-3 mb-6">
            <Button
              variant="outline"
              onClick={handleVolver}
              className="flex items-center gap-2"
            >
              ← Volver a Publicaciones
            </Button>
          </div>

          {/* Información del detalle */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="mb-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mb-4">
                {publicacionSeleccionada.type}
              </span>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              {publicacionSeleccionada.title}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Autores */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-blue-100 p-2 rounded">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold">Autores</h3>
                </div>
                <div className="space-y-2">
                  {publicacionSeleccionada.autoresList.map((autor, index) => (
                    <div key={index} className="text-gray-700">
                      {autor}
                    </div>
                  ))}
                </div>
              </div>

              {/* Información de Publicación */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-blue-100 p-2 rounded">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold">Información de Publicación</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-500">Revista/Conferencia</span>
                    <div className="font-medium text-gray-900">{publicacionSeleccionada.journal}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Tipo</span>
                    <div className="font-medium text-gray-900">{publicacionSeleccionada.type}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">ISSN</span>
                    <div className="font-medium text-gray-900">{publicacionSeleccionada.issn}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Año</span>
                    <div className="font-medium text-gray-900">{publicacionSeleccionada.year}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
              <Button className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Editar
              </Button>
              <Button variant="outline" className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                Eliminar
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header con breadcrumb */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-gray-100 p-2.5 rounded-lg border border-gray-200">
            <Home className="h-5 w-5 text-gray-600" />
          </div>
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
              <p className="text-3xl font-bold text-gray-900">47</p>
              <p className="text-sm text-gray-500">+12 este año</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-full">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Autores</p>
              <p className="text-3xl font-bold text-gray-900">15</p>
              <p className="text-sm text-gray-500">Colaboradores</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Este Año</p>
              <p className="text-3xl font-bold text-gray-900">12</p>
              <p className="text-sm text-gray-500">2025</p>
            </div>
            <div className="bg-green-50 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Título de sección */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Lista de Publicaciones</h3>
        <span className="text-sm text-gray-500">2 publicaciones</span>
      </div>

      {/* Lista de Publicaciones - Cards individuales */}
      <div className="space-y-4">
        {publicaciones.map((pub) => (
          <div key={pub.id} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <div className="flex-shrink-0">
                  <div className="bg-blue-50 p-2 rounded-lg">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-medium text-gray-900 mb-1">{pub.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{pub.journal}</p>
                  
                  {/* Información con iconos */}
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
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
              </div>
              
              <div className="flex items-center gap-2">
                {/* Botón Ver Detalles */}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-gray-600 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                  onClick={() => handleVerDetalle(pub)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Ver Detalles
                </Button>
                
                {/* Botón de más opciones */}
                <button className="text-gray-400 hover:text-gray-600 p-1 rounded">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default TrabajosPublicados;