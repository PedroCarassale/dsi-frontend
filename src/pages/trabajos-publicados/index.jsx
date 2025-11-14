import { Plus, Search, Home, BookOpen, FileText, Users, Calendar, Eye, ArrowLeft, Edit, Trash2 } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { useState } from "react";
import ModalPublicacionForm from "./ModalPublicacionForm";
import ModalConfirmacionEliminacion from "./ModalConfirmacionEliminacion";

function TrabajosPublicados() {
  // Estados
  const [publicacionSeleccionada, setPublicacionSeleccionada] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
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

  // Funciones de manejo de modales
  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const handleSavePublicacion = (formData) => {
    setPublicaciones(prev => prev.map(pub => 
      pub.id === publicacionSeleccionada.id 
        ? { 
            ...pub, 
            ...formData,
            id: publicacionSeleccionada.id 
          }
        : pub
    ));
    
    // Actualizar también la publicación seleccionada
    setPublicacionSeleccionada(prev => ({ 
      ...prev, 
      ...formData,
      id: prev.id 
    }));
  };

  const handleConfirmDelete = () => {
    setPublicaciones(prev => prev.filter(pub => pub.id !== publicacionSeleccionada.id));
    setPublicacionSeleccionada(null);
    setShowDeleteModal(false);
  };

  // Si hay una publicación seleccionada, mostrar el detalle
  if (publicacionSeleccionada) {
    return (
      <div className="max-w-5xl mx-auto">
        {/* Header con botón volver */}
        <div className="mb-8">
          <button
            onClick={handleVolver}
            className="flex items-center text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-4 py-3 rounded-md transition-colors font-medium text-lg"
          >
            <ArrowLeft className="h-6 w-6 mr-3" />
            Volver a Publicaciones
          </button>
        </div>

        {/* Encabezado del documento */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-lg text-gray-500 mb-3">{publicacionSeleccionada.type}</p>
            <h1 className="text-4xl font-bold text-gray-900 leading-tight">{publicacionSeleccionada.title}</h1>
          </div>
          
          {/* Botones de acción en el header */}
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="default"
              onClick={handleEdit}
              className="flex items-center px-6 py-3 text-base"
            >
              <Edit className="h-5 w-5 mr-2" />
              Editar
            </Button>
            <Button 
              variant="outline" 
              size="default"
              onClick={handleDelete}
              className="flex items-center text-red-600 border-red-300 hover:bg-red-50 px-4 py-3"
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Sección Autores */}
        <div className="bg-white rounded-lg border border-gray-200 mb-8">
          <div className="px-8 py-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Autores</h2>
            </div>
          </div>
          
          <div className="p-8">
            <div className="space-y-4">
              {publicacionSeleccionada.autoresList.map((autor, index) => (
                <div key={index} className="text-gray-900 font-medium text-lg">
                  {autor}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Información de la Publicación */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-8 py-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                <FileText className="w-4 h-4 text-blue-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Información de Publicación</h2>
            </div>
          </div>
          
          <div className="p-8">
            <div className="space-y-6">
              <div className="flex justify-between py-4 border-b border-gray-100">
                <span className="text-gray-500 text-lg">Revista/Conferencia</span>
                <span className="text-gray-900 font-medium text-lg">{publicacionSeleccionada.journal}</span>
              </div>
              <div className="flex justify-between py-4 border-b border-gray-100">
                <span className="text-gray-500 text-lg">Tipo</span>
                <span className="text-gray-900 font-medium text-lg">{publicacionSeleccionada.type}</span>
              </div>
              <div className="flex justify-between py-4 border-b border-gray-100">
                <span className="text-gray-500 text-lg">ISSN</span>
                <span className="text-gray-900 font-medium text-lg">{publicacionSeleccionada.issn}</span>
              </div>
              <div className="flex justify-between py-4">
                <span className="text-gray-500 text-lg">Año</span>
                <span className="text-gray-900 font-medium text-lg">{publicacionSeleccionada.year}</span>
              </div>
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

      {/* Modales */}
      <ModalPublicacionForm
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleSavePublicacion}
        publicacion={publicacionSeleccionada}
        isEditing={true}
      />

      <ModalConfirmacionEliminacion
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        publicacionTitle={publicacionSeleccionada?.title}
      />
    </>
  );
}

export default TrabajosPublicados;