import {
  Plus,
  Search,
  Home,
  BookOpen,
  Users,
  Calendar,
  Eye,
  MoreVertical,
  Edit,
  Trash2,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getTrabajos,
  deleteTrabajo,
} from "../../store/slices/trabajos/trabajosActions";
import {
  getTrabajos as getTrabajosSelector,
  getTrabajosLoading,
  getTrabajosError,
} from "../../store/slices/trabajos/trabajosSelector";
import DetallePublicacion from "./DetallePublicacion";
import ModalPublicacionForm from "./ModalPublicacionForm";
import { useThemeStyles } from "../../hooks/useThemeStyles";
import ModalConfirmacionEliminacion from "./ModalConfirmacionEliminacion";

function TrabajosPublicados() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state
  const publicaciones = useSelector(getTrabajosSelector);
  const loading = useSelector(getTrabajosLoading);
  const error = useSelector(getTrabajosError);

  // Cargar trabajos al montar el componente
  useEffect(() => {
    dispatch(getTrabajos());
  }, [dispatch]);

  // Estados para navegación y modales
  const [publicacionSeleccionada, setPublicacionSeleccionada] = useState(null);
  const [menuAbierto, setMenuAbierto] = useState(null);
  const [modalEliminar, setModalEliminar] = useState({
    isOpen: false,
    publicacion: null,
  });
  const [modalForm, setModalForm] = useState({
    isOpen: false,
    publicacion: null,
    isEditing: false,
  });

  // Theme styles hook
  const { isDarkMode, getStyleClass } = useThemeStyles();

  const handleVerDetalle = (publicacion) => {
    setPublicacionSeleccionada(publicacion);
    setMenuAbierto(null);
  };

  const handleVolver = () => {
    setPublicacionSeleccionada(null);
  };

  const handleEditar = (publicacion) => {
    setModalForm({ isOpen: true, publicacion, isEditing: true });
    setMenuAbierto(null);
  };

  const handleEliminar = (publicacion) => {
    setModalEliminar({ isOpen: true, publicacion });
    setMenuAbierto(null);
  };

  const confirmEliminar = (publicacion) => {
    dispatch(deleteTrabajo(publicacion.id));
  };

  const toggleMenu = (publicacionId) => {
    setMenuAbierto(menuAbierto === publicacionId ? null : publicacionId);
  };

  const handleNuevaPublicacion = () => {
    setModalForm({ isOpen: true, publicacion: null, isEditing: false });
  };

  const handleSaveNewPublicacion = (formData) => {
    // El manejo de crear/actualizar ahora se hace en el modal
    // que hace el dispatch directamente
  };

  // Cerrar menú al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuAbierto && !event.target.closest(".relative")) {
        setMenuAbierto(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuAbierto]);

  // Mostrar loading
  if (loading && publicaciones.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Cargando trabajos...</div>
      </div>
    );
  }

  // Mostrar error
  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  // Si hay una publicación seleccionada, mostrar el detalle
  if (publicacionSeleccionada) {
    return (
      <DetallePublicacion
        publicacion={publicacionSeleccionada}
        onBack={handleVolver}
        onUpdateSelected={setPublicacionSeleccionada}
      />
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-300 ${getStyleClass('background')}`}>
      <div className="max-w-7xl mx-auto p-6">
        <div className={getStyleClass('text.primary')}>
          {/* Header con breadcrumb */}
          <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/")}
                className={`p-2.5 rounded-lg border transition-colors cursor-pointer ${getStyleClass('button.home')}`}
              >
                <Home className="h-5 w-5" />
              </button>
              <div className={`p-2.5 rounded-lg border ${getStyleClass('iconBg.cyan')}`}>
                <BookOpen className={`h-5 w-5 ${getStyleClass('icons.cyan')}`} />
              </div>
              <h1 className={`text-3xl font-bold ${getStyleClass('text.primary')}`}>
                Trabajos Publicados
              </h1>
            </div>
          </div>

          <p className={`text-sm ml-20 ${getStyleClass('text.secondary')}`}>
            Gestión de trabajos publicados y artículos del grupo
          </p>

          {/* Buscador y botón */}
          <div className="flex items-center gap-4 mt-6">
            <div className="relative flex-1 max-w-md">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${getStyleClass('icons.gray')}`} />
              <Input
                placeholder="Buscar Trabajos Publicados..."
                className={`pl-10 border transition-colors ${getStyleClass('input')}`}
              />
            </div>

            <Button
              className={`flex items-center gap-2 transition-colors ${getStyleClass('button.primary')}`}
              onClick={handleNuevaPublicacion}
            >
              <Plus className="h-4 w-4" />
              Nuevo Trabajo Publicado
            </Button>
          </div>
          </div>

          {/* Cards de estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className={`rounded-lg border p-6 transition-colors ${getStyleClass('card')}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${getStyleClass('text.secondary')}`}>
                  Total Trabajos Publicados
                </p>
                <p className={`text-2xl font-bold ${getStyleClass('text.primary')}`}>
                  {publicaciones.length}
                </p>
              </div>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getStyleClass('iconBg.blue')}`}>
                <BookOpen className={`w-4 h-4 ${getStyleClass('icons.blue')}`} />
              </div>
            </div>
          </div>

          <div className={`rounded-lg border p-6 transition-colors ${getStyleClass('card')}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${getStyleClass('text.secondary')}`}>Este Año</p>
                <p className={`text-2xl font-bold ${getStyleClass('text.primary')}`}>
                  {
                    publicaciones.filter(
                      (p) => p.year === new Date().getFullYear()
                    ).length
                  }
                </p>
              </div>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getStyleClass('iconBg.green')}`}>
                <Calendar className={`w-4 h-4 ${getStyleClass('icons.green')}`} />
              </div>
            </div>
          </div>

          <div className={`rounded-lg border p-6 transition-colors ${getStyleClass('card')}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${getStyleClass('text.secondary')}`}>
                  Autores Únicos
                </p>
                <p className={`text-2xl font-bold ${getStyleClass('text.primary')}`}>5</p>
              </div>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getStyleClass('iconBg.purple')}`}>
                <Users className={`w-4 h-4 ${getStyleClass('icons.purple')}`} />
              </div>
            </div>
          </div>
          </div>

          {/* Título de sección */}
          <div className="flex items-center justify-between mb-4">
          <h3 className={`text-lg font-semibold ${getStyleClass('text.primary')}`}>
            Lista de Trabajos Publicados y Artículos
          </h3>
          <span className={`text-sm ${getStyleClass('text.secondary')}`}>
            {publicaciones.length} publicaciones
          </span>
          </div>

          {/* Lista de publicaciones */}
          <div className="space-y-4">
          {publicaciones.map((pub) => (
            <div
              key={pub.id}
              className={`rounded-lg border p-6 transition-all duration-300 hover:shadow-lg ${getStyleClass('card')} ${isDarkMode ? 'hover:border-gray-600' : 'hover:border-gray-300'}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className={`text-lg font-semibold mb-2 ${getStyleClass('text.primary')}`}>
                    {pub.title}
                  </h3>
                  <p className={`mb-3 ${getStyleClass('text.secondary')}`}>{pub.journal}</p>

                  <div className={`flex items-center gap-4 text-sm mb-3 ${getStyleClass('text.secondary')}`}>
                    <div className="flex items-center">
                      <Users className={`h-4 w-4 mr-1 ${getStyleClass('icons.gray')}`} />
                      {pub.authors?.length || 0} autores
                    </div>
                    <div className="flex items-center">
                      <Calendar className={`h-4 w-4 mr-1 ${getStyleClass('icons.gray')}`} />
                      {pub.year}
                    </div>
                  </div>

                  {/* Badge del tipo */}
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors ${getStyleClass('badge')}`}>
                    {pub.type === "article"
                      ? "Artículo"
                      : pub.type === "book"
                      ? "Libro"
                      : pub.type === "book_chapter"
                      ? "Capítulo de libro"
                      : pub.type}
                  </span>
                </div>

                {/* Botones de acción */}
                <div className="flex items-center gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className={`transition-colors ${getStyleClass('button.outline')}`}
                    onClick={() => handleVerDetalle(pub)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Ver Detalles
                  </Button>

                  {/* Botón de más opciones con menú */}
                  <div className="relative">
                    <button
                      className={`p-1 rounded transition-colors ${getStyleClass('button.menu')}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMenu(pub.id);
                      }}
                    >
                      <MoreVertical className="h-5 w-5" />
                    </button>

                    {/* Menú desplegable */}
                    {menuAbierto === pub.id && (
                      <div className={`absolute right-0 mt-1 w-48 rounded-md shadow-lg border z-10 transition-colors ${getStyleClass('menu')}`}>
                        <div className="py-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditar(pub);
                            }}
                            className={`flex items-center w-full px-4 py-2 text-sm transition-colors ${getStyleClass('button.menuEdit')}`}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEliminar(pub);
                            }}
                            className={`flex items-center w-full px-4 py-2 text-sm transition-colors ${getStyleClass('button.menuDelete')}`}
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
          onClose={() => setModalEliminar({ isOpen: false, publicacion: null })}
          onConfirm={confirmEliminar}
          publicacion={modalEliminar.publicacion}
        />

        {/* Modal de formulario (nuevo/editar) */}
        <ModalPublicacionForm
          isOpen={modalForm.isOpen}
          onClose={() =>
            setModalForm({ isOpen: false, publicacion: null, isEditing: false })
          }
          onSave={handleSaveNewPublicacion}
          publicacion={modalForm.publicacion}
          isEditing={modalForm.isEditing}
        />
    </div>
  );
}

export default TrabajosPublicados;

