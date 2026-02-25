import {
  FileText,
  BookOpen,
  Shield,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrabajos } from "../../store/slices/trabajos/trabajosActions";
import { getPatentes } from "../../store/slices/patentes/patentesActions";
import { getTrabajos as getTrabajosSelector } from "../../store/slices/trabajos/trabajosSelector";
import { getPatentes as getPatentesSelector } from "../../store/slices/patentes/petentesSelector";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const publicaciones = useSelector(getTrabajosSelector);
  const patentes = useSelector(getPatentesSelector);

  useEffect(() => {
    dispatch(getTrabajos());
    dispatch(getPatentes());
  }, [dispatch]);

  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const end = new Date(now.getFullYear() + 1, 0, 1);
  const passed = Math.floor((now - start) / (1000 * 60 * 60 * 24)) + 1;
  const total = Math.floor((end - start) / (1000 * 60 * 60 * 24));
  const percent = ((passed / total) * 100).toFixed(1);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Bienvenido al Sistema DSI
        </h1>
        <p className="text-gray-600">
          Sistema de gestión para el Departamento de Sistemas de Información
        </p>
      </div>

      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Memoria Anual */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">
              Memoria Anual
            </p>
            <p className="text-3xl font-bold text-gray-900 mb-1">2026</p>
            <p className="text-sm text-gray-500">En Progreso</p>
          </div>
        </div>

        {/* Publicaciones */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-cyan-600" />
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">
              Trabajos Publicados
            </p>
            <p className="text-3xl font-bold text-gray-900 mb-1">
              {publicaciones.length}
            </p>
          </div>
        </div>

        {/* Patentes */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Patentes</p>
            <p className="text-3xl font-bold text-gray-900 mb-1">
              {patentes.length}
            </p>
          </div>
        </div>

        {/* Progreso */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">
              Progreso del año
            </p>
            <p className="text-3xl font-bold text-gray-900 mb-1">{percent}%</p>
            <p className="text-sm text-gray-500">
              {(() => {
                const now = new Date();
                const start = new Date(now.getFullYear(), 0, 1);
                const passed =
                  Math.floor((now - start) / (1000 * 60 * 60 * 24)) + 1;
                return `${passed} días transcurridos en el año`;
              })()}
            </p>
          </div>
        </div>
      </div>

      {/* Módulos de Gestión */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Módulos de Gestión
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Memoria Anual */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Memoria Anual
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Crear y gestionar la memoria anual del grupo de investigación
            </p>
            <div className="space-y-2 mb-6">
              <p className="text-sm text-gray-500">Última actualización</p>
              <p className="text-sm font-medium">Hace 2 días</p>
            </div>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              onClick={() => navigate("/memorias-anuales")}
            >
              Gestionar Memoria
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Trabajos Publicados */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-cyan-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Trabajos Publicados
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Administrar publicaciones, artículos y trabajos realizados
            </p>
            <div className="space-y-2 mb-6">
              <p className="text-sm text-gray-500">Total trabajos publicados</p>
              <p className="text-sm font-medium">47 trabajos</p>
            </div>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              onClick={() => navigate("/trabajos-publicados")}
            >
              Ver Trabajos Publicados
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Registros y Patentes */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Registros y Patentes
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Gestionar patentes, registros y propiedad intelectual
            </p>
            <div className="space-y-2 mb-6">
              <p className="text-sm text-gray-500">Patentes activas</p>
              <p className="text-sm font-medium">8 registros</p>
            </div>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
              onClick={() => navigate("/registros-patentes")}
            >
              Ver Patentes
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
