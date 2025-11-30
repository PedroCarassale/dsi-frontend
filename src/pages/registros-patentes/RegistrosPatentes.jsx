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
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Cargando patentes...</div>
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

  return (
    <>
      {/* Sección de título con breadcrumb */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate("/")}
            className="bg-gray-100 p-2.5 rounded-lg border border-gray-200 hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <Home className="h-5 w-5 text-gray-600" />
          </button>
          <div className="bg-green-100 p-2.5 rounded-lg border border-green-200">
            <Shield className="h-5 w-5 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Registros y Patentes
          </h1>
        </div>

        <p className="text-gray-600 text-sm ml-20">
          Gestión de propiedad intelectual del grupo
        </p>

        {/* Buscador y botón */}
        <div className="flex items-center gap-4 mt-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar patentes..."
              className="pl-10 bg-white border-gray-200"
            />
          </div>

          <Button
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
            onClick={handleNuevaPatente}
          >
            <Plus className="h-4 w-4" />
            Nueva Patente
          </Button>
        </div>
      </div>

      {/* Cards de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Total Patentes */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                Total Patentes
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {totalPatentes}
              </p>
              <p className="text-sm text-gray-500 mt-1">Registradas</p>
            </div>
          </div>
        </div>

        {/* Este Año */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Este Año</p>
              <p className="text-2xl font-semibold text-gray-900">{esteAño}</p>
              <p className="text-sm text-gray-500 mt-1">2025</p>
            </div>
          </div>
        </div>
      </div>

      {/* Título de sección */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Lista de Patentes y Registros
        </h3>
        <span className="text-sm text-gray-500">
          {patentes.length} registros
        </span>
      </div>

      {/* Lista de Patentes - Cards individuales */}
      <div className="space-y-4">
        {patentes.map((patente) => (
          <div
            key={patente.id}
            className="bg-white rounded-lg border border-gray-200 p-6"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <div className="flex-shrink-0">
                  <div className="bg-green-100 p-3 rounded-lg border border-green-200">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">
                    {patente.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Código: {patente.code}
                  </p>

                  {/* Información adicional con iconos */}
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>{patente.year}</span>
                    </div>
                  </div>

                  {/* Badge del tipo */}
                  <div className="mt-3">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
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
                  className="text-gray-600 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                  onClick={() => handleVerDetalle(patente)}
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
                      toggleMenu(patente.id);
                    }}
                  >
                    <MoreVertical className="h-5 w-5" />
                  </button>

                  {/* Menú desplegable */}
                  {menuAbierto === patente.id && (
                    <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                      <div className="py-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditar(patente);
                          }}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEliminar(patente);
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
    </>
  );
}

export default RegistrosPatentes;
