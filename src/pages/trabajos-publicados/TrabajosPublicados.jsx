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

  const publicaciones = useSelector(getTrabajosSelector);
  const loading = useSelector(getTrabajosLoading);
  const error = useSelector(getTrabajosError);

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

  // 🔍 Estado del buscador
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getTrabajos());
  }, [dispatch]);

  const handleVerDetalle = (publicacion) => {
    setPublicacionSeleccionada(publicacion);
  };

  const handleVolver = () => setPublicacionSeleccionada(null);

  const handleEditar = (publicacion) =>
    setModalForm({ isOpen: true, publicacion, isEditing: true });

  const handleEliminar = (publicacion) =>
    setModalEliminar({ isOpen: true, publicacion });

  const confirmEliminar = (publicacion) =>
    dispatch(deleteTrabajo(publicacion.id));

  const toggleMenu = (id) =>
    setMenuAbierto(menuAbierto === id ? null : id);

  // Cerrar menú al hacer click fuera
  useEffect(() => {
    const handler = (e) => {
      if (menuAbierto && !e.target.closest(".menu-ref")) {
        setMenuAbierto(null);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuAbierto]);

  if (loading && publicaciones.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Cargando trabajos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (publicacionSeleccionada) {
    return (
      <DetallePublicacion
        publicacion={publicacionSeleccionada}
        onBack={handleVolver}
        onUpdateSelected={setPublicacionSeleccionada}
      />
    );
  }

  // =====================================================
  // 🔍 FILTRADO
  // =====================================================
  const publicacionesFiltradas = publicaciones.filter((pub) => {
    if (!searchTerm) return true;

    const t = searchTerm.toLowerCase();

    return (
      pub.title?.toLowerCase().includes(t) ||
      pub.journal?.toLowerCase().includes(t) ||
      String(pub.year).includes(t) ||
      pub.type?.toLowerCase().includes(t) ||
      pub.authors?.some((a) => a.toLowerCase().includes(t))
    );
  });

  return (
    <>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate("/")}
            className="bg-gray-100 p-2.5 rounded-lg border hover:bg-gray-200"
          >
            <Home className="h-5 w-5 text-gray-600" />
          </button>

          <div className="bg-cyan-100 p-2.5 rounded-lg border">
            <BookOpen className="h-5 w-5 text-cyan-600" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900">Trabajos Publicados</h1>
        </div>

        <p className="text-gray-600 ml-20 text-sm">
          Gestión de trabajos publicados y artículos del grupo
        </p>

        {/* Buscador */}
        <div className="flex items-center gap-4 mt-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar Trabajos Publicados..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white border-gray-200"
            />
          </div>

          <Button
            className="bg-blue-600 hover:bg-blue-700 flex gap-2"
            onClick={() =>
              setModalForm({ isOpen: true, publicacion: null, isEditing: false })
            }
          >
            <Plus className="h-4 w-4" /> Nuevo Trabajo Publicado
          </Button>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 border rounded-lg">
          <p className="text-sm text-gray-500">Total Trabajos Publicados</p>
          <p className="text-2xl font-semibold">{publicaciones.length}</p>
        </div>

        <div className="bg-white p-6 border rounded-lg">
          <p className="text-sm text-gray-500">Este Año</p>
          <p className="text-2xl font-semibold">
            {publicaciones.filter((p) => p.year === new Date().getFullYear()).length}
          </p>
        </div>

        <div className="bg-white p-6 border rounded-lg">
          <p className="text-sm text-gray-500">Autores Únicos</p>
          <p className="text-2xl font-semibold">
            {new Set(publicaciones.flatMap((p) => p.authors || [])).size}
          </p>
        </div>
      </div>

      {/* Título sección */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Lista de Trabajos</h3>
        <span className="text-sm text-gray-500">
          {publicacionesFiltradas.length} de {publicaciones.length} resultados
        </span>
      </div>

      {/* =====================================================
          RESULTADOS
      ===================================================== */}
      <div className="space-y-4">
        {/* ⛔ No resultados */}
        {publicacionesFiltradas.length === 0 && (
          <div className="text-center py-10 text-gray-500 text-lg">
            No se encontraron resultados para la búsqueda.
          </div>
        )}

        {/* ✅ Lista */}
        {publicacionesFiltradas.length > 0 &&
          publicacionesFiltradas.map((pub) => (
            <div
              key={pub.id}
              className="bg-white border p-6 rounded-lg hover:shadow-sm transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{pub.title}</h3>
                  <p className="text-gray-600">{pub.journal}</p>
                  <div className="flex gap-4 text-sm text-gray-500 mt-2">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {pub.authors?.length || 0} autores
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {pub.year}
                    </span>
                  </div>
                  <span className="inline-block mt-3 px-3 py-1 text-sm bg-gray-100 rounded-full">
                    {pub.type}
                  </span>
                </div>

                <div className="flex items-center gap-2 menu-ref">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleVerDetalle(pub)}
                  >
                    <Eye className="h-4 w-4 mr-2" /> Ver Detalles
                  </Button>

                  <div className="relative">
                    <button
                      className="p-1 text-gray-400 hover:text-gray-600"
                      onClick={() => toggleMenu(pub.id)}
                    >
                      <MoreVertical />
                    </button>

                    {menuAbierto === pub.id && (
                      <div className="absolute right-0 mt-1 w-40 bg-white border rounded shadow-md z-10">
                        <button
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
                          onClick={() => handleEditar(pub)}
                        >
                          <Edit className="h-4 w-4" /> Editar
                        </button>

                        <button
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                          onClick={() => handleEliminar(pub)}
                        >
                          <Trash2 className="h-4 w-4" /> Eliminar
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Modales */}
      <ModalConfirmacionEliminacion
        isOpen={modalEliminar.isOpen}
        onClose={() => setModalEliminar({ isOpen: false, publicacion: null })}
        onConfirm={confirmEliminar}
        publicacion={modalEliminar.publicacion}
      />

      <ModalPublicacionForm
        isOpen={modalForm.isOpen}
        onClose={() =>
          setModalForm({ isOpen: false, publicacion: null, isEditing: false })
        }
        publicacion={modalForm.publicacion}
        isEditing={modalForm.isEditing}
      />
    </>
  );
}

export default TrabajosPublicados;
