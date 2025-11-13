import { Plus, Search, Home, BookOpen, Users, Calendar, MoreVertical, FileText } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import ModalPublicacion from "./ModalPublicacion";
import DetallePublicacion from "./DetallePublicacion";
import ModalEditarPublicacion from "./ModalEditarPublicacion";
import ModalConfirmacionEliminacion from "./ModalConfirmacionEliminacion";
import MenuPublicacion from "./MenuPublicacion";
import { useState } from "react";

function TrabajosPublicados() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPublication, setSelectedPublication] = useState(null);
  const [publications, setPublications] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [publicationToEdit, setPublicationToEdit] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [publicationToDelete, setPublicationToDelete] = useState(null);

  const handleNewPublication = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitPublication = (formData) => {
    const newPublication = {
      id: publications.length + 1,
      title: formData.title,
      journal: formData.journal,
      type: formData.type,
      authors: formData.authors.split(",").length,
      authorsArray: formData.authors.split(","),
      issn: formData.issn,
      year: parseInt(formData.year),
    };
    
    // Agregar la nueva publicación y ordenar por año descendente
    const updatedPublications = [...publications, newPublication].sort((a, b) => b.year - a.year);
    setPublications(updatedPublications);
    setIsModalOpen(false);
    console.log("Publicación agregada:", newPublication);
  };

  const handleViewDetail = (pub) => {
    setSelectedPublication(pub);
  };

  const handleBackFromDetail = () => {
    setSelectedPublication(null);
  };

  const handleEditPublication = (pub) => {
    setPublicationToEdit(pub);
    setIsEditModalOpen(true);
  };

  const handleSubmitEditPublication = (formData) => {
    const updatedPublications = publications.map(pub => 
      pub.id === publicationToEdit.id 
        ? {
            ...pub,
            title: formData.title,
            journal: formData.journal,
            type: formData.type,
            authors: formData.authors.split(",").length,
            authorsArray: formData.authors.split(","),
            issn: formData.issn,
            year: parseInt(formData.year),
          }
        : pub
    ).sort((a, b) => b.year - a.year);

    setPublications(updatedPublications);
    setIsEditModalOpen(false);
    setPublicationToEdit(null);
    console.log("Publicación actualizada");
  };

  const handleDeletePublication = (pub) => {
    setPublicationToDelete(pub);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    const updatedPublications = publications.filter(pub => pub.id !== publicationToDelete.id);
    setPublications(updatedPublications);
    setIsDeleteModalOpen(false);
    setPublicationToDelete(null);
    console.log("Publicación eliminada");
  };

  // Si hay una publicación seleccionada, mostrar el detalle
  if (selectedPublication) {
    return <DetallePublicacion publication={selectedPublication} onBack={handleBackFromDetail} />;
  }

  return (
    <>
      <ModalPublicacion 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitPublication}
      />
      
      <ModalEditarPublicacion 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        publication={publicationToEdit}
        onSubmit={handleSubmitEditPublication}
      />

      <ModalConfirmacionEliminacion 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        publicationTitle={publicationToDelete?.title}
      />
      
      {/* Sección de título con breadcrumb */}
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
        
        {/* Barra de búsqueda y botón Nueva Publicación */}
        <div className="flex items-center gap-4 mt-6">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              type="text" 
              placeholder="Buscar publicaciones..." 
              className="pl-10 bg-white border-gray-300"
            />
          </div>
          
          <Button 
            onClick={handleNewPublication}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nueva Publicación
          </Button>
        </div>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Publicaciones */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium mb-2">Total Publicaciones</p>
              <p className="text-3xl font-bold text-gray-900 mb-2">0</p>
              <p className="text-xs text-gray-500">Total de todos los años</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Autores */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium mb-2">Autores</p>
              <p className="text-3xl font-bold text-gray-900 mb-2">0</p>
              <p className="text-xs text-gray-500">Colaboradores</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Este Año */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium mb-2">Este Año</p>
              <p className="text-3xl font-bold text-gray-900 mb-2">0</p>
              <p className="text-xs text-gray-500">2025</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Publicaciones */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Lista de Publicaciones <span className="text-gray-500 text-sm font-normal">{publications.length} publicaciones</span>
        </h2>
        
        <div className="space-y-3">
          {publications.map((pub) => (
            <div
              key={pub.id}
              className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="bg-blue-50 p-2 rounded mt-1">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{pub.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{pub.journal}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {pub.authors} autores
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {pub.year}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium whitespace-nowrap">
                    {pub.type}
                  </span>
                  <Button 
                    onClick={() => handleViewDetail(pub)}
                    variant="outline"
                    className="text-blue-600 border-blue-600 hover:bg-blue-50"
                  >
                    Ver Detalles
                  </Button>
                  <MenuPublicacion 
                    onEdit={() => handleEditPublication(pub)}
                    onDelete={() => handleDeletePublication(pub)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default TrabajosPublicados;