import { FileText, BookOpen, Shield, TrendingUp, ArrowRight, Calendar, Users } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "../context/NotificationContext";

function Home() {
  const navigate = useNavigate();
  const { notifications } = useNotifications();

  // Filtrar las últimas 4 actividades para mostrar
  const recentActivities = notifications.slice(0, 4);

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
            <p className="text-sm font-medium text-gray-500 mb-1">Memoria Anual</p>
            <p className="text-3xl font-bold text-gray-900 mb-1">2025</p>
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
            <p className="text-sm font-medium text-gray-500 mb-1">Publicaciones</p>
            <p className="text-3xl font-bold text-gray-900 mb-1">47</p>
            <p className="text-sm text-gray-500">+12 este año</p>
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
            <p className="text-3xl font-bold text-gray-900 mb-1">8</p>
            <p className="text-sm text-gray-500">+3 este año</p>
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
            <p className="text-sm font-medium text-gray-500 mb-1">Progreso</p>
            <p className="text-3xl font-bold text-gray-900 mb-1">68%</p>
            <p className="text-sm text-gray-500">Completado</p>
          </div>
        </div>
      </div>

      {/* Módulos de Gestión */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Módulos de Gestión</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Memoria Anual */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Memoria Anual</h3>
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
              onClick={() => navigate('/memorias-anuales')}
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
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Trabajos Publicados</h3>
            <p className="text-gray-600 text-sm mb-4">
              Administrar publicaciones, artículos y trabajos realizados
            </p>
            <div className="space-y-2 mb-6">
              <p className="text-sm text-gray-500">Total publicaciones</p>
              <p className="text-sm font-medium">47 trabajos</p>
            </div>
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2"
              onClick={() => navigate('/trabajos-publicados')}
            >
              Ver Publicaciones
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Registros y Patentes */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Registros y Patentes</h3>
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
              onClick={() => navigate('/registros-patentes')}
            >
              Ver Patentes
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Actividad Reciente */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Actividad Reciente</h2>
        <div className="space-y-4">
          {recentActivities.map((activity) => {
            const getActivityIcon = () => {
              switch (activity.type) {
                case 'publicacion':
                  return <BookOpen className="h-6 w-6 text-cyan-600" />;
                case 'patente':
                  return <Shield className="h-6 w-6 text-green-600" />;
                case 'memoria':
                  return <FileText className="h-6 w-6 text-blue-600" />;
                default:
                  return <FileText className="h-6 w-6 text-gray-600" />;
              }
            };

            const getActivityBgColor = () => {
              switch (activity.type) {
                case 'publicacion':
                  return 'bg-cyan-100 border-cyan-200';
                case 'patente':
                  return 'bg-green-100 border-green-200';
                case 'memoria':
                  return 'bg-blue-100 border-blue-200';
                default:
                  return 'bg-gray-100 border-gray-200';
              }
            };

            return (
              <div 
                key={activity.id}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(activity.link)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="flex-shrink-0">
                      <div className={`p-3 rounded-lg border ${getActivityBgColor()}`}>
                        {getActivityIcon()}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">{activity.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{activity.message}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
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