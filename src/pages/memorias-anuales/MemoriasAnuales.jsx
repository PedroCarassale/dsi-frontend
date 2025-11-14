import { Plus, Search, Home, FolderOpen, FileText, CheckCircle, Clock, TrendingUp, Eye, Users, Calendar } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { useState } from "react";
import DetalleMemoria from "./DetalleMemoria";
import EditarMemoria from "./EditarMemoria";
import NuevaMemoria from "./NuevaMemoria";

function MemoriasAnuales() {
  // Datos mock según el Figma
  const [memorias, setMemorias] = useState([
    {
      id: 1,
      year: 2025,
      title: "Memoria Anual 2025",
      status: "En Progreso",
      lastUpdate: "Hace 2 días",
      publications: 12,
      patents: 2,
      progress: 68
    },
    {
      id: 2,
      year: 2024,
      title: "Memoria Anual 2024",
      status: "Completada", 
      lastUpdate: "Enero 2025",
      publications: 15,
      patents: 3,
      progress: 100
    },
    {
      id: 3,
      year: 2023,
      title: "Memoria Anual 2023",
      status: "Completada",
      lastUpdate: "Enero 2024",
      publications: 10,
      patents: 1,
      progress: 100
    },
    {
      id: 4,
      year: 2022,
      title: "Memoria Anual 2022",
      status: "Completada",
      lastUpdate: "Enero 2023",
      publications: 8,
      patents: 2,
      progress: 100
    }
  ]);

  // Estados para navegación
  const [selectedMemoria, setSelectedMemoria] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // Función para manejar ver detalle
  const handleVerDetalle = (memoria) => {
    setSelectedMemoria(memoria);
    setIsEditing(false);
  };

  // Función para manejar editar memoria
  const handleEditarMemoria = () => {
    setIsEditing(true);
  };

  // Función para manejar nueva memoria
  const handleNuevaMemoria = () => {
    setIsCreating(true);
  };

  // Función para volver a la lista
  const handleVolver = () => {
    setSelectedMemoria(null);
    setIsEditing(false);
    setIsCreating(false);
  };

  // Función para guardar cambios
  const handleGuardarCambios = () => {
    setIsEditing(false);
    // Aquí se conectaría con el backend
  };

  // Función para guardar nueva memoria
  const handleGuardarNuevaMemoria = (nuevaMemoria) => {
    // Aquí se agregaría la nueva memoria a la lista
    // Por ahora solo volvemos a la lista
    setIsCreating(false);
  };

  // Si está creando una nueva memoria
  if (isCreating) {
    return (
      <NuevaMemoria 
        onBack={handleVolver} 
        onSave={handleGuardarNuevaMemoria} 
      />
    );
  }

  // Si hay una memoria seleccionada y está en modo edición
  if (selectedMemoria && isEditing) {
    return (
      <EditarMemoria 
        memoria={selectedMemoria} 
        onBack={handleVolver} 
        onSave={handleGuardarCambios} 
      />
    );
  }

  // Si hay una memoria seleccionada, mostrar el detalle
  if (selectedMemoria) {
    return (
      <DetalleMemoria 
        memoria={selectedMemoria} 
        onBack={handleVolver} 
        onEdit={handleEditarMemoria}
      />
    );
  }

  // Estadísticas calculadas
  const totalMemorias = memorias.length;
  const completadas = memorias.filter(m => m.status === "Completada").length;
  const enProgreso = memorias.filter(m => m.status === "En Progreso").length;
  const tasaFinalizacion = Math.round((completadas / totalMemorias) * 100);

  return (
    <>
      {/* Sección de título con breadcrumb */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-gray-100 p-2.5 rounded-lg border border-gray-200">
            <Home className="h-5 w-5 text-gray-600" />
          </div>
          <div className="bg-cyan-100 p-2.5 rounded-lg border border-cyan-200">
            <FolderOpen className="h-5 w-5 text-cyan-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Memoria Anual</h1>
        </div>
        
        <p className="text-gray-600 text-sm ml-20">Gestión de memorias anuales del grupo</p>
        
        {/* Barra de búsqueda y botón Nueva Memoria */}
        <div className="flex items-center gap-4 mt-6">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              type="text" 
              placeholder="Buscar por año..." 
              className="pl-10 bg-white border-gray-300"
            />
          </div>
          
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={handleNuevaMemoria}
          >
            <Plus className="h-4 w-4 mr-2" />
            Nueva Memoria
          </Button>
        </div>
      </div>

      {/* Cards de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Memorias */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Memorias</p>
              <p className="text-2xl font-semibold text-gray-900">{totalMemorias}</p>
            </div>
          </div>
        </div>

        {/* Completadas */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Completadas</p>
              <p className="text-2xl font-semibold text-gray-900">{completadas}</p>
            </div>
          </div>
        </div>

        {/* En Progreso */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">En Progreso</p>
              <p className="text-2xl font-semibold text-gray-900">{enProgreso}</p>
            </div>
          </div>
        </div>

        {/* Tasa de Finalización */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Tasa de Finalización</p>
              <p className="text-2xl font-semibold text-gray-900">{tasaFinalizacion}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Título de sección */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Memorias Anuales</h3>
      </div>

      {/* Lista de Memorias Anuales - Cards individuales */}
      <div className="space-y-4">
        {memorias.map((memoria) => (
          <div key={memoria.id} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="bg-blue-100 p-3 rounded-lg border border-blue-200">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h4 className="text-lg font-semibold text-gray-900">{memoria.title}</h4>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded ${
                      memoria.status === 'En Progreso' 
                        ? 'bg-orange-500 text-white' 
                        : 'bg-blue-500 text-white'
                    }`}>
                      {memoria.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Última actualización: {memoria.lastUpdate}</p>
                  
                  {/* Información adicional con iconos */}
                  <div className="flex items-center gap-6 mt-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <span>{memoria.publications} publicaciones</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span>{memoria.patents} patentes</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>Año {memoria.year}</span>
                    </div>
                  </div>

                  {/* Barra de progreso - más larga */}
                  {memoria.status === 'En Progreso' && (
                    <div className="mt-4 pr-32">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-600">Progreso</span>
                        <span className="font-medium text-gray-900">{memoria.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                          style={{width: `${memoria.progress}%`}}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Botón Ver Detalles */}
              <Button 
                variant="outline" 
                size="sm" 
                className="text-gray-600 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                onClick={() => handleVerDetalle(memoria)}
              >
                <Eye className="h-4 w-4 mr-2" />
                Ver Detalles
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default MemoriasAnuales;