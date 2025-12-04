import { ArrowLeft, Plus, X, Calendar, BookOpen, Shield, Moon, Sun } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useThemeStyles } from "../../hooks/useThemeStyles";
import {
  updateMemoria,
  getMemorias,
} from "../../store/slices/memorias/memoriasActions";
import { getMemoriasLoading } from "../../store/slices/memorias/memoriasSelector";
import { getTrabajos as getTrabajosAction } from "../../store/slices/trabajos/trabajosActions";
import { getPatentes as getPatentesAction } from "../../store/slices/patentes/patentesActions";
import ModalAgregarTrabajos from "./ModalAgregarTrabajos";
import ModalAgregarPatentes from "./ModalAgregarPatentes";

function EditarMemoria({ memoria, onBack }) {
  const dispatch = useDispatch();
  const loading = useSelector(getMemoriasLoading);
  const { isDarkMode, getStyleClass } = useThemeStyles();

  // Estados para manejar las listas editables
  const [name, setName] = useState(memoria?.name || "");
  const [trabajosPublicados, setTrabajosPublicados] = useState(
    memoria?.works || []
  );
  const [registrosPatentes, setRegistrosPatentes] = useState(
    memoria?.patents || []
  );

  // Estados para modales
  const [showModalTrabajos, setShowModalTrabajos] = useState(false);
  const [showModalPatentes, setShowModalPatentes] = useState(false);

  // Cargar trabajos y patentes al montar
  useEffect(() => {
    dispatch(getTrabajosAction());
    dispatch(getPatentesAction());
  }, [dispatch]);

  // Actualizar estados cuando cambie la memoria
  useEffect(() => {
    if (memoria) {
      setName(memoria.name || "");
      setTrabajosPublicados(memoria.works || []);
      setRegistrosPatentes(memoria.patents || []);
    }
  }, [memoria]);

  if (!memoria) return null;

  // Funciones para eliminar elementos
  const eliminarTrabajo = (id) => {
    setTrabajosPublicados((trabajos) => trabajos.filter((t) => t.id !== id));
  };

  const eliminarPatente = (id) => {
    setRegistrosPatentes((patentes) => patentes.filter((p) => p.id !== id));
  };

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

  const guardarCambios = async () => {
    const memoriaActualizada = {
      id: memoria.id,
      name: name,
      year: memoria.year,
      works: trabajosPublicados.map((t) => ({ id: t.id })),
      patents: registrosPatentes.map((p) => ({ id: p.id })),
    };

    try {
      await dispatch(updateMemoria(memoriaActualizada)).unwrap();
      await dispatch(getMemorias());
      onBack();
    } catch (error) {
      console.error("Error al actualizar la memoria:", error);
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
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4 flex-1">
          <div className={`p-3 rounded-lg border transition-colors duration-300 ${getStyleClass('iconBg.blue')}`}>
            <Calendar className={`h-8 w-8 transition-colors duration-300 ${getStyleClass('icons.blue')}`} />
          </div>
          <div className="flex-1">
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`text-3xl font-bold border-0 px-0 focus:ring-0 transition-colors duration-300 ${getStyleClass('text.primary')} ${getStyleClass('background')}`}
              placeholder="Nombre de la memoria"
            />
            <p className={`mt-1 transition-colors duration-300 ${getStyleClass('text.secondary')}`}>Resumen de actividades del año</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 text-sm font-medium rounded transition-colors duration-300 ${
              memoria.status === "En Progreso"
                ? getStyleClass('badge.orange')
                : getStyleClass('badge.blue')
            }`}
          >
            {memoria.status}
          </span>
        </div>
      </div>

      {/* Cards de información - solo lectura en edición */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className={`rounded-lg border p-6 transition-colors duration-300 ${getStyleClass('card')}`}>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Calendar className={`h-8 w-8 transition-colors duration-300 ${getStyleClass('icons.blue')}`} />
            </div>
            <div className="ml-4">
              <p className={`text-sm font-medium transition-colors duration-300 ${getStyleClass('text.secondary')}`}>Año</p>
              <p className={`text-2xl font-semibold transition-colors duration-300 ${getStyleClass('text.primary')}`}>
                {memoria.year}
              </p>
            </div>
          </div>
        </div>

        <div className={`rounded-lg border p-6 transition-colors duration-300 ${getStyleClass('card')}`}>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BookOpen className={`h-8 w-8 transition-colors duration-300 ${getStyleClass('icons.cyan')}`} />
            </div>
            <div className="ml-4">
              <p className={`text-sm font-medium transition-colors duration-300 ${getStyleClass('text.secondary')}`}>
                Trabajos Publicados
              </p>
              <p className={`text-2xl font-semibold transition-colors duration-300 ${getStyleClass('text.primary')}`}>
                {trabajosPublicados.length}
              </p>
            </div>
          </div>
        </div>

        <div className={`rounded-lg border p-6 transition-colors duration-300 ${getStyleClass('card')}`}>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Shield className={`h-8 w-8 transition-colors duration-300 ${getStyleClass('icons.green')}`} />
            </div>
            <div className="ml-4">
              <p className={`text-sm font-medium transition-colors duration-300 ${getStyleClass('text.secondary')}`}>Patentes</p>
              <p className={`text-2xl font-semibold transition-colors duration-300 ${getStyleClass('text.primary')}`}>
                {registrosPatentes.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sección Trabajos Publicados - Editable */}
      <div className={`rounded-lg border mb-6 transition-colors duration-300 ${getStyleClass('card')}`}>
        <div className={`px-6 py-4 border-b transition-colors duration-300 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className={`h-5 w-5 transition-colors duration-300 ${getStyleClass('icons.cyan')}`} />
              <h3 className={`text-lg font-semibold transition-colors duration-300 ${getStyleClass('text.primary')}`}>
                Trabajos Publicados
              </h3>
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
          <div className="space-y-4">
            {trabajosPublicados.map((trabajo) => (
              <div
                key={trabajo.id}
                className={`border rounded-lg p-4 transition-colors duration-300 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className={`font-semibold transition-colors duration-300 ${getStyleClass('text.primary')}`}>
                      {trabajo.title}
                    </h4>
                    <p className={`text-sm mt-1 transition-colors duration-300 ${getStyleClass('text.secondary')}`}>
                      {trabajo.authors}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className={`px-2 py-1 rounded text-xs transition-colors duration-300 ${
                        isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {trabajo.type}
                      </span>
                      <span className={`text-sm transition-colors duration-300 ${getStyleClass('text.secondary')}`}>
                        {trabajo.journal}
                      </span>
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
            {trabajosPublicados.length === 0 && (
              <div className={`text-center py-8 transition-colors duration-300 ${getStyleClass('text.secondary')}`}>
                No hay trabajos publicados. Haz click en "Agregar Trabajo" para
                añadir uno.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sección Registros y Patentes - Editable */}
      <div className={`rounded-lg border mb-8 transition-colors duration-300 ${getStyleClass('card')}`}>
        <div className={`px-6 py-4 border-b transition-colors duration-300 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className={`h-5 w-5 transition-colors duration-300 ${getStyleClass('icons.green')}`} />
              <h3 className={`text-lg font-semibold transition-colors duration-300 ${getStyleClass('text.primary')}`}>
                Registros y Patentes
              </h3>
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
          <div className="space-y-4">
            {registrosPatentes.map((registro) => (
              <div
                key={registro.id}
                className={`border rounded-lg p-4 transition-colors duration-300 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className={`font-semibold transition-colors duration-300 ${getStyleClass('text.primary')}`}>
                      {registro.title}
                    </h4>
                    <p className={`text-sm mt-1 transition-colors duration-300 ${getStyleClass('text.secondary')}`}>
                      {registro.code} • {registro.type}
                    </p>
                  </div>
                  <button
                    onClick={() => eliminarPatente(registro.id)}
                    className={`p-1 rounded transition-colors duration-300 ${getStyleClass('button.remove')}`}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
            {registrosPatentes.length === 0 && (
              <div className={`text-center py-8 transition-colors duration-300 ${getStyleClass('text.secondary')}`}>
                No hay patentes registradas. Haz click en "Agregar Patente" para
                añadir una.
              </div>
            )}
          </div>
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

export default EditarMemoria;



