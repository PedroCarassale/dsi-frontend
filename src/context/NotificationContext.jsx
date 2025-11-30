import { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'publicacion',
      title: 'Nueva publicación agregada',
      message: 'Machine Learning Applications in Healthcare',
      time: 'Hace 2 horas',
      read: false,
      link: '/trabajos-publicados'
    },
    {
      id: 2,
      type: 'patente',
      title: 'Patente actualizada',
      message: 'Sistema de Diagnóstico Automatizado - Estado: Aprobado',
      time: 'Hace 5 horas',
      read: false,
      link: '/registros-patentes'
    },
    {
      id: 3,
      type: 'memoria',
      title: 'Memoria anual actualizada',
      message: 'Sección de resultados 2024 completada',
      time: 'Hace 1 día',
      read: false,
      link: '/memorias-anuales'
    }
  ]);

  const addNotification = (notification) => {
    const newNotification = {
      ...notification,
      id: Date.now(),
      read: false,
      time: 'Ahora'
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId
          ? { ...notif, read: true }
          : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const getUnreadCount = () => {
    return notifications.filter(notif => !notif.read).length;
  };

  const value = {
    notifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    getUnreadCount
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};