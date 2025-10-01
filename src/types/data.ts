/**
 * 데이터 모델 타입 정의
 * 앱에서 사용하는 모든 데이터 구조 정의
 */

// 사용자 통계 데이터
export interface UserStatistics {
  totalTranslations: number;
  totalTextInputs: number;
  totalTimeSpent: number; // 초 단위
  averageSessionTime: number; // 초 단위
  lastUsed: string; // ISO 날짜 문자열
  createdAt: string; // ISO 날짜 문자열
}

// 일일 사용 통계
export interface DailyUsage {
  date: string; // YYYY-MM-DD 형식
  translations: number;
  textInputs: number;
  timeSpent: number; // 초 단위
}

// 자주 사용하는 문구
export interface TopPhrase {
  phrase: string;
  count: number;
  lastUsed: string; // ISO 날짜 문자열
}

// 개인 상용구
export interface CustomPhrase {
  id: string;
  text: string;
  category: string;
  isFavorite: boolean;
  usageCount: number;
  createdAt: string; // ISO 날짜 문자열
  updatedAt: string; // ISO 날짜 문자열
}

// KSL 변환 기록
export interface KSLTranslation {
  id: string;
  originalText: string;
  kslGloss: string;
  confidence: number;
  timestamp: string; // ISO 날짜 문자열
}

// 앱 설정
export interface AppSettings {
  language: string;
  voiceRate: number;
  voicePitch: number;
  voiceVolume: number;
  autoPlay: boolean;
  hapticFeedback: boolean;
  darkMode: boolean;
  fontSize: 'small' | 'medium' | 'large';
}

// 사용자 프로필
export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  preferences: {
    favoriteCategories: string[];
    defaultLanguage: string;
    accessibility: {
      highContrast: boolean;
      largeText: boolean;
      screenReader: boolean;
    };
  };
  createdAt: string; // ISO 날짜 문자열
  updatedAt: string; // ISO 날짜 문자열
}

// 앱 상태
export interface AppState {
  isFirstLaunch: boolean;
  currentVersion: string;
  lastUpdateCheck: string; // ISO 날짜 문자열
  onboardingCompleted: boolean;
}

// 데이터베이스 스키마
export interface DatabaseSchema {
  userStatistics: UserStatistics;
  dailyUsage: DailyUsage[];
  topPhrases: TopPhrase[];
  customPhrases: CustomPhrase[];
  kslTranslations: KSLTranslation[];
  appSettings: AppSettings;
  userProfile: UserProfile;
  appState: AppState;
}

// 저장소 키
export const STORAGE_KEYS = {
  USER_STATISTICS: 'user_statistics',
  DAILY_USAGE: 'daily_usage',
  TOP_PHRASES: 'top_phrases',
  CUSTOM_PHRASES: 'custom_phrases',
  KSL_TRANSLATIONS: 'ksl_translations',
  APP_SETTINGS: 'app_settings',
  USER_PROFILE: 'user_profile',
  APP_STATE: 'app_state',
} as const;

export type StorageKey = keyof typeof STORAGE_KEYS;
export type StorageValue = DatabaseSchema[keyof DatabaseSchema];

// StorageKey와 DatabaseSchema 키 매핑
export type StorageKeyToDatabaseKey = {
  USER_STATISTICS: 'userStatistics';
  DAILY_USAGE: 'dailyUsage';
  TOP_PHRASES: 'topPhrases';
  CUSTOM_PHRASES: 'customPhrases';
  KSL_TRANSLATIONS: 'kslTranslations';
  APP_SETTINGS: 'appSettings';
  USER_PROFILE: 'userProfile';
  APP_STATE: 'appState';
};

export default {
  UserStatistics: {} as UserStatistics,
  DailyUsage: {} as DailyUsage,
  TopPhrase: {} as TopPhrase,
  CustomPhrase: {} as CustomPhrase,
  KSLTranslation: {} as KSLTranslation,
  AppSettings: {} as AppSettings,
  UserProfile: {} as UserProfile,
  AppState: {} as AppState,
};
