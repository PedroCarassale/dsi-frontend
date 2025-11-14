import { Button } from "../../../components/ui/button";
import { AlertTriangle } from "lucide-react";

function ModalConfirmacionEliminacion({ isOpen, onClose, onConfirm, patente }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md mx-4 w-full shadow-2xl border border-gray-200">
        {/* Header del modal */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Delete Patente</h3>
        </div>

        {/* Contenido del modal */}
        <div className="px-6 py-6">
          <div className="flex flex-col items-center">
            {/* Icono de peligro */}
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <p className="text-gray-700 text-center text-lg">
              ¿Seguro desea eliminar esta patente?
            </p>
          </div>
        </div>

        {/* Botones */}
        <div className="px-6 py-4 flex gap-3 justify-end">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="px-6"
          >
            Cancelar
          </Button>
          <Button 
            onClick={() => {
              onConfirm(patente);
              onClose();
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-6"
          >
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ModalConfirmacionEliminacion;