import {
  Plus,
  Search,
  Home,
  Shield,
  Calendar,
  Eye,
  MoreVertical,
  Edit,
  Trash2,
  TrendingUp,
  Factory,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getPatentes,
  deletePatente,
} from "../../store/slices/patentes/patentesActions";
import {
  getPatentes as getPatentesSelector,
  getPatentesLoading,
  getPatentesError,
} from "../../store/slices/patentes/petentesSelector";
import DetallePatente from "./DetallePatente";
import ModalConfirmacionEliminacion from "./ModalConfirmacionEliminacion";
import ModalPatenteForm from "./ModalPatenteForm";
import { useThemeStyles } from "../../hooks/useThemeStyles";

function RegistrosPatentes() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state
  const patentes = useSelector(getPatentesSelector);
  const loading = useSelector(getPatentesLoading);
  const error = useSelector(getPatentesError);

  // Cargar patentes al montar el componente
  useEffect(() => {
    dispatch(getPatentes());
  }, [dispatch]);

  // Estados para navegación y modales
  const [selectedPatente, setSelectedPatente] = useState(null);
  const [menuAbierto, setMenuAbierto] = useState(null);
  const [modalEliminar, setModalEliminar] = useState({
    isOpen: false,
    patente: null,
  });
  const [modalForm, setModalForm] = useState({
    isOpen: false,
    patente: null,
    isEditing: false,
  });

  // Theme styles hook
  const { isDarkMode, getStyleClass } = useThemeStyles();

  // Calcular estadísticas
  const totalPatentes = patentes.length;
  const esteAño = patentes.filter(
    (p) => p.year === new Date().getFullYear()
  ).length;

  const handleVerDetalle = (patente) => {
    setSelectedPatente(patente);
    setMenuAbierto(null);
  };

  const handleVolver = () => {
    setSelectedPatente(null);
  };

  const handleEditar = (patente) => {
    setModalForm({ isOpen: true, patente, isEditing: true });
    setMenuAbierto(null);
  };

  const handleEliminar = (patente) => {
    setModalEliminar({ isOpen: true, patente });
    setMenuAbierto(null);
  };

  const confirmEliminar = (patente) => {
    dispatch(deletePatente(patente.id));
  };

  const toggleMenu = (patenteId) => {
    setMenuAbierto(menuAbierto === patenteId ? null : patenteId);
  };

  const handleNuevaPatente = () => {
    setModalForm({ isOpen: true, patente: null, isEditing: false });
  };

  // Cerrar menú al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuAbierto && !event.target.closest(".relative")) {
        setMenuAbierto(null);
      }
    };

    if (menuAbierto) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [menuAbierto]);

  // Si hay una patente seleccionada, mostrar el detalle
  if (selectedPatente) {
    return (
      <DetallePatente
        patente={selectedPatente}
        onBack={handleVolver}
        onUpdateSelected={setSelectedPatente}
      />
    );
  }

  // Mostrar loading
  if (loading && patentes.length === 0) {
    return (
      <div className={`min-h-screen transition-all duration-300 ${getStyleClass('background')}`}>
        <div className="flex items-center justify-center h-64">
          <div className={getStyleClass('text.secondary')}>Cargando patentes...</div>
        </div>
      </div>
    );
  }

  // Mostrar error
  if (error) {
    return (
      <div className={`min-h-screen transition-all duration-300 ${getStyleClass('background')}`}>
        <div className="flex items-center justify-center h-64">
          <div className="text-red-500">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-300 ${getStyleClass('background')}`}>
      <div className="max-w-7xl mx-auto p-6">
        <div className={getStyleClass('text.primary')}>
          {/* Sección de título con breadcrumb */}
          <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => navigate("/")}
              className={`p-2.5 rounded-lg border transition-colors cursor-pointer ${getStyleClass('button.home')}`}
            >
              <Home className="h-5 w-5" />
            </button>
            <div className={`p-2.5 rounded-lg border ${getStyleClass('iconBg.green')}`}>
              <Shield className={`h-5 w-5 ${getStyleClass('icons.green')}`} />
            </div>
            <h1 className={`text-3xl font-bold ${getStyleClass('text.primary')}`}>
              Registros y Patentes
            </h1>
          </div>

          <p className={`text-sm ml-20 ${getStyleClass('text.secondary')}`}>
            Gestión de propiedad intelectual del grupo
          </p>

          {/* Buscador y botón */}
          <div className="flex items-center gap-4 mt-6">
            <div className="relative flex-1 max-w-md">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${getStyleClass('icons.gray')}`} />
              <Input
                placeholder="Buscar patentes..."
                className={`pl-10 border transition-colors ${getStyleClass('input')}`}
              />
            </div>

            <Button
              className={`flex items-center gap-2 transition-colors ${getStyleClass('button.primary')}`}
              onClick={handleNuevaPatente}
            >
              <Plus className="h-4 w-4" />
              Nueva Patente
            </Button>
          </div>
          </div>

          {/* Cards de estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Patentes */}
            <div className={`rounded-lg border p-6 transition-colors ${getStyleClass('card')}`}>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Shield className={`h-8 w-8 ${getStyleClass('icons.green')}`} />
                </div>
                <div className="ml-4">
                  <p className={`text-sm font-medium ${getStyleClass('text.secondary')}`}>
                    Total Patentes
                  </p>
                  <p className={`text-2xl font-semibold ${getStyleClass('text.primary')}`}>
                    {totalPatentes}
                  </p>
                </div>
              </div>
            </div>

            {/* Este Año */}
            <div className={`rounded-lg border p-6 transition-colors ${getStyleClass('card')}`}>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Calendar className={`h-8 w-8 ${getStyleClass('icons.blue')}`} />
                </div>
                <div className="ml-4">
                  <p className={`text-sm font-medium ${getStyleClass('text.secondary')}`}>Este Año</p>
                  <p className={`text-2xl font-semibold ${getStyleClass('text.primary')}`}>{esteAño}</p>
                </div>
              </div>
            </div>

            {/* Industriales */}
            <div className={`rounded-lg border p-6 transition-colors ${getStyleClass('card')}`}>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Factory className={`h-8 w-8 ${getStyleClass('icons.cyan')}`} />
                </div>
                <div className="ml-4">
                  <p className={`text-sm font-medium ${getStyleClass('text.secondary')}`}>Industriales</p>
                  <p className={`text-2xl font-semibold ${getStyleClass('text.primary')}`}>
                    {patentes.filter(p => p.type === 'Industrial').length}
                  </p>
                </div>
              </div>
            </div>

            {/* INTI */}
            <div className={`rounded-lg border p-6 transition-colors ${getStyleClass('card')}`}>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <TrendingUp className={`h-8 w-8 ${getStyleClass('icons.orange')}`} />
                </div>
                <div className="ml-4">
                  <p className={`text-sm font-medium ${getStyleClass('text.secondary')}`}>INTI</p>
                  <p className={`text-2xl font-semibold ${getStyleClass('text.primary')}`}>
                    {patentes.filter(p => p.type === 'INTI').length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Título de sección */}
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${getStyleClass('text.primary')}`}>
              Lista de Patentes y Registros
            </h3>
            <span className={`text-sm ${getStyleClass('text.secondary')}`}>
              {patentes.length} registros
            </span>
          </div>

          {/* Lista de Patentes - Cards individuales */}
          <div className="space-y-4">
            {patentes.map((patente) => (
              <div
                key={patente.id}
                className={`rounded-lg border p-6 transition-colors ${getStyleClass('card')}`}
              >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="flex-shrink-0">
                    <div className={`p-3 rounded-lg border ${getStyleClass('iconBg.green')}`}>
                      <Shield className={`h-6 w-6 ${getStyleClass('icons.green')}`} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className={`text-lg font-semibold mb-1 ${getStyleClass('text.primary')}`}>
                      {patente.title}
                    </h4>
                    <p className={`text-sm mb-2 ${getStyleClass('text.secondary')}`}>
                      Código: {patente.code}
                    </p>

                    {/* Información adicional con iconos */}
                    <div className={`flex items-center gap-6 text-sm ${getStyleClass('text.secondary')}`}>
                      <div className="flex items-center gap-1">
                        <Calendar className={`h-4 w-4 ${getStyleClass('icons.gray')}`} />
                        <span>{patente.year}</span>
                      </div>
                    </div>

                    {/* Badges del tipo */}
                    <div className="mt-3 flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStyleClass('badge.blue')}`}>
                        {patente.property || "Industrial"}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStyleClass('badge.gray')}`}>
                        {patente.organization}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Botón Ver Detalles */}
                  <Button
                    variant="outline"
                    size="sm"
                    className={`transition-colors ${getStyleClass('button.outline')}`}
                    onClick={() => handleVerDetalle(patente)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Ver Detalles
                  </Button>

                  {/* Botón de más opciones con menú */}
                  <div className="relative">
                    <button
                      className={`p-1 rounded transition-colors ${getStyleClass('text.secondary')} hover:${getStyleClass('text.primary')}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMenu(patente.id);
                      }}
                    >
                      <MoreVertical className="h-5 w-5" />
                    </button>

                    {/* Menú desplegable */}
                    {menuAbierto === patente.id && (
                      <div className={`absolute right-0 mt-1 w-48 rounded-md shadow-lg border z-10 transition-colors ${getStyleClass('menu')}`}>
                        <div className="py-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditar(patente);
                            }}
                            className={`flex items-center w-full px-4 py-2 text-sm transition-colors ${getStyleClass('menu.item')}`}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEliminar(patente);
                            }}
                            className={`flex items-center w-full px-4 py-2 text-sm transition-colors ${getStyleClass('menu.item.danger')}`}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Eliminar
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            ))}
          </div>
        </div>
      </div>

        {/* Modal de confirmación de eliminación */}
        <ModalConfirmacionEliminacion
          isOpen={modalEliminar.isOpen}
          onClose={() => setModalEliminar({ isOpen: false, patente: null })}
          onConfirm={confirmEliminar}
          patente={modalEliminar.patente}
        />

        {/* Modal de formulario (nuevo/editar) */}
        <ModalPatenteForm
          isOpen={modalForm.isOpen}
          onClose={() =>
            setModalForm({ isOpen: false, patente: null, isEditing: false })
          }
          patente={modalForm.patente}
          isEditing={modalForm.isEditing}
        />
    </div>
  );
}

export default RegistrosPatentes;

