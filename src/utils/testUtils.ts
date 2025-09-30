/**
 * 테스트 유틸리티
 * 앱 테스트를 위한 유틸리티 함수들
 */
import { Platform } from 'react-native';

// 테스트 환경 확인
export const isTestEnvironment = () => {
  return __DEV__ && process.env.NODE_ENV === 'test';
};

// 개발 환경 확인
export const isDevelopmentEnvironment = () => {
  return __DEV__ && process.env.NODE_ENV === 'development';
};

// 프로덕션 환경 확인
export const isProductionEnvironment = () => {
  return !__DEV__ && process.env.NODE_ENV === 'production';
};

// 플랫폼별 테스트 설정
export const getTestConfig = () => {
  return {
    platform: Platform.OS,
    isTest: isTestEnvironment(),
    isDev: isDevelopmentEnvironment(),
    isProd: isProductionEnvironment(),
    timeout: 5000,
    retryCount: 3,
  };
};

// 테스트 데이터 생성
export const createTestData = () => {
  return {
    user: {
      id: 'test-user-1',
      name: '테스트 사용자',
      email: 'test@example.com',
      createdAt: new Date().toISOString(),
    },
    statistics: {
      totalTranslations: 100,
      totalTextInputs: 50,
      totalTimeSpent: 3600,
      averageSessionTime: 300,
      lastUsed: new Date().toISOString(),
    },
    phrases: [
      {
        id: 'phrase-1',
        text: '안녕하세요',
        category: '인사',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'phrase-2',
        text: '감사합니다',
        category: '인사',
        createdAt: new Date().toISOString(),
      },
    ],
  };
};

// 테스트용 모킹 함수
export const mockFunctions = {
  // 스토리지 모킹
  storage: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  },
  
  // 네트워크 모킹
  network: {
    fetch: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
  
  // 음성 인식 모킹
  speech: {
    start: jest.fn(),
    stop: jest.fn(),
    cancel: jest.fn(),
    destroy: jest.fn(),
  },
  
  // 음성 합성 모킹
  tts: {
    speak: jest.fn(),
    stop: jest.fn(),
    pause: jest.fn(),
    resume: jest.fn(),
  },
  
  // 네비게이션 모킹
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    reset: jest.fn(),
    push: jest.fn(),
    pop: jest.fn(),
  },
};

// 테스트용 에러 생성
export const createTestError = (message: string, code?: string) => {
  const error = new Error(message);
  if (code) {
    (error as any).code = code;
  }
  return error;
};

// 테스트용 비동기 함수
export const createAsyncTest = (delay: number = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('test-completed');
    }, delay);
  });
};

// 테스트용 타이머
export const createTestTimer = (callback: () => void, delay: number = 1000) => {
  return setTimeout(callback, delay);
};

// 테스트용 인터벌
export const createTestInterval = (callback: () => void, delay: number = 1000) => {
  return setInterval(callback, delay);
};

// 테스트용 디바이스 정보
export const createTestDeviceInfo = () => {
  return {
    platform: Platform.OS,
    version: Platform.Version,
    screenWidth: 375,
    screenHeight: 812,
    isTablet: false,
    hasNotch: true,
    hasHomeIndicator: true,
  };
};

// 테스트용 사용자 설정
export const createTestUserSettings = () => {
  return {
    language: 'ko',
    voice: 'female',
    speed: 1.0,
    volume: 0.8,
    notifications: true,
    haptics: true,
    accessibility: {
      screenReader: false,
      highContrast: false,
      largeText: false,
    },
  };
};

// 테스트용 앱 설정
export const createTestAppSettings = () => {
  return {
    theme: 'light',
    fontSize: 'medium',
    animations: true,
    sounds: true,
    vibrations: true,
    autoSave: true,
    cloudSync: false,
  };
};

// 테스트용 통계 데이터
export const createTestStatistics = () => {
  return {
    totalTranslations: 150,
    totalTextInputs: 75,
    totalTimeSpent: 5400,
    averageSessionTime: 360,
    lastUsed: new Date().toISOString(),
    weeklyStats: [
      { week: '2024-W01', translations: 20, textInputs: 10, timeSpent: 720 },
      { week: '2024-W02', translations: 25, textInputs: 15, timeSpent: 900 },
      { week: '2024-W03', translations: 30, textInputs: 20, timeSpent: 1080 },
    ],
    monthlyStats: [
      { month: '2024-01', translations: 80, textInputs: 40, timeSpent: 2880 },
      { month: '2024-02', translations: 70, textInputs: 35, timeSpent: 2520 },
    ],
  };
};

// 테스트용 KSL 변환 결과
export const createTestKSLResult = () => {
  return {
    originalText: '안녕하세요',
    kslText: '안녕하세요',
    confidence: 0.95,
    tags: ['인사', '기본'],
    createdAt: new Date().toISOString(),
  };
};

// 테스트용 음성 인식 결과
export const createTestSpeechResult = () => {
  return {
    text: '안녕하세요',
    confidence: 0.9,
    isFinal: true,
    createdAt: new Date().toISOString(),
  };
};

// 테스트용 에러 타입
export const TestErrorTypes = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  STORAGE_ERROR: 'STORAGE_ERROR',
  SPEECH_ERROR: 'SPEECH_ERROR',
  TTS_ERROR: 'TTS_ERROR',
  NAVIGATION_ERROR: 'NAVIGATION_ERROR',
  PERMISSION_ERROR: 'PERMISSION_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
} as const;

export type TestErrorType = typeof TestErrorTypes[keyof typeof TestErrorTypes];

// 테스트용 에러 생성기
export const createTestErrorByType = (type: TestErrorType, message?: string) => {
  const errorMessages = {
    [TestErrorTypes.NETWORK_ERROR]: '네트워크 연결에 실패했습니다.',
    [TestErrorTypes.STORAGE_ERROR]: '데이터 저장에 실패했습니다.',
    [TestErrorTypes.SPEECH_ERROR]: '음성 인식에 실패했습니다.',
    [TestErrorTypes.TTS_ERROR]: '음성 합성에 실패했습니다.',
    [TestErrorTypes.NAVIGATION_ERROR]: '네비게이션에 실패했습니다.',
    [TestErrorTypes.PERMISSION_ERROR]: '권한이 필요합니다.',
    [TestErrorTypes.VALIDATION_ERROR]: '입력값이 유효하지 않습니다.',
    [TestErrorTypes.UNKNOWN_ERROR]: '알 수 없는 오류가 발생했습니다.',
  };

  const error = new Error(message || errorMessages[type]);
  (error as any).type = type;
  return error;
};

export default {
  isTestEnvironment,
  isDevelopmentEnvironment,
  isProductionEnvironment,
  getTestConfig,
  createTestData,
  mockFunctions,
  createTestError,
  createAsyncTest,
  createTestTimer,
  createTestInterval,
  createTestDeviceInfo,
  createTestUserSettings,
  createTestAppSettings,
  createTestStatistics,
  createTestKSLResult,
  createTestSpeechResult,
  TestErrorTypes,
  createTestErrorByType,
};
