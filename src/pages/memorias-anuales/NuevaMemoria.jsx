import { ArrowLeft, Plus, Calendar, BookOpen, Shield, X } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createMemoria, getMemorias } from "../../store/slices/memorias/memoriasActions";
import { getMemoriasLoading } from "../../store/slices/memorias/memoriasSelector";
import { getTrabajos as getTrabajosAction } from "../../store/slices/trabajos/trabajosActions";
import { getPatentes as getPatentesAction } from "../../store/slices/patentes/patentesActions";
import ModalAgregarTrabajos from "./ModalAgregarTrabajos";
import ModalAgregarPatentes from "./ModalAgregarPatentes";

function NuevaMemoria({ onBack }) {
  const dispatch = useDispatch();
  const loading = useSelector(getMemoriasLoading);

  // Estados para la nueva memoria
  const [name, setName] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [trabajosPublicados, setTrabajosPublicados] = useState([]);
  const [registrosPatentes, setRegistrosPatentes] = useState([]);
  
  // Estados para modales
  const [showModalTrabajos, setShowModalTrabajos] = useState(false);
  const [showModalPatentes, setShowModalPatentes] = useState(false);

  // Cargar trabajos y patentes al montar
  useEffect(() => {
    dispatch(getTrabajosAction());
    dispatch(getPatentesAction());
  }, [dispatch]);

  // Funciones para abrir modales
  const agregarTrabajo = () => {
    setShowModalTrabajos(true);
  };

  const agregarPatente = () => {
    setShowModalPatentes(true);
  };

  // Funciones para manejar la adición desde modales
  const handleAgregarTrabajos = (trabajosNuevos) => {
    setTrabajosPublicados([...trabajosPublicados, ...trabajosNuevos]);
  };

  const handleAgregarPatentes = (patentesNuevas) => {
    setRegistrosPatentes([...registrosPatentes, ...patentesNuevas]);
  };

  // Funciones para eliminar elementos
  const eliminarTrabajo = (id) => {
    setTrabajosPublicados(trabajosPublicados.filter(t => t.id !== id));
  };

  const eliminarPatente = (id) => {
    setRegistrosPatentes(registrosPatentes.filter(p => p.id !== id));
  };

  const guardarCambios = async () => {
    const nuevaMemoria = {
      name: name || `Memoria Anual ${year}`,
      year,
      works: trabajosPublicados.map(t => ({ id: t.id })),
      patents: registrosPatentes.map(p => ({ id: p.id }))
    };
    
    try {
      await dispatch(createMemoria(nuevaMemoria)).unwrap();
      await dispatch(getMemorias());
      onBack();
    } catch (error) {
      console.error("Error al crear la memoria:", error);
    }
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

      {/* Sección del Año y Nombre */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Información</h3>
        </div>
        <div className="space-y-4">
          <div className="max-w-md">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre de la memoria <span className="text-red-500">*</span>
            </label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={`Memoria Anual ${year}`}
              className="w-full"
              required
            />
          </div>
          <div className="max-w-xs">
            <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
              Año de la memoria <span className="text-red-500">*</span>
            </label>
            <Input
              id="year"
              type="number"
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value))}
              min="2020"
              max="2030"
              className="w-full"
              required
            />
          </div>
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
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{trabajo.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {trabajo.authors?.join(", ") || "Sin autores"}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          {trabajo.type === 'article' ? 'Artículo' : trabajo.type === 'book' ? 'Libro' : trabajo.type === 'book_chapter' ? 'Capítulo' : trabajo.type}
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
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{patente.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {patente.code} • {patente.organization || patente.type}
                      </p>
                    </div>
                    <button
                      onClick={() => eliminarPatente(patente.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
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
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-medium"
        >
          {loading ? "Guardando..." : "Guardar Cambios"}
        </Button>
      </div>

      {/* Modales */}
      <ModalAgregarTrabajos
        isOpen={showModalTrabajos}
        onClose={() => setShowModalTrabajos(false)}
        onAdd={handleAgregarTrabajos}
        trabajosYaAgregados={trabajosPublicados}
      />

      <ModalAgregarPatentes
        isOpen={showModalPatentes}
        onClose={() => setShowModalPatentes(false)}
        onAdd={handleAgregarPatentes}
        patentesYaAgregadas={registrosPatentes}
      />
    </div>
  );
}

export default NuevaMemoria;