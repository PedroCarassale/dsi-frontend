import { X } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { useState } from "react";

function ModalPublicacion({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    authors: "",
    type: "Artículo",
    issn: "",
    journal: "",
    year: new Date().getFullYear().toString(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: "",
      authors: "",
      type: "Artículo",
      issn: "",
      journal: "",
      year: new Date().getFullYear().toString(),
    });
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
      }}
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900">Nueva Publicación</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Título */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Título <span className="text-red-500">*</span>
            </label>
            <textarea
              name="title"
              placeholder="Título de la publicación"
              value={formData.title}
              onChange={handleChange}
              required
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white resize-none"
            />
          </div>

          {/* Autores */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Autores <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              name="authors"
              placeholder="Ej: García, J., Pérez, M., López, A."
              value={formData.authors}
              onChange={handleChange}
              required
              className="border-gray-300"
            />
          </div>

          {/* Tipo e ISSN */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Tipo <span className="text-red-500">*</span>
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="Artículo">Artículo</option>
                <option value="Libro">Libro</option>
                <option value="Capítulo de libro">Capítulo de libro</option>
                <option value="Conferencia">Conferencia</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                ISSN
              </label>
              <Input
                type="text"
                name="issn"
                placeholder="1234-5678"
                value={formData.issn}
                onChange={handleChange}
                className="border-gray-300"
              />
            </div>
          </div>

          {/* Revista/Conferencia */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Revista/Conferencia
            </label>
            <textarea
              name="journal"
              placeholder="Nombre de la revista o conferencia"
              value={formData.journal}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white resize-none"
            />
          </div>

          {/* Año */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Año <span className="text-red-500">*</span>
            </label>
            <Input
              type="number"
              name="year"
              placeholder="2025"
              value={formData.year}
              readOnly
              disabled
              className="border-gray-300 bg-gray-50 cursor-not-allowed"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Guardar Publicación
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalPublicacion;
