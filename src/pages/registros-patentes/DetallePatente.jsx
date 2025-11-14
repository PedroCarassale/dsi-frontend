import { ArrowLeft, Edit, Trash2 } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useState } from "react";
import ModalConfirmacionEliminacion from "./ModalConfirmacionEliminacion";
import ModalPatenteForm from "./ModalPatenteForm";

function DetallePatente({ patente, onBack, onDelete, onUpdate }) {
  if (!patente) return null;

  // Estados para los modales
  const [modalEliminar, setModalEliminar] = useState({ isOpen: false, patente: null });
  const [modalForm, setModalForm] = useState({ isOpen: false, patente: null, isEditing: false });

  const handleEdit = () => {
    setModalForm({ isOpen: true, patente, isEditing: true });
  };

  const handleDelete = () => {
    setModalEliminar({ isOpen: true, patente });
  };

  const confirmEliminar = (patente) => {
    onDelete && onDelete(patente);
    onBack();
  };

  const handleSavePatente = (formData) => {
    // Actualizar patente existente
    const updatedPatente = { ...patente, ...formData };
    onUpdate && onUpdate(updatedPatente);
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
          Volver a Registros y Patentes
        </button>
      </div>

      {/* Encabezado del documento */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="text-lg text-gray-500 mb-3">Patente</p>
          <h1 className="text-4xl font-bold text-gray-900 leading-tight">{patente.title}</h1>
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

      {/* Sección Descripción */}
      <div className="bg-white rounded-lg border border-gray-200 mb-8">
        <div className="p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Descripción</h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            Sistema innovador que utiliza inteligencia artificial para el diagnóstico automatizado de enfermedades mediante el análisis de imágenes 
            médicas. El sistema incorpora algoritmos de aprendizaje profundo que permiten identificar patrones complejos en radiografías, 
            tomografías y resonancias magnéticas con alta precisión.
          </p>
        </div>
      </div>

      {/* Información de la Patente */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-8 py-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
              <div className="w-4 h-4 bg-blue-600 rounded"></div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">Información de la Patente</h2>
          </div>
        </div>
        
        <div className="p-8">
          <div className="space-y-6">
            <div className="flex justify-between py-4 border-b border-gray-100">
              <span className="text-gray-500 text-lg">Código</span>
              <span className="text-gray-900 font-medium text-lg">{patente.code}</span>
            </div>
            <div className="flex justify-between py-4">
              <span className="text-gray-500 text-lg">Organismo</span>
              <span className="text-gray-900 font-medium text-lg">{patente.type}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de confirmación de eliminación */}
      <ModalConfirmacionEliminacion
        isOpen={modalEliminar.isOpen}
        onClose={() => setModalEliminar({ isOpen: false, patente: null })}
        onConfirm={confirmEliminar}
        patente={modalEliminar.patente}
      />

      {/* Modal de formulario de edición */}
      <ModalPatenteForm
        isOpen={modalForm.isOpen}
        onClose={() => setModalForm({ isOpen: false, patente: null, isEditing: false })}
        onSave={handleSavePatente}
        patente={modalForm.patente}
        isEditing={modalForm.isEditing}
      />
    </div>
  );
}

export default DetallePatente;