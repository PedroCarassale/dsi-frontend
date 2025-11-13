import { AlertCircle } from "lucide-react";
import { Button } from "../../../components/ui/button";

function ModalConfirmacionEliminacion({ isOpen, onClose, onConfirm, publicationTitle }) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
      }}
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        {/* Content */}
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Eliminar Publicación
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                ¿Estás seguro de que deseas eliminar la publicación "{publicationTitle}"? Esta acción no se puede deshacer.
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <Button
              onClick={onClose}
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </Button>
            <Button
              onClick={onConfirm}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Eliminar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalConfirmacionEliminacion;
