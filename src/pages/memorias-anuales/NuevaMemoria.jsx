import { ArrowLeft, Plus, Calendar, BookOpen, Shield } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { useState } from "react";

function NuevaMemoria({ onBack, onSave }) {
  // Estados para la nueva memoria
  const [year, setYear] = useState(new Date().getFullYear());
  const [trabajosPublicados, setTrabajosPublicados] = useState([]);
  const [registrosPatentes, setRegistrosPatentes] = useState([]);

  // Funciones para agregar elementos (por ahora solo muestran alert)
  const agregarTrabajo = () => {
    alert("Funcionalidad de agregar trabajo - se conectará con modal");
  };

  const agregarPatente = () => {
    alert("Funcionalidad de agregar patente - se conectará con modal");
  };

  const guardarCambios = () => {
    const nuevaMemoria = {
      year,
      trabajosPublicados,
      registrosPatentes,
      title: `Memoria Anual ${year}`,
      status: "En Progreso"
    };
    
    alert(`Nueva memoria creada para el año ${year} (mock) - se conectará con backend`);
    onSave(nuevaMemoria);
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
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-blue-100 p-3 rounded-lg border border-blue-200">
          <Calendar className="h-8 w-8 text-blue-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Nueva Memoria</h1>
          <p className="text-gray-600 mt-1">Crear resumen de actividades del año</p>
        </div>
      </div>

      {/* Sección del Año */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Año</h3>
        </div>
        <div className="max-w-xs">
          <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
            Año de la memoria
          </label>
          <Input
            id="year"
            type="number"
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
            min="2020"
            max="2030"
            className="w-full"
          />
        </div>
      </div>

      {/* Sección Trabajos Publicados - Inicialmente vacía */}
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
          {trabajosPublicados.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-lg font-medium mb-2">No hay trabajos publicados</p>
              <p className="text-sm">Haz click en "Agregar Trabajo" para añadir el primer trabajo.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {trabajosPublicados.map((trabajo) => (
                <div key={trabajo.id} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900">{trabajo.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{trabajo.authors}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Sección Registros y Patentes - Inicialmente vacía */}
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
          {registrosPatentes.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Shield className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-lg font-medium mb-2">No hay patentes registradas</p>
              <p className="text-sm">Haz click en "Agregar Patente" para añadir la primera patente.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {registrosPatentes.map((patente) => (
                <div key={patente.id} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900">{patente.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{patente.code}</p>
                </div>
              ))}
            </div>
          )}
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

export default NuevaMemoria;