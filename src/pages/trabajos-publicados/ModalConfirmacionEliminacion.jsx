import { AlertTriangle } from "lucide-react";
import { Button } from "../../../components/ui/button";

function ModalConfirmacionEliminacion({
  isOpen,
  onClose,
  onConfirm,
  publicacion,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md mx-4 w-full shadow-2xl border border-gray-200">
        {/* Header del modal */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Eliminar Trabajo Publicado
          </h3>
        </div>

        {/* Contenido del modal */}
        <div className="px-6 py-6">
          <div className="flex flex-col items-center">
            {/* Icono de advertencia amarillo */}
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="w-8 h-8 text-yellow-600" />
            </div>
            <p className="text-gray-700 text-center text-lg">
              ¿Seguro desea eliminar esta publicación?
            </p>
            {publicacion && (
              <p className="text-gray-500 text-center text-sm mt-2">
                "{publicacion.title}"
              </p>
            )}
          </div>
        </div>

        {/* Botones */}
        <div className="px-6 py-4 flex gap-3 justify-end">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={() => onConfirm(publicacion)}
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
