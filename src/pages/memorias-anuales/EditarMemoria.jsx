import { ArrowLeft, Plus, X, Calendar, BookOpen, Shield } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useState } from "react";

function EditarMemoria({ memoria, onBack, onSave }) {
  if (!memoria) return null;

  // Estados para manejar las listas editables
  const [trabajosPublicados, setTrabajosPublicados] = useState([
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
  ]);

  const [registrosPatentes, setRegistrosPatentes] = useState([
    {
      id: 1,
      title: "Sistema de Diagnóstico Automatizado",
      code: "ES2024001234",
      type: "OEPM"
    },
    {
      id: 2,
      title: "Algoritmo de Detección Temprana",
      code: "ES2024002345", 
      type: "OEPM"
    }
  ]);

  // Funciones para eliminar elementos
  const eliminarTrabajo = (id) => {
    setTrabajosPublicados(trabajos => trabajos.filter(t => t.id !== id));
  };

  const eliminarPatente = (id) => {
    setRegistrosPatentes(patentes => patentes.filter(p => p.id !== id));
  };

  // Funciones para agregar elementos (por ahora solo muestran alert)
  const agregarTrabajo = () => {
    alert("Funcionalidad de agregar trabajo - se conectará con modal");
  };

  const agregarPatente = () => {
    alert("Funcionalidad de agregar patente - se conectará con modal");
  };

  const guardarCambios = () => {
    alert("Cambios guardados (mock) - se conectará con backend");
    onBack();
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
            <Calendar className="h-8 w-8 text-blue-600" />
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

      {/* Cards de información - solo lectura en edición */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Año</p>
              <p className="text-2xl font-semibold text-gray-900">{memoria.year}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BookOpen className="h-8 w-8 text-cyan-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Publicaciones</p>
              <p className="text-2xl font-semibold text-gray-900">{trabajosPublicados.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Patentes</p>
              <p className="text-2xl font-semibold text-gray-900">{registrosPatentes.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sección Trabajos Publicados - Editable */}
      <div className="bg-white rounded-lg border border-gray-200 mb-6">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-cyan-600" />
              <h3 className="text-lg font-semibold text-gray-900">Trabajos Publicados</h3>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={agregarTrabajo}
              className="border-blue-300 text-blue-600 hover:bg-blue-50"
            >
              <Plus className="h-4 w-4 mr-1" />
              Agregar Trabajo
            </Button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {trabajosPublicados.map((trabajo) => (
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
                  <button
                    onClick={() => eliminarTrabajo(trabajo.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
            {trabajosPublicados.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No hay trabajos publicados. Haz click en "Agregar Trabajo" para añadir uno.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sección Registros y Patentes - Editable */}
      <div className="bg-white rounded-lg border border-gray-200 mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">Registros y Patentes</h3>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={agregarPatente}
              className="border-blue-300 text-blue-600 hover:bg-blue-50"
            >
              <Plus className="h-4 w-4 mr-1" />
              Agregar Patente
            </Button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {registrosPatentes.map((registro) => (
              <div key={registro.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{registro.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{registro.code} • {registro.type}</p>
                  </div>
                  <button
                    onClick={() => eliminarPatente(registro.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
            {registrosPatentes.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No hay patentes registradas. Haz click en "Agregar Patente" para añadir una.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Botón Guardar Cambios - como en el Figma */}
      <div className="w-full">
        <Button 
          onClick={guardarCambios}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-medium"
        >
          Guardar Cambios
        </Button>
      </div>
    </div>
  );
}

export default EditarMemoria;