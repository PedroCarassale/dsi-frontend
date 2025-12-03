import {
  Plus,
  Search,
  Home,
  FolderOpen,
  FileText,
  CheckCircle,
  Clock,
  TrendingUp,
  Eye,
  Users,
  Calendar,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMemorias } from "../../store/slices/memorias/memoriasActions";
import {
  getMemorias as getMemoriasSelector,
  getMemoriasLoading,
  getMemoriasError,
} from "../../store/slices/memorias/memoriasSelector";
import DetalleMemoria from "./DetalleMemoria";
import EditarMemoria from "./EditarMemoria";
import NuevaMemoria from "./NuevaMemoria";

function MemoriasAnuales() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const memorias = useSelector(getMemoriasSelector);
  const loading = useSelector(getMemoriasLoading);
  const error = useSelector(getMemoriasError);

  useEffect(() => {
    dispatch(getMemorias());
  }, [dispatch]);

  const [selectedMemoria, setSelectedMemoria] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const [searchYear, setSearchYear] = useState("");

  const handleVerDetalle = (memoria) => {
    setSelectedMemoria(memoria);
    setIsEditing(false);
  };

  const handleVolver = () => {
    setSelectedMemoria(null);
    setIsEditing(false);
    setIsCreating(false);
  };

  const handleNuevaMemoria = () => setIsCreating(true);

  if (loading && memorias.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Cargando memorias...</p>
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

  if (isCreating) return <NuevaMemoria onBack={handleVolver} />;
  if (selectedMemoria && isEditing)
    return <EditarMemoria memoria={selectedMemoria} onBack={handleVolver} />;
  if (selectedMemoria)
    return (
      <DetalleMemoria
        memoria={selectedMemoria}
        onBack={handleVolver}
        onEdit={() => setIsEditing(true)}
      />
    );

  const totalMemorias = memorias.length;
  const currentYear = new Date().getFullYear();
  const completadas = memorias.filter((m) => m.year !== currentYear).length;
  const enProgreso = memorias.filter((m) => m.year === currentYear).length;

  const memoriasFiltradas = memorias.filter((m) => {
    if (!searchYear) return true;
    return String(m.year).includes(searchYear.trim());
  });

  return (
    <>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate("/")}
            className="bg-gray-100 p-2.5 rounded-lg border hover:bg-gray-200"
          >
            <Home className="h-5 w-5 text-gray-600" />
          </button>

          <div className="bg-cyan-100 p-2.5 rounded-lg border">
            <FolderOpen className="h-5 w-5 text-cyan-600" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900">Memoria Anual</h1>
        </div>

        <p className="text-gray-600 ml-20 text-sm">
          Gestión de memorias anuales del grupo
        </p>

        <div className="flex gap-4 mt-6">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar por año..."
              value={searchYear}
              onChange={(e) => setSearchYear(e.target.value)}
              className="pl-10"
            />
          </div>

          <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleNuevaMemoria}>
            <Plus className="h-4 w-4 mr-2" /> Nueva Memoria
          </Button>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border p-6 rounded-lg">
          <FileText className="text-blue-600 h-8 w-8" />
          <p className="text-sm text-gray-500 mt-2">Total</p>
          <p className="text-2xl font-bold">{totalMemorias}</p>
        </div>

        <div className="bg-white border p-6 rounded-lg">
          <CheckCircle className="text-green-600 h-8 w-8" />
          <p className="text-sm text-gray-500 mt-2">Completadas</p>
          <p className="text-2xl font-bold">{completadas}</p>
        </div>

        <div className="bg-white border p-6 rounded-lg">
          <Clock className="text-orange-600 h-8 w-8" />
          <p className="text-sm text-gray-500 mt-2">En Progreso</p>
          <p className="text-2xl font-bold">{enProgreso}</p>
        </div>

        <div className="bg-white border p-6 rounded-lg">
          <TrendingUp className="text-purple-600 h-8 w-8" />
          <p className="text-sm text-gray-500 mt-2">Año Actual</p>
          <p className="text-2xl font-bold">{currentYear}</p>
        </div>
      </div>

      {/* Lista */}
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-lg font-semibold">Memorias Anuales</h3>
        <span className="text-sm text-gray-500">
          {memoriasFiltradas.length} de {memorias.length} resultados
        </span>
      </div>

      <div className="space-y-4">
        {/* ⛔ MENSAJE DE NO RESULTADOS */}
        {memoriasFiltradas.length === 0 && (
          <div className="text-center py-10 text-gray-500 text-lg">
            No se encontraron resultados para la búsqueda.
          </div>
        )}

        {/* ✅ LISTA FILTRADA */}
        {memoriasFiltradas.length > 0 &&
          memoriasFiltradas.map((memoria) => (
            <div key={memoria.id} className="bg-white border p-6 rounded-lg">
              <div className="flex justify-between">
                <div>
                  <h4 className="text-lg font-semibold">{memoria.name}</h4>
                  <p className="text-sm text-gray-500">Año {memoria.year}</p>
                </div>

                <Button
                  variant="outline"
                  onClick={() => handleVerDetalle(memoria)}
                >
                  <Eye className="h-4 w-4 mr-2" /> Ver Detalles
                </Button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default MemoriasAnuales;
