import { ArrowLeft, Users, BookOpen, Edit, Trash2 } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

function DetallePublicacion({ publication, onBack }) {
  if (!publication) return null;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header con botón volver */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-2 rounded-md transition-colors font-medium"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Volver a Publicaciones
        </button>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon-sm" className="text-blue-600 hover:text-blue-700">
            <Edit className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon-sm" className="text-red-600 hover:text-red-700">
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Título y tipo de publicación */}
      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-2">{publication.type}</p>
        <h1 className="text-3xl font-bold text-gray-900">{publication.title}</h1>
      </div>

      {/* Sección de Autores - Como formulario */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Users className="h-5 w-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">Autores</h2>
        </div>
        <div className="space-y-3">
          {publication.authorsArray && publication.authorsArray.length > 0 ? (
            publication.authorsArray.map((author, index) => (
              <div key={index} className="flex items-center">
                <span className="text-gray-700">{author.trim()}</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No hay autores especificados</p>
          )}
        </div>
      </div>

      {/* Sección de Información de Publicación - Como formulario */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="h-5 w-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">Información de Publicación</h2>
        </div>

        <div className="space-y-6">
          {/* Revista/Conferencia */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Revista/Conferencia</label>
            <Input
              type="text"
              value={publication.journal || ""}
              readOnly
              disabled
              className="bg-gray-50 border-gray-300 cursor-not-allowed"
            />
          </div>

          {/* Tipo e ISSN en una fila */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Tipo</label>
              <Input
                type="text"
                value={publication.type}
                readOnly
                disabled
                className="bg-gray-50 border-gray-300 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">ISSN</label>
              <Input
                type="text"
                value={publication.issn || ""}
                readOnly
                disabled
                className="bg-gray-50 border-gray-300 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Año */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">Año</label>
            <Input
              type="number"
              value={publication.year}
              readOnly
              disabled
              className="bg-gray-50 border-gray-300 cursor-not-allowed"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetallePublicacion;
