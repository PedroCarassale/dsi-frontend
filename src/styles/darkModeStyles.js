// Configuración centralizada de estilos para Dark Mode

export const darkModeStyles = {
  // Contenedores principales
  background: {
    light: 'bg-gray-50',
    dark: 'bg-gray-900'
  },
  
  // Textos
  text: {
    primary: {
      light: 'text-gray-900',
      dark: 'text-white'
    },
    secondary: {
      light: 'text-gray-600',
      dark: 'text-gray-400'
    },
    tertiary: {
      light: 'text-gray-500',
      dark: 'text-gray-500'
    }
  },

  // Tarjetas y contenedores
  card: {
    light: 'bg-white border-gray-200',
    dark: 'bg-gray-800 border-gray-700'
  },

  // Botones
  button: {
    home: {
      light: 'bg-gray-100 border-gray-200 hover:bg-gray-200 text-gray-600',
      dark: 'bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-300'
    },
    primary: {
      light: 'bg-blue-600 hover:bg-blue-700 text-white',
      dark: 'bg-blue-700 hover:bg-blue-600 text-white'
    },
    outline: {
      light: 'text-gray-600 border-gray-300 hover:bg-gray-50 hover:border-gray-400',
      dark: 'text-gray-300 border-gray-600 hover:bg-gray-700 hover:border-gray-500'
    },
    darkToggle: {
      light: 'bg-gray-800 border-gray-700 text-yellow-400 hover:bg-gray-700',
      dark: 'bg-yellow-500 border-yellow-400 text-gray-900 hover:bg-yellow-400'
    }
  },

  // Inputs
  input: {
    light: 'bg-white border-gray-300 text-gray-900',
    dark: 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'
  },

  // Iconos por color
  icons: {
    blue: {
      light: 'text-blue-600',
      dark: 'text-blue-400'
    },
    green: {
      light: 'text-green-600',
      dark: 'text-green-400'
    },
    orange: {
      light: 'text-orange-600',
      dark: 'text-orange-400'
    },
    purple: {
      light: 'text-purple-600',
      dark: 'text-purple-400'
    },
    cyan: {
      light: 'text-cyan-600',
      dark: 'text-cyan-400'
    },
    gray: {
      light: 'text-gray-400',
      dark: 'text-gray-500'
    }
  },

  // Fondos de iconos
  iconBg: {
    blue: {
      light: 'bg-blue-100 border-blue-200',
      dark: 'bg-blue-900 border-blue-800'
    },
    cyan: {
      light: 'bg-cyan-100 border-cyan-200',
      dark: 'bg-cyan-900 border-cyan-800'
    }
  },

  // Badges/etiquetas
  badge: {
    orange: {
      light: 'bg-orange-500 text-white',
      dark: 'bg-orange-600 text-orange-100'
    },
    blue: {
      light: 'bg-blue-500 text-white',
      dark: 'bg-blue-600 text-blue-100'
    }
  },

  // Barras de progreso
  progress: {
    bg: {
      light: 'bg-gray-200',
      dark: 'bg-gray-700'
    },
    fill: {
      light: 'bg-blue-500',
      dark: 'bg-blue-400'
    }
  }
};

// Función helper para obtener la clase según el modo
export const getStyleClass = (styleKey, isDarkMode = false) => {
  const style = styleKey.split('.').reduce((obj, key) => obj[key], darkModeStyles);
  return isDarkMode ? style.dark : style.light;
};