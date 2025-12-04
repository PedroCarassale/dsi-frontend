import { Button } from "../../../components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useThemeStyles } from "../../hooks/useThemeStyles";

function ModalConfirmacionEliminacion({ isOpen, onClose, onConfirm, patente }) {
  const { isDarkMode, getStyleClass } = useThemeStyles();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className={`rounded-lg max-w-md mx-4 w-full shadow-2xl transition-colors ${getStyleClass('card')}`}>
        {/* Header del modal */}
        <div className={`px-6 py-4 border-b transition-colors ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <h3 className={`text-lg font-semibold transition-colors ${getStyleClass('text.primary')}`}>Eliminar Patente</h3>
        </div>

        {/* Contenido del modal */}
        <div className="px-6 py-6">
          <div className="flex flex-col items-center">
            {/* Icono de advertencia */}
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors ${isDarkMode ? 'bg-yellow-900/30' : 'bg-yellow-100'}`}>
              <AlertTriangle className={`w-8 h-8 transition-colors ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
            </div>
            <p className={`text-center text-lg transition-colors ${getStyleClass('text.primary')}`}>
              ¿Seguro desea eliminar esta patente?
            </p>
            {patente && (
              <p className={`text-center text-sm mt-2 transition-colors ${getStyleClass('text.secondary')}`}>
                "{patente.title}"
              </p>
            )}
            <p className={`text-center text-sm mt-3 transition-colors ${getStyleClass('text.secondary')}`}>
              Esta acción no se puede deshacer. Se eliminará la patente permanentemente.
            </p>
          </div>
        </div>

        {/* Botones */}
        <div className="px-6 py-4 flex gap-3 justify-end">
          <Button 
            variant="outline" 
            onClick={onClose}
            className={`px-6 transition-colors ${getStyleClass('button.outline')}`}
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
