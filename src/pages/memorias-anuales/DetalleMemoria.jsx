import { ArrowLeft, Download, FileText, Users, Calendar, Shield, BookOpen } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useState } from "react";

function DetalleMemoria({ memoria, onBack, onEdit }) {
  if (!memoria) return null;

  // Estado para el popup de exportación
  const [isExporting, setIsExporting] = useState(false);
  const [exportType, setExportType] = useState('');

  // Funciones de exportación
  const handleExportExcel = () => {
    setExportType('Excel');
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportType('');
    }, 2000); // Simula exportación por 2 segundos
  };

  const handleExportPDF = () => {
    setExportType('PDF');
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportType('');
    }, 2000); // Simula exportación por 2 segundos
  };

  // Datos mock basados en el Figma
  const mockData = {
    year: memoria.year,
    publicaciones: memoria.publications,
    patentes: memoria.patents,
    trabajosPublicados: [
      {
        id: 1,
        title: "Machine Learning Applications in Healthcare",
        authors: "Dr. García, Dr. Martínez",
        type: "Artículo",
        journal: "Journal of Medical AI"
      },
      {
        id: 2,
        title: "Deep Learning for Medical Imaging", 
        authors: "Dr. López, Dr. Rodríguez",
        type: "Conferencia",
        journal: "IEEE Medical Imaging Conference"
      }
    ],
    registrosPatentes: [
      {
        id: 1,
        title: "Sistema de Diagnóstico Automatizado",
        code: "ES2024001234",
        type: "INTI"
      },
      {
        id: 2,
        title: "Algoritmo de Detección Temprana",
        code: "ES2024002345", 
        type: "INTI"
      }
    ]
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header con botón volver */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-2 rounded-md transition-colors font-medium"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Volver a Memorias
        </button>
      </div>

      {/* Título principal */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-lg border border-blue-200">
            <FileText className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{memoria.title}</h1>
            <p className="text-gray-600 mt-1">Resumen de actividades del año</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 text-sm font-medium rounded ${
            memoria.status === 'En Progreso' 
              ? 'bg-orange-500 text-white' 
              : 'bg-blue-500 text-white'
          }`}>
            {memoria.status}
          </span>
        </div>
      </div>

      {/* Cards de información */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Año */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Año</p>
              <p className="text-2xl font-semibold text-gray-900">{mockData.year}</p>
            </div>
          </div>
        </div>

        {/* Publicaciones */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BookOpen className="h-8 w-8 text-cyan-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Publicaciones</p>
              <p className="text-2xl font-semibold text-gray-900">{mockData.publicaciones}</p>
            </div>
          </div>
        </div>

        {/* Patentes */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Patentes</p>
              <p className="text-2xl font-semibold text-gray-900">{mockData.patentes}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sección Trabajos Publicados */}
      <div className="bg-white rounded-lg border border-gray-200 mb-6">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-cyan-600" />
              <h3 className="text-lg font-semibold text-gray-900">Trabajos Publicados</h3>
            </div>
            <span className="text-sm text-gray-500">{mockData.trabajosPublicados.length} trabajos</span>
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {mockData.trabajosPublicados.map((trabajo) => (
              <div key={trabajo.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{trabajo.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{trabajo.authors}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        {trabajo.type}
                      </span>
                      <span className="text-sm text-gray-500">{trabajo.journal}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sección Registros y Patentes */}
      <div className="bg-white rounded-lg border border-gray-200 mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">Registros y Patentes</h3>
            </div>
            <span className="text-sm text-gray-500">{mockData.registrosPatentes.length} registros</span>
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {mockData.registrosPatentes.map((registro) => (
              <div key={registro.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{registro.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{registro.code} • {registro.type}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Botones de acción - mismo ancho que las listas */}
      <div className="grid grid-cols-3 gap-4">
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white w-full"
          onClick={handleExportExcel}
          disabled={isExporting}
        >
          <Download className="h-4 w-4 mr-2" />
          Exportar a Excel
        </Button>
        <Button 
          variant="outline" 
          className="border-gray-300 text-gray-700 hover:bg-gray-50 w-full"
          onClick={handleExportPDF}
          disabled={isExporting}
        >
          <Download className="h-4 w-4 mr-2" />
          Exportar a PDF
        </Button>
        <Button 
          variant="outline" 
          className="border-blue-300 text-blue-600 hover:bg-blue-50 w-full"
          onClick={onEdit}
        >
          Editar Memoria
        </Button>
      </div>

      {/* Popup de exportación */}
      {isExporting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-sm mx-4 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Exportando a {exportType}...
            </h3>
            <p className="text-gray-600">Por favor espera mientras se genera el archivo {exportType}.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetalleMemoria;