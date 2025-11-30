import { X } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { useState } from "react";

function ModalPublicacionForm({ isOpen, onClose, onSave, publicacion, isEditing = false }) {
  const [formData, setFormData] = useState({
    title: publicacion?.title || '',
    journal: publicacion?.journal || '',
    type: publicacion?.type || 'Artículo',
    issn: publicacion?.issn || '',
    year: publicacion?.year || new Date().getFullYear(),
    autoresList: publicacion?.autoresList?.join(', ') || ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const processedData = {
      ...formData,
      autoresList: formData.autoresList.split(',').map(autor => autor.trim()),
      authors: formData.autoresList.split(',').length
    };
    onSave(processedData);
    onClose();
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl mx-4 w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
        {/* Header del modal */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">
              {isEditing ? 'Editar Publicación' : 'Nueva Publicación'}
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
            {/* Título */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Título de la publicación"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px] resize-y"
                rows={3}
              />
            </div>

            {/* Autores */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Autores <span className="text-red-500">*</span>
              </label>
              <Input
                value={formData.autoresList}
                onChange={(e) => handleInputChange('autoresList', e.target.value)}
                placeholder="Ej: García, J., Pérez, M., López, A."
                required
              />
            </div>

            {/* Tipo e ISSN */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="Artículo">Artículo</option>
                  <option value="Capítulo de libro">Capítulo de libro</option>
                  <option value="Libro">Libro</option>
                  <option value="Conferencia">Conferencia</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ISSN
                </label>
                <Input
                  value={formData.issn}
                  onChange={(e) => handleInputChange('issn', e.target.value)}
                  placeholder="1234-5678"
                />
              </div>
            </div>

            {/* Revista/Conferencia */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Revista/Conferencia
              </label>
              <Input
                value={formData.journal}
                onChange={(e) => handleInputChange('journal', e.target.value)}
                placeholder="Nombre de la revista o conferencia"
              />
            </div>

            {/* Año */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Año <span className="text-red-500">*</span>
              </label>
              <Input
                type="number"
                value={formData.year}
                onChange={(e) => handleInputChange('year', parseInt(e.target.value))}
                min="1900"
                max="2100"
                required
              />
            </div>
          </div>

          {/* Botones */}
          <div className="flex gap-3 justify-end pt-6 mt-6 border-t border-gray-200">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              {isEditing ? 'Actualizar Publicación' : 'Guardar Publicación'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalPublicacionForm;