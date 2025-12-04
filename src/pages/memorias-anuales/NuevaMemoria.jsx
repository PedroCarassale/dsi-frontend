import { ArrowLeft, Plus, Calendar, BookOpen, Shield, X, Moon, Sun } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useThemeStyles } from "../../hooks/useThemeStyles";
import { createMemoria, getMemorias } from "../../store/slices/memorias/memoriasActions";
import { getMemoriasLoading } from "../../store/slices/memorias/memoriasSelector";
import { getTrabajos as getTrabajosAction } from "../../store/slices/trabajos/trabajosActions";
import { getPatentes as getPatentesAction } from "../../store/slices/patentes/patentesActions";
import ModalAgregarTrabajos from "./ModalAgregarTrabajos";
import ModalAgregarPatentes from "./ModalAgregarPatentes";

function NuevaMemoria({ onBack }) {
  const dispatch = useDispatch();
  const loading = useSelector(getMemoriasLoading);
  const { isDarkMode, getStyleClass } = useThemeStyles();

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
    <div className={`max-w-6xl mx-auto min-h-screen transition-colors duration-300 ${getStyleClass('background')}`}>
      {/* Header con botón volver y toggle dark mode */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className={`flex items-center px-3 py-2 rounded-md transition-colors duration-300 font-medium ${getStyleClass('button.home')}`}
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Volver a Memorias
        </button>
      </div>

      {/* Título principal */}
      <div className="flex items-center gap-4 mb-8">
        <div className={`p-3 rounded-lg border transition-colors duration-300 ${getStyleClass('iconBg.blue')}`}>
          <Calendar className={`h-8 w-8 transition-colors duration-300 ${getStyleClass('icons.blue')}`} />
        </div>
        <div>
          <h1 className={`text-3xl font-bold transition-colors duration-300 ${getStyleClass('text.primary')}`}>Nueva Memoria</h1>
          <p className={`mt-1 transition-colors duration-300 ${getStyleClass('text.secondary')}`}>Crear resumen de actividades del año</p>
        </div>
      </div>

      {/* Sección del Año y Nombre */}
      <div className={`rounded-lg border p-6 mb-6 transition-colors duration-300 ${getStyleClass('card')}`}>
        <div className="flex items-center gap-2 mb-4">
          <Calendar className={`h-5 w-5 transition-colors duration-300 ${getStyleClass('icons.blue')}`} />
          <h3 className={`text-lg font-semibold transition-colors duration-300 ${getStyleClass('text.primary')}`}>Información</h3>
        </div>
        <div className="space-y-4">
          <div className="max-w-md">
            <label htmlFor="name" className={`block text-sm font-medium mb-2 transition-colors duration-300 ${getStyleClass('label')}`}>
              Nombre de la memoria
            </label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={`Memoria Anual ${year}`}
              className={`w-full transition-colors duration-300 ${getStyleClass('input')}`}
            />
          </div>
          <div className="max-w-xs">
            <label htmlFor="year" className={`block text-sm font-medium mb-2 transition-colors duration-300 ${getStyleClass('label')}`}>
              Año de la memoria
            </label>
            <Input
              id="year"
              type="number"
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value))}
              min="2020"
              max="2030"
              className={`w-full transition-colors duration-300 ${getStyleClass('input')}`}
            />
          </div>
        </div>
      </div>

      {/* Sección Trabajos Publicados - Inicialmente vacía */}
      <div className={`rounded-lg border mb-6 transition-colors duration-300 ${getStyleClass('card')}`}>
        <div className={`px-6 py-4 border-b transition-colors duration-300 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className={`h-5 w-5 transition-colors duration-300 ${getStyleClass('icons.cyan')}`} />
              <h3 className={`text-lg font-semibold transition-colors duration-300 ${getStyleClass('text.primary')}`}>Trabajos Publicados</h3>
            </div>
            <Button 
              size="sm"
              onClick={agregarTrabajo}
              className={`flex items-center gap-2 transition-colors duration-300 ${getStyleClass('button.primary')}`}
            >
              <Plus className="h-4 w-4" />
              Agregar Trabajo
            </Button>
          </div>
        </div>
        
        <div className="p-6">
          {trabajosPublicados.length === 0 ? (
            <div className={`text-center py-12 transition-colors duration-300 ${getStyleClass('text.secondary')}`}>
              <BookOpen className={`h-12 w-12 mx-auto mb-4 transition-colors duration-300 ${getStyleClass('icons.gray')}`} />
              <p className="text-lg font-medium mb-2">No hay trabajos publicados</p>
              <p className="text-sm">Haz click en "Agregar Trabajo" para añadir el primer trabajo.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {trabajosPublicados.map((trabajo) => (
                <div key={trabajo.id} className={`border rounded-lg p-4 transition-colors duration-300 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className={`font-semibold transition-colors duration-300 ${getStyleClass('text.primary')}`}>{trabajo.title}</h4>
                      <p className={`text-sm mt-1 transition-colors duration-300 ${getStyleClass('text.secondary')}`}>
                        {trabajo.authors?.join(", ") || "Sin autores"}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`px-2 py-1 rounded text-xs transition-colors duration-300 ${
                          isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {trabajo.type === 'article' ? 'Artículo' : trabajo.type === 'book' ? 'Libro' : trabajo.type === 'book_chapter' ? 'Capítulo' : trabajo.type}
                        </span>
                        <span className={`text-sm transition-colors duration-300 ${getStyleClass('text.secondary')}`}>{trabajo.journal}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => eliminarTrabajo(trabajo.id)}
                      className={`p-1 rounded transition-colors duration-300 ${getStyleClass('button.remove')}`}
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
      <div className={`rounded-lg border mb-8 transition-colors duration-300 ${getStyleClass('card')}`}>
        <div className={`px-6 py-4 border-b transition-colors duration-300 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className={`h-5 w-5 transition-colors duration-300 ${getStyleClass('icons.green')}`} />
              <h3 className={`text-lg font-semibold transition-colors duration-300 ${getStyleClass('text.primary')}`}>Registros y Patentes</h3>
            </div>
            <Button 
              size="sm"
              onClick={agregarPatente}
              className={`flex items-center gap-2 transition-colors duration-300 ${getStyleClass('button.primary')}`}
            >
              <Plus className="h-4 w-4" />
              Agregar Patente
            </Button>
          </div>
        </div>
        
        <div className="p-6">
          {registrosPatentes.length === 0 ? (
            <div className={`text-center py-12 transition-colors duration-300 ${getStyleClass('text.secondary')}`}>
              <Shield className={`h-12 w-12 mx-auto mb-4 transition-colors duration-300 ${getStyleClass('icons.gray')}`} />
              <p className="text-lg font-medium mb-2">No hay patentes registradas</p>
              <p className="text-sm">Haz click en "Agregar Patente" para añadir la primera patente.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {registrosPatentes.map((patente) => (
                <div key={patente.id} className={`border rounded-lg p-4 transition-colors duration-300 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className={`font-semibold transition-colors duration-300 ${getStyleClass('text.primary')}`}>{patente.title}</h4>
                      <p className={`text-sm mt-1 transition-colors duration-300 ${getStyleClass('text.secondary')}`}>
                        {patente.code} • {patente.organization || patente.type}
                      </p>
                    </div>
                    <button
                      onClick={() => eliminarPatente(patente.id)}
                      className={`p-1 rounded transition-colors duration-300 ${getStyleClass('button.remove')}`}
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
          className={`w-full py-3 text-lg font-medium transition-colors duration-300 ${getStyleClass('button.primary')}`}
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


