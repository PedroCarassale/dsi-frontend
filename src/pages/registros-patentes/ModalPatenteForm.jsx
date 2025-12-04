import { X } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useThemeStyles } from "../../hooks/useThemeStyles";
import {
  createPatente,
  updatePatente,
  getPatentes,
} from "../../store/slices/patentes/patentesActions";
import { getPatentesLoading } from "../../store/slices/patentes/petentesSelector";

function ModalPatenteForm({ isOpen, onClose, patente, isEditing = false }) {
  const dispatch = useDispatch();
  const loading = useSelector(getPatentesLoading);
  const { isDarkMode, getStyleClass } = useThemeStyles();

  const [formData, setFormData] = useState({
    title: patente?.title || "",
    code: patente?.code || "",
    description: patente?.description || "",
    organization: patente?.organization || "",
    property: patente?.property || "Industrial",
    year: patente?.year || new Date().getFullYear(),
  });

  // Actualizar formData cuando cambie la patente
  useEffect(() => {
    if (patente) {
      setFormData({
        title: patente.title || "",
        code: patente.code || "",
        description: patente.description || "",
        organization: patente.organization || "",
        property: patente.property || "Industrial",
        year: patente.year || new Date().getFullYear(),
      });
    } else {
      setFormData({
        title: "",
        code: "",
        description: "",
        organization: "",
        property: "Industrial",
        year: new Date().getFullYear(),
      });
    }
  }, [patente, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing && patente) {
        await dispatch(updatePatente({ id: patente.id, ...formData })).unwrap();
      } else {
        await dispatch(createPatente(formData)).unwrap();
      }

      // Recargar las patentes después de crear o actualizar
      await dispatch(getPatentes());

      onClose();
    } catch (error) {
      console.error("Error al guardar la patente:", error);
      // Aquí podrías mostrar un mensaje de error al usuario
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
              {isEditing ? "Editar Registro/Patente" : "Nuevo Registro/Patente"}
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
                placeholder="Año de la patente o registro"
                required
              />
            </div>

            {/* Título */}
            <div>
              <label className={`block text-sm font-medium mb-2 transition-colors ${getStyleClass('text.secondary')}`}>
                Título <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Título de la patente o registro"
                required
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px] resize-y transition-colors ${getStyleClass('input')}`}
                rows={3}
              />
            </div>

            {/* Código */}
            <div>
              <label className={`block text-sm font-medium mb-2 transition-colors ${getStyleClass('text.secondary')}`}>
                Código <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                value={formData.code}
                onChange={(e) => handleInputChange("code", e.target.value)}
                placeholder="Código de la patente o registro"
                className="w-full"
                required
              />
            </div>

            {/* Descripción */}
            <div>
              <label className={`block text-sm font-medium mb-2 transition-colors ${getStyleClass('text.secondary')}`}>
                Descripción <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Descripción sobre la patente"
                className={`w-full min-h-32 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical transition-colors ${getStyleClass('input')}`}
                required
              />
            </div>

            {/* Tipo de Propiedad */}
            <div>
              <label className={`block text-sm font-medium mb-2 transition-colors ${getStyleClass('text.secondary')}`}>
                Tipo de Propiedad <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.property}
                onChange={(e) => handleInputChange("property", e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${getStyleClass('input')}`}
                required
              >
                <option value="Industrial">Industrial</option>
                <option value="Intelectual">Intelectual</option>
              </select>
            </div>

            {/* Organismo Competente */}
            <div>
              <label className={`block text-sm font-medium mb-2 transition-colors ${getStyleClass('text.secondary')}`}>
                Organismo Competente <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.organization}
                onChange={(e) =>
                  handleInputChange("organization", e.target.value)
                }
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${getStyleClass('input')}`}
                required
              >
                <option value="">
                  Sobre que organismo se tramito la patente
                </option>
                <option value="INTI">INTI</option>
                <option value="USPTO">USPTO</option>
                <option value="EPO">EPO</option>
                <option value="WIPO">WIPO</option>
              </select>
            </div>
          </div>

          {/* Botones */}
          <div className="mt-8 flex gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className={`px-6 transition-colors ${getStyleClass('button.outline')}`}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className={`px-6 transition-colors ${getStyleClass('button.primary')}`}
              disabled={loading}
            >
              {loading
                ? "Guardando..."
                : isEditing
                ? "Actualizar Patente"
                : "Guardar Patente"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalPatenteForm;

