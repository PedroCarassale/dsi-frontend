import { X } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useThemeStyles } from "../../hooks/useThemeStyles";
import {
  createTrabajo,
  updateTrabajo,
  getTrabajos,
} from "../../store/slices/trabajos/trabajosActions";
import { getTrabajosLoading } from "../../store/slices/trabajos/trabajosSelector";

function ModalPublicacionForm({
  isOpen,
  onClose,
  publicacion,
  isEditing = false,
}) {
  const dispatch = useDispatch();
  const loading = useSelector(getTrabajosLoading);
  const { isDarkMode, getStyleClass } = useThemeStyles();

  const [formData, setFormData] = useState({
    title: publicacion?.title || "",
    journal: publicacion?.journal || "",
    type: publicacion?.type || "article",
    issn: publicacion?.issn || "",
    year: publicacion?.year || new Date().getFullYear(),
    autoresList: publicacion?.authors?.join(", ") || "",
  });

  // Actualizar formData cuando cambie la publicación
  useEffect(() => {
    if (publicacion) {
      setFormData({
        title: publicacion.title || "",
        journal: publicacion.journal || "",
        type: publicacion.type || "article",
        issn: publicacion.issn || "",
        year: publicacion.year || new Date().getFullYear(),
        autoresList: publicacion.authors?.join(", ") || "",
      });
    } else {
      setFormData({
        title: "",
        journal: "",
        type: "article",
        issn: "",
        year: new Date().getFullYear(),
        autoresList: "",
      });
    }
  }, [publicacion, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Procesar los autores y preparar los datos para la API
    const processedData = {
      title: formData.title,
      journal: formData.journal,
      type: formData.type,
      issn: formData.issn,
      year: formData.year,
      authors: formData.autoresList
        .split(",")
        .map((autor) => autor.trim())
        .filter((autor) => autor),
    };

    try {
      if (isEditing && publicacion) {
        await dispatch(
          updateTrabajo({ id: publicacion.id, ...processedData })
        ).unwrap();
      } else {
        await dispatch(createTrabajo(processedData)).unwrap();
      }

      // Recargar los trabajos después de crear o actualizar
      await dispatch(getTrabajos());

      onClose();
    } catch (error) {
      console.error("Error al guardar el trabajo:", error);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className={`rounded-lg max-w-2xl mx-4 w-full max-h-[90vh] overflow-y-auto shadow-2xl transition-colors ${getStyleClass('card')}`}>
        {/* Header del modal */}
        <div className={`px-6 py-4 border-b transition-colors ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <h3 className={`text-xl font-semibold transition-colors ${getStyleClass('text.primary')}`}>
              {isEditing
                ? "Editar Trabajo Publicado"
                : "Nuevo Trabajo Publicado"}
            </h3>
            <button
              onClick={onClose}
              className={`transition-colors ${getStyleClass('button.menuEdit')}`}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Título */}
            <div>
              <label className={`block text-sm font-medium mb-2 transition-colors ${getStyleClass('text.secondary')}`}>
                Título <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Título de la publicación"
                required
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px] resize-y transition-colors ${getStyleClass('input')}`}
                rows={3}
              />
            </div>

            {/* Autores */}
            <div>
              <label className={`block text-sm font-medium mb-2 transition-colors ${getStyleClass('text.secondary')}`}>
                Autores <span className="text-red-500">*</span>
              </label>
              <Input
                value={formData.autoresList}
                onChange={(e) =>
                  handleInputChange("autoresList", e.target.value)
                }
                placeholder="Ej: García, J., Pérez, M., López, A."
                required
              />
            </div>

            {/* Tipo e ISSN */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 transition-colors ${getStyleClass('text.secondary')}`}>
                  Tipo <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => handleInputChange("type", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${getStyleClass('input')}`}
                  required
                >
                  <option value="article">Artículo</option>
                  <option value="book_chapter">Capítulo de libro</option>
                  <option value="book">Libro</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 transition-colors ${getStyleClass('text.secondary')}`}>
                  ISSN <span className="text-red-500">*</span>
                </label>
                <Input
                  value={formData.issn}
                  onChange={(e) => handleInputChange("issn", e.target.value)}
                  type="number"
                  placeholder="1234-5678"
                  required
                />
              </div>
            </div>

            {/* Revista/Conferencia */}
            <div>
              <label className={`block text-sm font-medium mb-2 transition-colors ${getStyleClass('text.secondary')}`}>
                Revista/Conferencia
              </label>
              <Input
                value={formData.journal}
                onChange={(e) => handleInputChange("journal", e.target.value)}
                placeholder="Nombre de la revista o conferencia"
              />
            </div>

            {/* Año */}
            <div>
              <label className={`block text-sm font-medium mb-2 transition-colors ${getStyleClass('text.secondary')}`}>
                Año <span className="text-red-500">*</span>
              </label>
              <Input
                type="number"
                value={formData.year}
                onChange={(e) =>
                  handleInputChange("year", parseInt(e.target.value))
                }
                min="1900"
                max="2100"
                required
              />
            </div>
          </div>

          {/* Botones */}
          <div className={`flex gap-3 justify-end pt-6 mt-6 border-t transition-colors ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <Button type="button" variant="outline" onClick={onClose} className={`transition-colors ${getStyleClass('button.outline')}`}>
              Cancelar
            </Button>
            <Button
              type="submit"
              className={`transition-colors ${getStyleClass('button.primary')}`}
              disabled={loading}
            >
              {loading
                ? "Guardando..."
                : isEditing
                ? "Actualizar Trabajo Publicado"
                : "Guardar Trabajo Publicado"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalPublicacionForm;

