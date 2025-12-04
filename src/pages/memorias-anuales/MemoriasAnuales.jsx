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
  Moon,
  Sun,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useThemeStyles } from "../../hooks/useThemeStyles";
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
  const { isDarkMode, getStyleClass } = useThemeStyles();

  // Redux state
  const memorias = useSelector(getMemoriasSelector);
  const loading = useSelector(getMemoriasLoading);
  const error = useSelector(getMemoriasError);

  // Cargar memorias al montar el componente
  useEffect(() => {
    dispatch(getMemorias());
  }, [dispatch]);

  // Estados para navegación
  const [selectedMemoria, setSelectedMemoria] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // Función para manejar ver detalle
  const handleVerDetalle = (memoria) => {
    setSelectedMemoria(memoria);
    setIsEditing(false);
  };

  // Función para manejar editar memoria
  const handleEditarMemoria = () => {
    setIsEditing(true);
  };

  // Función para manejar nueva memoria
  const handleNuevaMemoria = () => {
    setIsCreating(true);
  };

  // Función para volver a la lista
  const handleVolver = () => {
    setSelectedMemoria(null);
    setIsEditing(false);
    setIsCreating(false);
  };

  // Mostrar loading
  if (loading && memorias.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Cargando memorias...</div>
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

  // Si está creando una nueva memoria
  if (isCreating) {
    return <NuevaMemoria onBack={handleVolver} />;
  }

  // Si hay una memoria seleccionada y está en modo edición
  if (selectedMemoria && isEditing) {
    return <EditarMemoria memoria={selectedMemoria} onBack={handleVolver} />;
  }

  // Si hay una memoria seleccionada, mostrar el detalle
  if (selectedMemoria) {
    return (
      <DetalleMemoria
        memoria={selectedMemoria}
        onBack={handleVolver}
        onEdit={handleEditarMemoria}
      />
    );
  }

  // Estadísticas calculadas
  const totalMemorias = memorias.length;
  const completadas = memorias.filter(
    (m) => m.year === new Date().getFullYear()
  ).length;
  const enProgreso = memorias.filter(
    (m) => m.year !== new Date().getFullYear()
  ).length;

  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const end = new Date(now.getFullYear() + 1, 0, 1);
  const passed = Math.floor((now - start) / (1000 * 60 * 60 * 24)) + 1;
  const total = Math.floor((end - start) / (1000 * 60 * 60 * 24));
  const tasaFinalizacion = ((passed / total) * 100).toFixed(1);

  return (
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
            <div className={`p-2.5 rounded-lg border ${getStyleClass('iconBg.cyan')}`}>
              <FolderOpen className={`h-5 w-5 ${getStyleClass('icons.cyan')}`} />
            </div>
            <h1 className={`text-3xl font-bold ${getStyleClass('text.primary')}`}>
              Memoria Anual
            </h1>
          </div>

          <p className={`text-sm ml-20 ${getStyleClass('text.secondary')}`}>
            Gestión de memorias anuales del grupo
          </p>

          {/* Barra de búsqueda y botón Nueva Memoria */}
          <div className="flex items-center gap-4 mt-6">
            <div className="relative w-80">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${getStyleClass('icons.gray')}`} />
              <Input
                type="text"
                placeholder="Buscar por año..."
                className={`pl-10 border transition-colors ${getStyleClass('input')}`}
              />
            </div>

            <Button
              className={`transition-colors ${getStyleClass('button.primary')}`}
              onClick={handleNuevaMemoria}
            >
              <Plus className="h-4 w-4 mr-2" />
              Nueva Memoria
            </Button>
          </div>
        </div>

        {/* Cards de estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Memorias */}
          <div className={`rounded-lg border p-6 transition-colors ${getStyleClass('card')}`}>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FileText className={`h-8 w-8 ${getStyleClass('icons.blue')}`} />
              </div>
              <div className="ml-4">
                <p className={`text-sm font-medium ${getStyleClass('text.secondary')}`}>
                  Total Memorias
                </p>
                <p className={`text-2xl font-semibold ${getStyleClass('text.primary')}`}>
                  {totalMemorias}
                </p>
              </div>
            </div>
          </div>

          {/* Completadas */}
          <div className={`rounded-lg border p-6 transition-colors ${getStyleClass('card')}`}>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle className={`h-8 w-8 ${getStyleClass('icons.green')}`} />
              </div>
              <div className="ml-4">
                <p className={`text-sm font-medium ${getStyleClass('text.secondary')}`}>Completadas</p>
                <p className={`text-2xl font-semibold ${getStyleClass('text.primary')}`}>
                  {completadas}
                </p>
              </div>
            </div>
          </div>

          {/* En Progreso */}
          <div className={`rounded-lg border p-6 transition-colors ${getStyleClass('card')}`}>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Clock className={`h-8 w-8 ${getStyleClass('icons.orange')}`} />
              </div>
              <div className="ml-4">
                <p className={`text-sm font-medium ${getStyleClass('text.secondary')}`}>En Progreso</p>
                <p className={`text-2xl font-semibold ${getStyleClass('text.primary')}`}>
                  {enProgreso}
                </p>
              </div>
            </div>
          </div>

          {/* Tasa de Finalización */}
          <div className={`rounded-lg border p-6 transition-colors ${getStyleClass('card')}`}>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className={`h-8 w-8 ${getStyleClass('icons.purple')}`} />
              </div>
              <div className="ml-4">
                <p className={`text-sm font-medium ${getStyleClass('text.secondary')}`}>
                  Tasa de Finalización
                </p>
                <p className={`text-2xl font-semibold ${getStyleClass('text.primary')}`}>
                  {tasaFinalizacion}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Título de sección */}
        <div className="mb-4">
          <h3 className={`text-lg font-semibold ${getStyleClass('text.primary')}`}>
            Memorias Anuales
          </h3>
        </div>

        {/* Lista de Memorias Anuales - Cards individuales */}
        <div className="space-y-4">
          {memorias.map((memoria) => (
            <div
              key={memoria.id}
              className={`rounded-lg border p-6 transition-all duration-300 hover:shadow-lg ${getStyleClass('card')} ${isDarkMode ? 'hover:border-gray-600' : 'hover:border-gray-300'}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className={`p-3 rounded-lg border ${getStyleClass('iconBg.blue')}`}>
                      <FileText className={`h-6 w-6 ${getStyleClass('icons.blue')}`} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h4 className={`text-lg font-semibold ${getStyleClass('text.primary')}`}>
                        {memoria.name}
                      </h4>
                      <span
                        className={`px-2 py-0.5 text-xs font-medium rounded transition-colors ${
                          memoria.year === new Date().getFullYear()
                            ? getStyleClass('badge.orange')
                            : getStyleClass('badge.blue')
                        }`}
                      >
                        {memoria.year === new Date().getFullYear()
                          ? "En Progreso"
                          : "Completada"}
                      </span>
                    </div>
                    <p className={`text-sm mt-1 ${getStyleClass('text.secondary')}`}>
                      Última actualización: {memoria.lastUpdate}
                    </p>

                    {/* Información adicional con iconos */}
                    <div className={`flex items-center gap-6 mt-2 text-sm ${getStyleClass('text.secondary')}`}>
                      <div className="flex items-center gap-1">
                        <FileText className={`h-4 w-4 ${getStyleClass('icons.gray')}`} />
                        <span>{memoria.works?.length || 0} publicaciones</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className={`h-4 w-4 ${getStyleClass('icons.gray')}`} />
                        <span>{memoria.patents?.length || 0} patentes</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className={`h-4 w-4 ${getStyleClass('icons.gray')}`} />
                        <span>Año {memoria.year}</span>
                      </div>
                    </div>

                    {/* Barra de progreso - más larga */}
                    {memoria.status === "En Progreso" && (
                      <div className="mt-4 pr-32">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className={getStyleClass('text.secondary')}>
                            Progreso
                          </span>
                          <span className={`font-medium ${getStyleClass('text.primary')}`}>
                            {memoria.progress}%
                          </span>
                        </div>
                        <div className={`w-full rounded-full h-2 ${getStyleClass('progress.bg')}`}>
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${getStyleClass('progress.fill')}`}
                            style={{ width: `${memoria.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Botón Ver Detalles */}
                <Button
                  variant="outline"
                  size="sm"
                  className={`transition-colors ${getStyleClass('button.outline')}`}
                  onClick={() => handleVerDetalle(memoria)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Ver Detalles
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MemoriasAnuales;


