import {
  FileText,
  BookOpen,
  Shield,
  TrendingUp,
  ArrowRight,
  Calendar,
  Users,
} from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "../../context/NotificationContext";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrabajos } from "../../store/slices/trabajos/trabajosActions";
import { getPatentes } from "../../store/slices/patentes/patentesActions";
import { getTrabajos as getTrabajosSelector } from "../../store/slices/trabajos/trabajosSelector";
import { getPatentes as getPatentesSelector } from "../../store/slices/patentes/petentesSelector";
import { useThemeStyles } from "../../hooks/useThemeStyles";

function Home() {
  const navigate = useNavigate();
  const { notifications } = useNotifications();
  const dispatch = useDispatch();
  const { isDarkMode, getStyleClass } = useThemeStyles();

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

  // Filtrar las últimas 4 actividades para mostrar
  const recentActivities = notifications.slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-2 transition-colors ${getStyleClass('text.primary')}`}>
            Bienvenido al Sistema DSI
          </h1>
          <p className={`transition-colors ${getStyleClass('text.secondary')}`}>
            Sistema de gestión para el Departamento de Sistemas de Información
          </p>
        </div>

      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Memoria Anual */}
        <div className={`rounded-lg border p-6 transition-all duration-300 ${getStyleClass('card')}`}>
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getStyleClass('iconBg.blue')}`}>
              <FileText className={`w-6 h-6 ${getStyleClass('icons.blue')}`} />
            </div>
          </div>
          <div>
            <p className={`text-sm font-medium mb-1 ${getStyleClass('text.muted')}`}>
              Memoria Anual
            </p>
            <p className={`text-3xl font-bold mb-1 ${getStyleClass('text.primary')}`}>2025</p>
            <p className={`text-sm ${getStyleClass('text.muted')}`}>En Progreso</p>
          </div>
        </div>

        {/* Publicaciones */}
        <div className={`rounded-lg border p-6 transition-all duration-300 ${getStyleClass('card')}`}>
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getStyleClass('iconBg.cyan')}`}>
              <BookOpen className={`w-6 h-6 ${getStyleClass('icons.cyan')}`} />
            </div>
          </div>
          <div>
            <p className={`text-sm font-medium mb-1 ${getStyleClass('text.muted')}`}>
              Trabajos Publicados
            </p>
            <p className={`text-3xl font-bold mb-1 ${getStyleClass('text.primary')}`}>
              {publicaciones.length}
            </p>
            <p className={`text-sm ${getStyleClass('text.muted')}`}>
              +
              {
                publicaciones.filter((p) => p.year === new Date().getFullYear())
                  .length
              }{" "}
              este año
            </p>
          </div>
        </div>

        {/* Patentes */}
        <div className={`rounded-lg border p-6 transition-all duration-300 ${getStyleClass('card')}`}>
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getStyleClass('iconBg.green')}`}>
              <Shield className={`w-6 h-6 ${getStyleClass('icons.green')}`} />
            </div>
          </div>
          <div>
            <p className={`text-sm font-medium mb-1 ${getStyleClass('text.muted')}`}>Patentes</p>
            <p className={`text-3xl font-bold mb-1 ${getStyleClass('text.primary')}`}>
              {patentes.length}
            </p>
            <p className={`text-sm ${getStyleClass('text.muted')}`}>
              +
              {
                patentes.filter((p) => p.year === new Date().getFullYear())
                  .length
              }{" "}
              este año
            </p>
          </div>
        </div>

        {/* Progreso */}
        <div className={`rounded-lg border p-6 transition-all duration-300 ${getStyleClass('card')}`}>
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getStyleClass('iconBg.emerald')}`}>
              <TrendingUp className={`w-6 h-6 ${getStyleClass('icons.emerald')}`} />
            </div>
          </div>
          <div>
            <p className={`text-sm font-medium mb-1 ${getStyleClass('text.muted')}`}>
              Progreso del año
            </p>
            <p className={`text-3xl font-bold mb-1 ${getStyleClass('text.primary')}`}>{percent}%</p>
            <p className={`text-sm ${getStyleClass('text.muted')}`}>
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
        <h2 className={`text-xl font-semibold mb-6 transition-colors ${getStyleClass('text.primary')}`}>
          Módulos de Gestión
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Memoria Anual */}
          <div className={`rounded-lg border p-6 transition-all duration-300 ${getStyleClass('card')} ${getStyleClass('card.hover')}`}>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${getStyleClass('iconBg.blue')}`}>
              <FileText className={`w-6 h-6 ${getStyleClass('icons.blue')}`} />
            </div>
            <h3 className={`text-lg font-semibold mb-2 transition-colors ${getStyleClass('text.primary')}`}>
              Memoria Anual
            </h3>
            <p className={`text-sm mb-4 transition-colors ${getStyleClass('text.secondary')}`}>
              Crear y gestionar la memoria anual del grupo de investigación
            </p>
            <div className="space-y-2 mb-6">
              <p className={`text-sm ${getStyleClass('text.muted')}`}>Última actualización</p>
              <p className={`text-sm font-medium ${getStyleClass('text.primary')}`}>Hace 2 días</p>
            </div>
            <Button
              variant="outline"
              className={`w-full flex items-center justify-center gap-2 transition-colors ${getStyleClass('button.outline')}`}
              onClick={() => navigate("/memorias-anuales")}
            >
              Gestionar Memoria
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Trabajos Publicados */}
          <div className={`rounded-lg border p-6 transition-all duration-300 ${getStyleClass('card')} ${getStyleClass('card.hover')}`}>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${getStyleClass('iconBg.cyan')}`}>
              <BookOpen className={`w-6 h-6 ${getStyleClass('icons.cyan')}`} />
            </div>
            <h3 className={`text-lg font-semibold mb-2 transition-colors ${getStyleClass('text.primary')}`}>
              Trabajos Publicados
            </h3>
            <p className={`text-sm mb-4 transition-colors ${getStyleClass('text.secondary')}`}>
              Administrar publicaciones, artículos y trabajos realizados
            </p>
            <div className="space-y-2 mb-6">
              <p className={`text-sm ${getStyleClass('text.muted')}`}>Total trabajos publicados</p>
              <p className={`text-sm font-medium ${getStyleClass('text.primary')}`}>47 trabajos</p>
            </div>
            <Button
              variant="outline"
              className={`w-full flex items-center justify-center gap-2 transition-colors ${getStyleClass('button.outline')}`}
              onClick={() => navigate("/trabajos-publicados")}
            >
              Ver Trabajos Publicados
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Registros y Patentes */}
          <div className={`rounded-lg border p-6 transition-all duration-300 ${getStyleClass('card')} ${getStyleClass('card.hover')}`}>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${getStyleClass('iconBg.green')}`}>
              <Shield className={`w-6 h-6 ${getStyleClass('icons.green')}`} />
            </div>
            <h3 className={`text-lg font-semibold mb-2 transition-colors ${getStyleClass('text.primary')}`}>
              Registros y Patentes
            </h3>
            <p className={`text-sm mb-4 transition-colors ${getStyleClass('text.secondary')}`}>
              Gestionar patentes, registros y propiedad intelectual
            </p>
            <div className="space-y-2 mb-6">
              <p className={`text-sm ${getStyleClass('text.muted')}`}>Patentes activas</p>
              <p className={`text-sm font-medium ${getStyleClass('text.primary')}`}>8 registros</p>
            </div>
            <Button
              variant="outline"
              className={`w-full flex items-center justify-center gap-2 transition-colors ${getStyleClass('button.outline')}`}
              onClick={() => navigate("/registros-patentes")}
            >
              Ver Patentes
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

        {/* Actividad Reciente */}
        <div>
          <h2 className={`text-xl font-semibold mb-6 transition-colors ${getStyleClass('text.primary')}`}>
            Actividad Reciente
          </h2>
        <div className="space-y-4">
          {recentActivities.map((activity) => {
            const getActivityIcon = () => {
              switch (activity.type) {
                case "publicacion":
                  return <BookOpen className={`h-6 w-6 ${getStyleClass('icons.cyan')}`} />;
                case "patente":
                  return <Shield className={`h-6 w-6 ${getStyleClass('icons.green')}`} />;
                case "memoria":
                  return <FileText className={`h-6 w-6 ${getStyleClass('icons.blue')}`} />;
                default:
                  return <FileText className={`h-6 w-6 ${getStyleClass('icons.gray')}`} />;
              }
            };

            const getActivityBgColor = () => {
              switch (activity.type) {
                case "publicacion":
                  return getStyleClass('iconBg.cyan');
                case "patente":
                  return getStyleClass('iconBg.green');
                case "memoria":
                  return getStyleClass('iconBg.blue');
                default:
                  return isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200';
              }
            };

            return (
              <div
                key={activity.id}
                className={`rounded-lg border p-6 transition-all duration-300 cursor-pointer ${getStyleClass('card')} ${getStyleClass('card.hover')}`}
                onClick={() => navigate(activity.link)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="flex-shrink-0">
                      <div
                        className={`p-3 rounded-lg border ${getActivityBgColor()}`}
                      >
                        {getActivityIcon()}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className={`text-lg font-semibold mb-1 transition-colors ${getStyleClass('text.primary')}`}>
                        {activity.title}
                      </h4>
                      <p className={`text-sm mb-2 transition-colors ${getStyleClass('text.secondary')}`}>
                        {activity.message}
                      </p>

                      <div className={`flex items-center gap-4 text-sm transition-colors ${getStyleClass('text.muted')}`}>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        </div>
      </div>
  );
}

export default Home;

