import { useDarkMode } from '../context/DarkModeContext';

// Definición centralizada de todos los estilos de tema
const themeStyles = {
  'background': (isDark) => isDark ? 'bg-gray-900' : 'bg-gray-50',
  'text.primary': (isDark) => isDark ? 'text-white' : 'text-gray-900',
  'text.secondary': (isDark) => isDark ? 'text-gray-400' : 'text-gray-600',
  'text.muted': (isDark) => isDark ? 'text-gray-500' : 'text-gray-500',
  
  // Cards
  'card': (isDark) => isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200',
  'card.hover': (isDark) => isDark ? 'hover:shadow-lg hover:border-gray-600' : 'hover:shadow-md hover:border-gray-300',
  
  // Buttons
  'button.home': (isDark) => isDark ? 'bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-300' : 'bg-gray-100 border-gray-200 hover:bg-gray-200 text-gray-600',
  'button.primary': (isDark) => isDark ? 'bg-blue-700 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white',
  'button.outline': (isDark) => isDark ? 'text-white border-gray-600 hover:bg-gray-700 hover:border-gray-500 bg-gray-800' : 'text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400 bg-white',
  'button.darkToggle': (isDark) => isDark ? 'bg-yellow-500 border-yellow-400 text-gray-900 hover:bg-yellow-400' : 'bg-gray-800 border-gray-700 text-yellow-400 hover:bg-gray-700',
  'button.menu': (isDark) => isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600',
  'button.menuEdit': (isDark) => isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100',
  'button.menuDelete': (isDark) => isDark ? 'text-red-400 hover:bg-red-900/20' : 'text-red-600 hover:bg-red-50',
  
  // Inputs
  'input': (isDark) => isDark ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900',
  
  // Icons
  'icons.blue': (isDark) => isDark ? 'text-blue-400' : 'text-blue-600',
  'icons.cyan': (isDark) => isDark ? 'text-cyan-400' : 'text-cyan-600',
  'icons.green': (isDark) => isDark ? 'text-green-400' : 'text-green-600',
  'icons.emerald': (isDark) => isDark ? 'text-emerald-400' : 'text-emerald-600',
  'icons.orange': (isDark) => isDark ? 'text-orange-400' : 'text-orange-600',
  'icons.purple': (isDark) => isDark ? 'text-purple-400' : 'text-purple-600',
  'icons.gray': (isDark) => isDark ? 'text-gray-500' : 'text-gray-400',
  
  // Icon Backgrounds
  'iconBg.blue': (isDark) => isDark ? 'bg-blue-900 border-blue-800' : 'bg-blue-100 border-blue-200',
  'iconBg.cyan': (isDark) => isDark ? 'bg-cyan-900 border-cyan-800' : 'bg-cyan-100 border-cyan-200',
  'iconBg.green': (isDark) => isDark ? 'bg-green-900 border-green-800' : 'bg-green-100 border-green-200',
  'iconBg.emerald': (isDark) => isDark ? 'bg-emerald-900 border-emerald-800' : 'bg-emerald-100 border-emerald-200',
  'iconBg.orange': (isDark) => isDark ? 'bg-orange-900 border-orange-800' : 'bg-orange-100 border-orange-200',
  
  // Badges
  'badge.blue': (isDark) => isDark ? 'bg-blue-600 text-blue-100' : 'bg-blue-100 text-blue-700',
  'badge.gray': (isDark) => isDark ? 'bg-gray-600 text-gray-100' : 'bg-gray-100 text-gray-700',
  'badge.orange': (isDark) => isDark ? 'bg-orange-600 text-orange-100' : 'bg-orange-100 text-orange-700',
  
  // Menus
  'menu': (isDark) => isDark ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200',
  'menu.item': (isDark) => isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100',
  'menu.item.danger': (isDark) => isDark ? 'text-red-400 hover:bg-red-900/50' : 'text-red-600 hover:bg-red-50'
};

/**
 * Hook personalizado para manejar estilos de tema
 * Combina el contexto de dark mode con los estilos centralizados
 */
export const useThemeStyles = () => {
  const { isDarkMode } = useDarkMode();
  
  /**
   * Obtiene las clases CSS para un estilo específico según el tema actual
   * @param {string} styleKey - Clave del estilo (ej: 'button.primary', 'text.secondary')
   * @returns {string} - Clases CSS correspondientes
   */
  const getStyleClass = (styleKey) => {
    const styleFunction = themeStyles[styleKey];
    if (typeof styleFunction === 'function') {
      return styleFunction(isDarkMode);
    }
    return '';
  };

  return {
    isDarkMode,
    getStyleClass
  };
};

export default useThemeStyles;