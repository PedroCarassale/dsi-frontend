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
  const [searchTerm, setSearchTerm] = useState("");

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

  // Filtrar publicaciones por búsqueda
  const publicacionesFiltradas = publicaciones.filter((pub) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      pub.title?.toLowerCase().includes(searchLower) ||
      pub.authors?.some((author) => author.toLowerCase().includes(searchLower)) ||
      pub.year?.toString().includes(searchLower)
    );
  });

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
    <>
      {/* Header con breadcrumb */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate("/")}
            className="bg-gray-100 p-2.5 rounded-lg border border-gray-200 hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <Home className="h-5 w-5 text-gray-600" />
          </button>
          <div className="bg-cyan-100 p-2.5 rounded-lg border border-cyan-200">
            <BookOpen className="h-5 w-5 text-cyan-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Trabajos Publicados
          </h1>
        </div>

        <p className="text-gray-600 text-sm ml-20">
          Gestión de trabajos publicados y artículos del grupo
        </p>

        {/* Buscador y botón */}
        <div className="flex items-center gap-4 mt-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar por título, autor o año..."
              className="pl-10 bg-white border-gray-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Button
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
            onClick={handleNuevaPublicacion}
          >
            <Plus className="h-4 w-4" />
            Nuevo Trabajo Publicado
          </Button>
        </div>
      </div>

      {/* Cards de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Trabajos Publicados
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {publicaciones.length}
              </p>
            </div>
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Este Año</p>
              <p className="text-2xl font-bold text-gray-900">
                {
                  publicaciones.filter(
                    (p) => p.year === new Date().getFullYear()
                  ).length
                }
              </p>
            </div>
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-4 h-4 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Autores Únicos
              </p>
              <p className="text-2xl font-bold text-gray-900">5</p>
            </div>
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-4 h-4 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Título de sección */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Lista de Trabajos Publicados y Artículos
        </h3>
        <span className="text-sm text-gray-500">
          {publicacionesFiltradas.length} de {publicaciones.length} publicaciones
        </span>
      </div>

      {/* Lista de Publicaciones */}
      {publicacionesFiltradas.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-lg font-medium mb-2">No hay trabajos publicados que coincidan</p>
          <p className="text-sm">
            {searchTerm ? "Intenta con otros términos de búsqueda" : "Crea un nuevo trabajo para comenzar"}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {publicacionesFiltradas.map((pub) => (
          <div
            key={pub.id}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {pub.title}
                </h3>
                <p className="text-gray-600 mb-3">{pub.journal}</p>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {pub.authors?.length || 0} autores
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {pub.year}
                  </div>
                </div>

                {/* Badge del tipo */}
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
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
                  className="text-gray-600 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                  onClick={() => handleVerDetalle(pub)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Ver Detalles
                </Button>

                {/* Botón de más opciones con menú */}
                <div className="relative">
                  <button
                    className="text-gray-400 hover:text-gray-600 p-1 rounded"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMenu(pub.id);
                    }}
                  >
                    <MoreVertical className="h-5 w-5" />
                  </button>

                  {/* Menú desplegable */}
                  {menuAbierto === pub.id && (
                    <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                      <div className="py-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditar(pub);
                          }}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEliminar(pub);
                          }}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
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
      )}

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
    </>
  );
}

export default TrabajosPublicados;
