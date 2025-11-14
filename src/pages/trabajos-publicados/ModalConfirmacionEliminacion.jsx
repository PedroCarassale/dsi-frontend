import { AlertTriangle, X } from "lucide-react";
import { Button } from "../../../components/ui/button";

function ModalConfirmacionEliminacion({ isOpen, onClose, onConfirm, publicacionTitle }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md mx-4 w-full shadow-2xl border border-gray-200">
        {/* Header del modal */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">
              Eliminar Publicación
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Contenido del modal */}
        <div className="p-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-700 leading-relaxed">
                ¿Estás seguro de que deseas eliminar la publicación 
                <span className="font-semibold"> "{publicacionTitle}"</span>?
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Esta acción no se puede deshacer.
              </p>
            </div>
          </div>
        </div>

        {/* Botones */}
        <div className="px-6 py-4 border-t border-gray-200 flex gap-3 justify-end">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button 
            type="button"
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Eliminar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ModalConfirmacionEliminacion;