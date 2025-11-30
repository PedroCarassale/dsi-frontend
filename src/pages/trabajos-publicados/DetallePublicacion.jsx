import { ArrowLeft, Edit, Trash2, Users, FileText } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTrabajo } from "../../store/slices/trabajos/trabajosActions";
import { getTrabajos } from "../../store/slices/trabajos/trabajosSelector";
import ModalPublicacionForm from "./ModalPublicacionForm";
import ModalConfirmacionEliminacion from "./ModalConfirmacionEliminacion";

function DetallePublicacion({ publicacion, onBack, onUpdateSelected }) {
  const dispatch = useDispatch();
  const trabajos = useSelector(getTrabajos);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Actualizar la publicación seleccionada cuando cambie en Redux
  useEffect(() => {
    const updatedPublicacion = trabajos.find((t) => t.id === publicacion.id);
    if (updatedPublicacion && onUpdateSelected) {
      onUpdateSelected(updatedPublicacion);
    }
  }, [trabajos, publicacion.id, onUpdateSelected]);

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteTrabajo(publicacion.id));
    setShowDeleteModal(false);
    onBack();
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header con botón volver */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-4 py-3 rounded-md transition-colors font-medium text-lg"
        >
          <ArrowLeft className="h-6 w-6 mr-3" />
          Volver a Publicaciones
        </button>
      </div>

      {/* Encabezado del documento */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="text-lg text-gray-500 mb-3">
            {publicacion.type === "article"
              ? "Artículo"
              : publicacion.type === "book"
              ? "Libro"
              : publicacion.type === "book_chapter"
              ? "Capítulo de libro"
              : publicacion.type}
          </p>
          <h1 className="text-4xl font-bold text-gray-900 leading-tight">
            {publicacion.title}
          </h1>
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
            {publicacion.authors &&
              publicacion.authors.map((autor, index) => (
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
            <h2 className="text-2xl font-semibold text-gray-900">
              Información de Publicación
            </h2>
          </div>
        </div>

        <div className="p-8">
          <div className="space-y-6">
            {publicacion.journal && (
              <div className="flex justify-between py-4 border-b border-gray-100">
                <span className="text-gray-500 text-lg">
                  Revista/Conferencia
                </span>
                <span className="text-gray-900 font-medium text-lg">
                  {publicacion.journal}
                </span>
              </div>
            )}
            <div className="flex justify-between py-4 border-b border-gray-100">
              <span className="text-gray-500 text-lg">Tipo</span>
              <span className="text-gray-900 font-medium text-lg">
                {publicacion.type === "article"
                  ? "Artículo"
                  : publicacion.type === "book"
                  ? "Libro"
                  : publicacion.type === "book_chapter"
                  ? "Capítulo de libro"
                  : publicacion.type}
              </span>
            </div>
            <div className="flex justify-between py-4 border-b border-gray-100">
              <span className="text-gray-500 text-lg">ISSN</span>
              <span className="text-gray-900 font-medium text-lg">
                {publicacion.issn}
              </span>
            </div>
            <div className="flex justify-between py-4">
              <span className="text-gray-500 text-lg">Año</span>
              <span className="text-gray-900 font-medium text-lg">
                {publicacion.year}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Modales */}
      <ModalPublicacionForm
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        publicacion={publicacion}
        isEditing={true}
      />

      <ModalConfirmacionEliminacion
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        publicacionTitle={publicacion?.title}
      />
    </div>
  );
}

export default DetallePublicacion;
