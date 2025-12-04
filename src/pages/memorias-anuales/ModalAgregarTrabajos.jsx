import { X, Search, Check } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getTrabajos } from "../../store/slices/trabajos/trabajosSelector";

function ModalAgregarTrabajos({ isOpen, onClose, onAdd, trabajosYaAgregados = [] }) {
  const todosLosTrabajos = useSelector(getTrabajos);
  const [searchTerm, setSearchTerm] = useState("");
  const [seleccionados, setSeleccionados] = useState([]);

  // Filtrar trabajos que no están ya agregados
  const trabajosDisponibles = todosLosTrabajos.filter(
    (trabajo) => !trabajosYaAgregados.some((t) => t.id === trabajo.id)
  );

  // Filtrar trabajos según búsqueda
  const trabajosFiltrados = trabajosDisponibles.filter((trabajo) =>
    trabajo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trabajo.authors?.some(author => author.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Resetear seleccionados al abrir/cerrar
  useEffect(() => {
    if (isOpen) {
      setSeleccionados([]);
      setSearchTerm("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleSeleccion = (trabajo) => {
    setSeleccionados((prev) => {
      const existe = prev.find((t) => t.id === trabajo.id);
      if (existe) {
        return prev.filter((t) => t.id !== trabajo.id);
      } else {
        return [...prev, trabajo];
      }
    });
  };

  const handleAgregar = () => {
    if (seleccionados.length > 0) {
      onAdd(seleccionados);
      onClose();
    }
  };

  const isSeleccionado = (trabajoId) => {
    return seleccionados.some((t) => t.id === trabajoId);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-3xl mx-4 w-full max-h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">Agregar Trabajo</h3>
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
              placeholder="Buscar por título o autor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Trabajos seleccionados */}
        {seleccionados.length > 0 && (
          <div className="px-6 py-3 bg-blue-50 border-b border-blue-100 transition-all duration-300">
            <p className="text-sm font-medium text-blue-900 mb-2">
              {seleccionados.length} trabajo{seleccionados.length !== 1 ? 's' : ''} seleccionado{seleccionados.length !== 1 ? 's' : ''}
            </p>
            <div className="flex flex-wrap gap-2">
              {seleccionados.map((trabajo) => (
                <div
                  key={trabajo.id}
                  className="bg-white border border-blue-200 rounded-md px-3 py-1 flex items-center gap-2 text-sm"
                >
                  <span className="text-gray-700 truncate max-w-xs">{trabajo.title}</span>
                  <button
                    onClick={() => toggleSeleccion(trabajo)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lista de trabajos */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {trabajosFiltrados.length === 0 ? (
            <div className="text-center py-12 text-gray-500 transition-all duration-300">
              <p className="text-lg font-medium mb-2">No se encontraron trabajos</p>
              <p className="text-sm">
                {searchTerm
                  ? "Intenta con otros términos de búsqueda"
                  : "No hay trabajos disponibles para agregar"}
              </p>
            </div>
          ) : (
            <div className="space-y-2 transition-all duration-300">
              {trabajosFiltrados.map((trabajo) => (
                <div
                  key={trabajo.id}
                  onClick={() => toggleSeleccion(trabajo)}
                  className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                    isSeleccionado(trabajo.id)
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          isSeleccionado(trabajo.id)
                            ? "bg-blue-600 border-blue-600"
                            : "border-gray-300"
                        }`}
                      >
                        {isSeleccionado(trabajo.id) && (
                          <Check className="h-3 w-3 text-white" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 mb-1">{trabajo.title}</h4>
                      <p className="text-sm text-gray-600 mb-1">
                        {trabajo.authors?.join(", ") || "Sin autores"}
                      </p>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                          {trabajo.type === 'article' ? 'Artículo' : trabajo.type === 'book' ? 'Libro' : trabajo.type === 'book_chapter' ? 'Capítulo' : trabajo.type}
                        </span>
                        {trabajo.journal && (
                          <span className="text-gray-500">{trabajo.journal}</span>
                        )}
                        <span className="text-gray-500">• {trabajo.year}</span>
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

export default ModalAgregarTrabajos;




