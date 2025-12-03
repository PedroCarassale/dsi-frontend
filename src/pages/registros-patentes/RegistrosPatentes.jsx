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

  const patentes = useSelector(getPatentesSelector);
  const loading = useSelector(getPatentesLoading);
  const error = useSelector(getPatentesError);

  useEffect(() => {
    dispatch(getPatentes());
  }, [dispatch]);

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

  // 🔍 estado del buscador
  const [searchTerm, setSearchTerm] = useState("");

  // estadísticas
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

  // cerrar menú al click afuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuAbierto && !event.target.closest(".relative")) {
        setMenuAbierto(null);
      }
    };

    if (menuAbierto) {
      document.addEventListener("click", handleClickOutside);
      return () =>
        document.removeEventListener("click", handleClickOutside);
    }
  }, [menuAbierto]);

  if (selectedPatente) {
    return (
      <DetallePatente
        patente={selectedPatente}
        onBack={handleVolver}
        onUpdateSelected={setSelectedPatente}
      />
    );
  }

  if (loading && patentes.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Cargando patentes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  // ===========================================================
  // 🔍 FILTRO DE PATENTES
  // ===========================================================
  const patentesFiltradas = patentes.filter((p) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();

    return (
      p.title?.toLowerCase().includes(term) ||
      p.code?.toLowerCase().includes(term) ||
      String(p.year || "").includes(term) ||
      p.organization?.toLowerCase().includes(term)
    );
  });

  return (
    <>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate("/")}
            className="bg-gray-100 p-2.5 rounded-lg border border-gray-200 hover:bg-gray-200"
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

        {/* Buscador */}
        <div className="flex items-center gap-4 mt-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar patentes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Patentes</p>
              <p className="text-2xl font-semibold text-gray-900">
                {totalPatentes}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-500">Este Año</p>
              <p className="text-2xl font-semibold text-gray-900">{esteAño}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Título sección */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Lista de Patentes y Registros
        </h3>
        <span className="text-sm text-gray-500">
          {patentesFiltradas.length} de {patentes.length} registros
        </span>
      </div>

      {/* ===========================================================
          RESULTADOS FILTRADOS
      =========================================================== */}

      {patentesFiltradas.length === 0 ? (
        <div className="text-center text-gray-500 py-10 text-lg">
          No se encontraron resultados para la búsqueda.
        </div>
      ) : (
        <div className="space-y-4">
          {patentesFiltradas.map((patente) => (
            <div
              key={patente.id}
              className="bg-white rounded-lg border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="bg-green-100 p-3 rounded-lg border border-green-200">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>

                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900">
                      {patente.title}
                    </h4>

                    <p className="text-sm text-gray-600">
                      Código: {patente.code}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      {patente.year}
                    </div>

                    <span className="inline-block mt-3 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                      {patente.organization}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleVerDetalle(patente)}
                    className="text-gray-600 border-gray-300"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Ver Detalles
                  </Button>

                  <div className="relative">
                    <button
                      className="text-gray-400 hover:text-gray-600 p-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMenu(patente.id);
                      }}
                    >
                      <MoreVertical className="h-5 w-5" />
                    </button>

                    {menuAbierto === patente.id && (
                      <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                        <button
                          onClick={() => handleEditar(patente)}
                          className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </button>

                        <button
                          onClick={() => handleEliminar(patente)}
                          className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Eliminar
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ModalConfirmacionEliminacion
        isOpen={modalEliminar.isOpen}
        onClose={() => setModalEliminar({ isOpen: false, patente: null })}
        onConfirm={confirmEliminar}
        patente={modalEliminar.patente}
      />

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
