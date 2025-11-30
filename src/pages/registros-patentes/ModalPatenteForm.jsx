import { X } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createPatente,
  updatePatente,
} from "../../store/slices/patentes/patentesActions";
import { getPatentesLoading } from "../../store/slices/patentes/petentesSelector";

function ModalPatenteForm({ isOpen, onClose, patente, isEditing = false }) {
  const dispatch = useDispatch();
  const loading = useSelector(getPatentesLoading);

  const [formData, setFormData] = useState({
    title: patente?.title || "",
    code: patente?.code || "",
    description: patente?.description || "",
    type: patente?.type || "",
    year: patente?.year || new Date().getFullYear(),
  });

  // Actualizar formData cuando cambie la patente
  useEffect(() => {
    if (patente) {
      setFormData({
        title: patente.title || "",
        code: patente.code || "",
        description: patente.description || "",
        type: patente.type || "",
        year: patente.year || new Date().getFullYear(),
      });
    } else {
      setFormData({
        title: "",
        code: "",
        description: "",
        type: "",
        year: new Date().getFullYear(),
      });
    }
  }, [patente, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing && patente) {
      await dispatch(updatePatente({ id: patente.id, ...formData }));
    } else {
      await dispatch(createPatente(formData));
    }

    onClose();
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl mx-4 w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
        {/* Header del modal */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">
              {isEditing ? "Editar Registro/Patente" : "Nuevo Registro/Patente"}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Título */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Título de la patente o registro"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px] resize-y"
                rows={3}
              />
            </div>

            {/* Código */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Descripción sobre la patente"
                className="w-full min-h-32 px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
                required
              />
            </div>

            {/* Organismo Competente */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Organismo Competente <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.type}
                onChange={(e) => handleInputChange("type", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              className="px-6"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6"
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
