import {
  ArrowLeft,
  Download,
  FileText,
  Users,
  Calendar,
  Shield,
  BookOpen,
  Trash2,
  AlertTriangle,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useThemeStyles } from "../../hooks/useThemeStyles";
import { deleteMemoria } from "../../store/slices/memorias/memoriasActions";
import apiClient from "../../services/api";

function DetalleMemoria({ memoria, onBack, onEdit }) {
  const dispatch = useDispatch();
  const { isDarkMode, getStyleClass } = useThemeStyles();

  const [isExporting, setIsExporting] = useState(false);
  const [exportType, setExportType] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleExportExcel = async () => {
    setExportType("Excel");
    setIsExporting(true);

    try {
      const response = await apiClient.get(`/memories/${memoria.id}/export`, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${memoria.name || `Memoria_${memoria.year}`}.xlsx`;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setIsExporting(false);
      setExportType("");
    } catch (error) {
      console.error("Error al exportar a Excel:", error);
      setIsExporting(false);
      setExportType("");
      alert("Error al exportar el archivo. Por favor, intenta de nuevo.");
    }
  };

  const handleExportPDF = async () => {
    setExportType("PDF");
    setIsExporting(true);

    try {
      const response = await apiClient.get(`/memories/${memoria.id}/export`, {
        params: { pdf: true },
        responseType: "blob",
      });

      const blob = new Blob([response.data], {
        type: "application/pdf",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${memoria.name || `Memoria_${memoria.year}`}.pdf`;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setIsExporting(false);
      setExportType("");
    } catch (error) {
      console.error("Error al exportar a PDF:", error);
      setIsExporting(false);
      setExportType("");
      alert("Error al exportar el archivo. Por favor, intenta de nuevo.");
    }
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteMemoria(memoria.id)).unwrap();
      onBack();
    } catch (error) {
      console.error("Error al eliminar la memoria:", error);
    }
  };

  const trabajosPublicados = memoria.works || [];
  const registrosPatentes = memoria.patents || [];

  if (!memoria) return null;

  return (
    <div className={`max-w-6xl mx-auto min-h-screen transition-colors duration-300 ${getStyleClass('background')}`}>
      {/* Header con botón volver y toggle dark mode */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className={`flex items-center px-3 py-2 rounded-md transition-colors duration-300 font-medium ${getStyleClass('button.home')}`}
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Volver a Memorias
        </button>

      </div>

      {/* Título principal */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-lg border transition-colors duration-300 ${getStyleClass('iconBg.blue')}`}>
            <FileText className={`h-8 w-8 transition-colors duration-300 ${getStyleClass('icons.blue')}`} />
          </div>
          <div>
            <h1 className={`text-3xl font-bold transition-colors duration-300 ${getStyleClass('text.primary')}`}>
              {memoria.name || `Memoria Anual ${memoria.year}`}
            </h1>
            <p className={`mt-1 transition-colors duration-300 ${getStyleClass('text.secondary')}`}>Resumen de actividades del año</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDeleteConfirm(true)}
            className={`transition-colors duration-300 ${getStyleClass('button.red')}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <span
            className={`px-3 py-1 text-sm font-medium rounded transition-colors duration-300 ${
              memoria.status === "En Progreso"
                ? getStyleClass('badge.orange')
                : getStyleClass('badge.blue')
            }`}
          >
            {memoria.status ||
              (memoria.year === new Date().getFullYear()
                ? "En Progreso"
                : "Completada")}
          </span>
        </div>
      </div>

      {/* Cards de información */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Año */}
        <div className={`rounded-lg border p-6 transition-colors duration-300 ${getStyleClass('card')}`}>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Calendar className={`h-8 w-8 transition-colors duration-300 ${getStyleClass('icons.blue')}`} />
            </div>
            <div className="ml-4">
              <p className={`text-sm font-medium transition-colors duration-300 ${getStyleClass('text.secondary')}`}>Año</p>
              <p className={`text-2xl font-semibold transition-colors duration-300 ${getStyleClass('text.primary')}`}>
                {memoria.year}
              </p>
            </div>
          </div>
        </div>

        {/* Publicaciones */}
        <div className={`rounded-lg border p-6 transition-colors duration-300 ${getStyleClass('card')}`}>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BookOpen className={`h-8 w-8 transition-colors duration-300 ${getStyleClass('icons.cyan')}`} />
            </div>
            <div className="ml-4">
              <p className={`text-sm font-medium transition-colors duration-300 ${getStyleClass('text.secondary')}`}>
                Trabajos Publicados
              </p>
              <p className={`text-2xl font-semibold transition-colors duration-300 ${getStyleClass('text.primary')}`}>
                {trabajosPublicados.length}
              </p>
            </div>
          </div>
        </div>

        {/* Patentes */}
        <div className={`rounded-lg border p-6 transition-colors duration-300 ${getStyleClass('card')}`}>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Shield className={`h-8 w-8 transition-colors duration-300 ${getStyleClass('icons.green')}`} />
            </div>
            <div className="ml-4">
              <p className={`text-sm font-medium transition-colors duration-300 ${getStyleClass('text.secondary')}`}>Patentes</p>
              <p className={`text-2xl font-semibold transition-colors duration-300 ${getStyleClass('text.primary')}`}>
                {registrosPatentes.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sección Trabajos Publicados */}
      <div className={`rounded-lg border mb-6 transition-colors duration-300 ${getStyleClass('card')}`}>
        <div className={`px-6 py-4 border-b transition-colors duration-300 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className={`h-5 w-5 transition-colors duration-300 ${getStyleClass('icons.cyan')}`} />
              <h3 className={`text-lg font-semibold transition-colors duration-300 ${getStyleClass('text.primary')}`}>
                Trabajos Publicados
              </h3>
            </div>
            <span className={`text-sm transition-colors duration-300 ${getStyleClass('text.secondary')}`}>
              {trabajosPublicados.length} trabajos
            </span>
          </div>
        </div>

        <div className="p-6">
          {trabajosPublicados.length === 0 ? (
            <div className={`text-center py-8 transition-colors duration-300 ${getStyleClass('text.secondary')}`}>
              <BookOpen className={`h-12 w-12 mx-auto mb-4 transition-colors duration-300 ${getStyleClass('icons.gray')}`} />
              <p className="text-lg font-medium mb-2">
                No hay trabajos publicados
              </p>
              <p className="text-sm">
                Esta memoria aún no tiene trabajos asociados.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {trabajosPublicados.map((trabajo) => (
                <div
                  key={trabajo.id}
                  className={`border rounded-lg p-4 transition-colors duration-300 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className={`font-semibold transition-colors duration-300 ${getStyleClass('text.primary')}`}>
                        {trabajo.title}
                      </h4>
                      <p className={`text-sm mt-1 transition-colors duration-300 ${getStyleClass('text.secondary')}`}>
                        {trabajo.authors?.join(", ") || "Sin autores"}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className={`px-2 py-1 rounded text-xs transition-colors duration-300 ${
                          isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {trabajo.type === "article"
                            ? "Artículo"
                            : trabajo.type === "book"
                            ? "Libro"
                            : trabajo.type === "book_chapter"
                            ? "Capítulo de libro"
                            : trabajo.type}
                        </span>
                        <span className={`text-sm transition-colors duration-300 ${getStyleClass('text.secondary')}`}>
                          {trabajo.journal}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Sección Registros y Patentes */}
      <div className={`rounded-lg border mb-8 transition-colors duration-300 ${getStyleClass('card')}`}>
        <div className={`px-6 py-4 border-b transition-colors duration-300 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className={`h-5 w-5 transition-colors duration-300 ${getStyleClass('icons.green')}`} />
              <h3 className={`text-lg font-semibold transition-colors duration-300 ${getStyleClass('text.primary')}`}>
                Registros y Patentes
              </h3>
            </div>
            <span className={`text-sm transition-colors duration-300 ${getStyleClass('text.secondary')}`}>
              {registrosPatentes.length} registros
            </span>
          </div>
        </div>

        <div className="p-6">
          {registrosPatentes.length === 0 ? (
            <div className={`text-center py-8 transition-colors duration-300 ${getStyleClass('text.secondary')}`}>
              <Shield className={`h-12 w-12 mx-auto mb-4 transition-colors duration-300 ${getStyleClass('icons.gray')}`} />
              <p className="text-lg font-medium mb-2">
                No hay patentes registradas
              </p>
              <p className="text-sm">
                Esta memoria aún no tiene patentes asociadas.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {registrosPatentes.map((registro) => (
                <div
                  key={registro.id}
                  className={`border rounded-lg p-4 transition-colors duration-300 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className={`font-semibold transition-colors duration-300 ${getStyleClass('text.primary')}`}>
                        {registro.title}
                      </h4>
                      <p className={`text-sm mt-1 transition-colors duration-300 ${getStyleClass('text.secondary')}`}>
                        {registro.code} •{" "}
                        {registro.organization || registro.type}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Botones de acción - mismo ancho que las listas */}
      <div className="grid grid-cols-3 gap-4">
        <Button
          className={`w-full transition-colors duration-300 ${getStyleClass('button.primary')}`}
          onClick={handleExportExcel}
          disabled={isExporting}
        >
          <Download className="h-4 w-4 mr-2" />
          Exportar a Excel
        </Button>
        <Button
          variant="outline"
          className={`w-full transition-colors duration-300 ${getStyleClass('button.outline')}`}
          onClick={handleExportPDF}
          disabled={isExporting}
        >
          <Download className="h-4 w-4 mr-2" />
          Exportar a PDF
        </Button>
        <Button
          variant="outline"
          className={`w-full transition-colors duration-300 ${getStyleClass('button.outline')}`}
          onClick={onEdit}
        >
          Editar Memoria
        </Button>
      </div>

      {/* Popup de exportación */}
      {isExporting && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className={`rounded-lg p-8 max-w-sm mx-4 text-center transition-colors duration-300 ${getStyleClass('modal')}`}>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h3 className={`text-lg font-semibold mb-2 transition-colors duration-300 ${getStyleClass('text.primary')}`}>
              Exportando a {exportType}...
            </h3>
            <p className={`transition-colors duration-300 ${getStyleClass('text.secondary')}`}>
              Por favor espera mientras se genera el archivo {exportType}.
            </p>
          </div>
        </div>
      )}

      {/* Modal de confirmación de eliminación */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div className={`rounded-lg max-w-md mx-4 w-full shadow-2xl transition-colors ${getStyleClass('card')}`}>
            {/* Header del modal */}
            <div className={`px-6 py-4 border-b transition-colors ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <h3 className={`text-lg font-semibold transition-colors ${getStyleClass('text.primary')}`}>
                Eliminar Memoria Anual
              </h3>
            </div>

            {/* Contenido del modal */}
            <div className="px-6 py-6">
              <div className="flex flex-col items-center">
                {/* Icono de advertencia */}
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors ${isDarkMode ? 'bg-yellow-900/30' : 'bg-yellow-100'}`}>
                  <AlertTriangle className={`w-8 h-8 transition-colors ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
                </div>
                <p className={`text-center text-lg transition-colors ${getStyleClass('text.primary')}`}>
                  ¿Seguro desea eliminar esta memoria?
                </p>
                {memoria && (
                  <p className={`text-center text-sm mt-2 transition-colors ${getStyleClass('text.secondary')}`}>
                    "{memoria.name}"
                  </p>
                )}
                <p className={`text-center text-sm mt-3 transition-colors ${getStyleClass('text.secondary')}`}>
                  Esta acción no se puede deshacer. Se eliminará la memoria permanentemente.
                </p>
              </div>
            </div>

            {/* Botones */}
            <div className="px-6 py-4 flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
                className={`px-6 transition-colors ${getStyleClass('button.outline')}`}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-6"
              >
                Eliminar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetalleMemoria;



