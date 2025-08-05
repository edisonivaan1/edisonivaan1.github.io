// Servicio de fallback para cuando el backend no esté disponible
import { checkBackendAvailability } from '../config/environment';

// Datos de respaldo para el modo offline
const fallbackData = {
  topics: [
    {
      id: 'present-tense',
      title: 'Present Tense',
      description: 'Learn about present tense in English',
      difficulty: 'easy',
      questions: 10,
      image: '/src/assets/questions/presentTense/pt-1.png',
    },
    {
      id: 'past-tense',
      title: 'Past Tense',
      description: 'Learn about past tense in English',
      difficulty: 'medium',
      questions: 10,
      image: '/src/assets/questions/pastTense/pat-1.png',
    },
    {
      id: 'modal-verbs',
      title: 'Modal Verbs',
      description: 'Learn about modal verbs in English',
      difficulty: 'hard',
      questions: 10,
      image: '/src/assets/questions/modalVerbs/modal_question1_child_swimming.png',
    },
    {
      id: 'prepositions',
      title: 'Prepositions',
      description: 'Learn about prepositions in English',
      difficulty: 'medium',
      questions: 10,
      image: '/src/assets/questions/prepositions/pre_1.png',
    },
    {
      id: 'conditional',
      title: 'Conditional Sentences',
      description: 'Learn about conditional sentences in English',
      difficulty: 'hard',
      questions: 10,
      image: '/src/assets/questions/conditional/con_1.png',
    },
    {
      id: 'gerunds-infinitives',
      title: 'Gerunds and Infinitives',
      description: 'Learn about gerunds and infinitives in English',
      difficulty: 'medium',
      questions: 10,
      image: '/src/assets/questions/gerundsInfinitives/gi-1.png',
    },
  ],
  user: {
    id: 'offline-user',
    firstName: 'Demo',
    lastName: 'User',
    email: 'demo@grammarmasterpro.com',
    profileImage: null,
  },
  progress: {
    completedTopics: [],
    totalScore: 0,
    achievements: [],
  },
};

// Función para verificar si estamos en modo offline
export const isOfflineMode = async (): Promise<boolean> => {
  const backendAvailable = await checkBackendAvailability();
  return !backendAvailable;
};

// Servicio de autenticación offline
export const offlineAuthService = {
  login: async (credentials: { email: string; password: string }) => {
    // Simular login offline
    if (credentials.email === 'demo@grammarmasterpro.com' && credentials.password === 'demo123') {
      return {
        success: true,
        message: 'Login exitoso (modo offline)',
        user: fallbackData.user,
        token: 'offline-token',
      };
    }
    throw {
      status: 401,
      message: 'Credenciales incorrectas',
    };
  },

  register: async (userData: any) => {
    // Simular registro offline
    return {
      success: true,
      message: 'Registro exitoso (modo offline)',
      user: { ...fallbackData.user, ...userData },
      token: 'offline-token',
    };
  },

  getCurrentUser: async () => {
    return {
      success: true,
      data: fallbackData.user,
    };
  },
};

// Servicio de progreso offline
export const offlineProgressService = {
  getProgress: async () => {
    return {
      success: true,
      data: fallbackData.progress,
    };
  },

  completeLevel: async (data: any) => {
    return {
      success: true,
      message: 'Nivel completado (modo offline)',
      data: {
        score: data.correct,
        total: data.total,
        timeSpent: data.timeSpent || 0,
      },
    };
  },

  getStats: async () => {
    return {
      success: true,
      data: {
        totalScore: fallbackData.progress.totalScore,
        completedTopics: fallbackData.progress.completedTopics.length,
        achievements: fallbackData.progress.achievements.length,
      },
    };
  },
};

// Servicio de achievements offline
export const offlineAchievementService = {
  getAllAchievements: async () => {
    return {
      success: true,
      data: [
        {
          id: 'first-login',
          title: 'Primera Sesión',
          description: 'Completaste tu primera sesión',
          icon: '🌟',
          category: 'participation',
        },
        {
          id: 'demo-user',
          title: 'Usuario Demo',
          description: 'Estás usando la versión demo',
          icon: '🎮',
          category: 'demo',
        },
      ],
    };
  },

  getUserAchievements: async () => {
    return {
      success: true,
      data: fallbackData.progress.achievements,
    };
  },
};

export default {
  isOfflineMode,
  offlineAuthService,
  offlineProgressService,
  offlineAchievementService,
  fallbackData,
}; 