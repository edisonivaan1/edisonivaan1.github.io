// Configuración de entorno para la aplicación
interface EnvironmentConfig {
  API_BASE_URL: string;
  IS_PRODUCTION: boolean;
  IS_DEVELOPMENT: boolean;
}

// Determinar el entorno actual
const isProduction = import.meta.env.PROD;
const isDevelopment = import.meta.env.DEV;

// Configuración según el entorno
const config: EnvironmentConfig = {
  // En desarrollo, usar localhost
  // En producción, usar una URL de respaldo o el mismo dominio
  API_BASE_URL: isProduction 
    ? 'https://grammar-master-pro-backend.herokuapp.com/api' // URL de respaldo para producción
    : 'http://localhost:5000/api',
  IS_PRODUCTION: isProduction,
  IS_DEVELOPMENT: isDevelopment,
};

// Función para obtener la URL base de la API
export const getApiBaseUrl = (): string => {
  // Si estamos en GitHub Pages, intentar usar el mismo dominio
  if (isProduction && window.location.hostname === 'edisonivaan1.github.io') {
    // Por ahora, usar la URL de respaldo
    // En el futuro, esto podría ser una URL de un backend desplegado
    return 'https://grammar-master-pro-backend.herokuapp.com/api';
  }
  
  return config.API_BASE_URL;
};

// Función para verificar si el backend está disponible
export const checkBackendAvailability = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${getApiBaseUrl()}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.ok;
  } catch (error) {
    console.warn('Backend no disponible:', error);
    return false;
  }
};

// Función para obtener configuración de modo offline
export const getOfflineConfig = () => ({
  enabled: isProduction && !window.navigator.onLine,
  fallbackData: {
    // Datos de respaldo para cuando el backend no esté disponible
    topics: [
      {
        id: 'present-tense',
        title: 'Present Tense',
        description: 'Learn about present tense in English',
        difficulty: 'easy',
        questions: 10,
      },
      {
        id: 'past-tense',
        title: 'Past Tense',
        description: 'Learn about past tense in English',
        difficulty: 'medium',
        questions: 10,
      },
    ],
  },
});

export default config; 