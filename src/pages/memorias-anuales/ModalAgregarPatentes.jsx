import { X, Search, Check } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getPatentes } from "../../store/slices/patentes/petentesSelector";

function ModalAgregarPatentes({ isOpen, onClose, onAdd, patentesYaAgregadas = [] }) {
  const todasLasPatentes = useSelector(getPatentes);
  const [searchTerm, setSearchTerm] = useState("");
  const [seleccionados, setSeleccionados] = useState([]);

  // Filtrar patentes que no están ya agregadas
  const patentesDisponibles = todasLasPatentes.filter(
    (patente) => !patentesYaAgregadas.some((p) => p.id === patente.id)
  );

  // Filtrar patentes según búsqueda
  const patentesFiltradas = patentesDisponibles.filter((patente) =>
    patente.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patente.code?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Resetear seleccionados al abrir/cerrar
  useEffect(() => {
    if (isOpen) {
      setSeleccionados([]);
      setSearchTerm("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleSeleccion = (patente) => {
    setSeleccionados((prev) => {
      const existe = prev.find((p) => p.id === patente.id);
      if (existe) {
        return prev.filter((p) => p.id !== patente.id);
      } else {
        return [...prev, patente];
      }
    });
  };

  const handleAgregar = () => {
    if (seleccionados.length > 0) {
      onAdd(seleccionados);
      onClose();
    }
  };

  const isSeleccionado = (patenteId) => {
    return seleccionados.some((p) => p.id === patenteId);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-3xl mx-4 w-full max-h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">Agregar Patente</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Búsqueda */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar por título o código..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Patentes seleccionadas */}
        {seleccionados.length > 0 && (
          <div className="px-6 py-3 bg-green-50 border-b border-green-100 transition-all duration-300">
            <p className="text-sm font-medium text-green-900 mb-2">
              {seleccionados.length} patente{seleccionados.length !== 1 ? 's' : ''} seleccionada{seleccionados.length !== 1 ? 's' : ''}
            </p>
            <div className="flex flex-wrap gap-2">
              {seleccionados.map((patente) => (
                <div
                  key={patente.id}
                  className="bg-white border border-green-200 rounded-md px-3 py-1 flex items-center gap-2 text-sm"
                >
                  <span className="text-gray-700 truncate max-w-xs">{patente.title}</span>
                  <button
                    onClick={() => toggleSeleccion(patente)}
                    className="text-green-600 hover:text-green-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lista de patentes */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {patentesFiltradas.length === 0 ? (
            <div className="text-center py-12 text-gray-500 transition-all duration-300">
              <p className="text-lg font-medium mb-2">No se encontraron patentes</p>
              <p className="text-sm">
                {searchTerm
                  ? "Intenta con otros términos de búsqueda"
                  : "No hay patentes disponibles para agregar"}
              </p>
            </div>
          ) : (
            <div className="space-y-2 transition-all duration-300">
              {patentesFiltradas.map((patente) => (
                <div
                  key={patente.id}
                  onClick={() => toggleSeleccion(patente)}
                  className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                    isSeleccionado(patente.id)
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          isSeleccionado(patente.id)
                            ? "bg-green-600 border-green-600"
                            : "border-gray-300"
                        }`}
                      >
                        {isSeleccionado(patente.id) && (
                          <Check className="h-3 w-3 text-white" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 mb-1">{patente.title}</h4>
                      <p className="text-sm text-gray-600 mb-1">
                        Código: {patente.code}
                      </p>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                          {patente.organization || patente.type}
                        </span>
                        <span className="text-gray-500">• {patente.year}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer con botones */}
        <div className="px-6 py-4 border-t border-gray-200 flex gap-3 justify-end">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            onClick={handleAgregar}
            disabled={seleccionados.length === 0}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Agregar {seleccionados.length > 0 && `(${seleccionados.length})`}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ModalAgregarPatentes;

