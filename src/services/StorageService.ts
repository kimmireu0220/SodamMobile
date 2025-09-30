/**
 * 데이터 저장소 서비스
 * AsyncStorage를 사용한 데이터 관리
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  DatabaseSchema, 
  STORAGE_KEYS, 
  StorageKey, 
  StorageValue,
  UserStatistics,
  DailyUsage,
  TopPhrase,
  CustomPhrase,
  KSLTranslation,
  AppSettings,
  UserProfile,
  AppState
} from '../types/data';

class StorageService {
  private isInitialized = false;

  constructor() {
    this.initialize();
  }

  private async initialize() {
    try {
      // 앱 첫 실행 시 기본 데이터 설정
      const isFirstLaunch = await this.isFirstLaunch();
      if (isFirstLaunch) {
        await this.setupDefaultData();
      }
      this.isInitialized = true;
      console.log('Storage Service initialized');
    } catch (error) {
      console.error('Failed to initialize Storage Service:', error);
    }
  }

  /**
   * 앱 첫 실행 여부 확인
   */
  private async isFirstLaunch(): Promise<boolean> {
    try {
      const appState = await this.get<AppState>('APP_STATE');
      return !appState || appState.isFirstLaunch;
    } catch (error) {
      return true;
    }
  }

  /**
   * 기본 데이터 설정
   */
  private async setupDefaultData(): Promise<void> {
    const defaultData: Partial<DatabaseSchema> = {
      userStatistics: {
        totalTranslations: 0,
        totalTextInputs: 0,
        totalTimeSpent: 0,
        averageSessionTime: 0,
        lastUsed: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      },
      dailyUsage: [],
      topPhrases: [],
      customPhrases: [],
      kslTranslations: [],
      appSettings: {
        language: 'ko-KR',
        voiceRate: 0.5,
        voicePitch: 1.0,
        voiceVolume: 1.0,
        autoPlay: true,
        hapticFeedback: true,
        darkMode: false,
        fontSize: 'medium',
      },
      userProfile: {
        id: 'default_user',
        name: '사용자',
        preferences: {
          favoriteCategories: ['일상'],
          defaultLanguage: 'ko-KR',
          accessibility: {
            highContrast: false,
            largeText: false,
            screenReader: false,
          },
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      appState: {
        isFirstLaunch: true,
        currentVersion: '1.0.0',
        lastUpdateCheck: new Date().toISOString(),
        onboardingCompleted: false,
      },
    };

    // 기본 데이터 저장
    for (const [key, value] of Object.entries(defaultData)) {
      await this.set(key as StorageKey, value);
    }
  }

  /**
   * 데이터 저장
   */
  async set<T extends StorageValue>(key: StorageKey, value: T): Promise<boolean> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(STORAGE_KEYS[key], jsonValue);
      return true;
    } catch (error) {
      console.error(`Failed to save data for key ${key}:`, error);
      return false;
    }
  }

  /**
   * 데이터 조회
   */
  async get<T extends StorageValue>(key: StorageKey): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEYS[key]);
      if (jsonValue === null) {
        return null;
      }
      return JSON.parse(jsonValue) as T;
    } catch (error) {
      console.error(`Failed to get data for key ${key}:`, error);
      return null;
    }
  }

  /**
   * 데이터 삭제
   */
  async remove(key: StorageKey): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS[key]);
      return true;
    } catch (error) {
      console.error(`Failed to remove data for key ${key}:`, error);
      return false;
    }
  }

  /**
   * 모든 데이터 삭제
   */
  async clear(): Promise<boolean> {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      console.error('Failed to clear all data:', error);
      return false;
    }
  }

  /**
   * 사용자 통계 업데이트
   */
  async updateUserStatistics(updates: Partial<UserStatistics>): Promise<boolean> {
    try {
      const currentStats = await this.get<UserStatistics>('USER_STATISTICS');
      if (!currentStats) {
        return false;
      }

      const updatedStats = {
        ...currentStats,
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      return await this.set('USER_STATISTICS', updatedStats);
    } catch (error) {
      console.error('Failed to update user statistics:', error);
      return false;
    }
  }

  /**
   * 일일 사용 통계 추가
   */
  async addDailyUsage(usage: DailyUsage): Promise<boolean> {
    try {
      const currentUsage = await this.get<DailyUsage[]>('DAILY_USAGE') || [];
      const existingIndex = currentUsage.findIndex(u => u.date === usage.date);
      
      if (existingIndex >= 0) {
        // 기존 데이터 업데이트
        currentUsage[existingIndex] = {
          ...currentUsage[existingIndex],
          translations: currentUsage[existingIndex].translations + usage.translations,
          textInputs: currentUsage[existingIndex].textInputs + usage.textInputs,
          timeSpent: currentUsage[existingIndex].timeSpent + usage.timeSpent,
        };
      } else {
        // 새 데이터 추가
        currentUsage.push(usage);
      }

      return await this.set('DAILY_USAGE', currentUsage);
    } catch (error) {
      console.error('Failed to add daily usage:', error);
      return false;
    }
  }

  /**
   * 자주 사용하는 문구 업데이트
   */
  async updateTopPhrases(phrase: string): Promise<boolean> {
    try {
      const currentPhrases = await this.get<TopPhrase[]>('TOP_PHRASES') || [];
      const existingIndex = currentPhrases.findIndex(p => p.phrase === phrase);
      
      if (existingIndex >= 0) {
        // 기존 문구 카운트 증가
        currentPhrases[existingIndex].count += 1;
        currentPhrases[existingIndex].lastUsed = new Date().toISOString();
      } else {
        // 새 문구 추가
        currentPhrases.push({
          phrase,
          count: 1,
          lastUsed: new Date().toISOString(),
        });
      }

      // 카운트 순으로 정렬
      currentPhrases.sort((a, b) => b.count - a.count);

      return await this.set('TOP_PHRASES', currentPhrases);
    } catch (error) {
      console.error('Failed to update top phrases:', error);
      return false;
    }
  }

  /**
   * KSL 변환 기록 추가
   */
  async addKSLTranslation(translation: Omit<KSLTranslation, 'id' | 'timestamp'>): Promise<boolean> {
    try {
      const currentTranslations = await this.get<KSLTranslation[]>('KSL_TRANSLATIONS') || [];
      const newTranslation: KSLTranslation = {
        ...translation,
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
      };

      currentTranslations.unshift(newTranslation); // 최신 순으로 추가

      // 최대 100개까지만 유지
      if (currentTranslations.length > 100) {
        currentTranslations.splice(100);
      }

      return await this.set('KSL_TRANSLATIONS', currentTranslations);
    } catch (error) {
      console.error('Failed to add KSL translation:', error);
      return false;
    }
  }

  /**
   * 앱 설정 업데이트
   */
  async updateAppSettings(updates: Partial<AppSettings>): Promise<boolean> {
    try {
      const currentSettings = await this.get<AppSettings>('APP_SETTINGS');
      if (!currentSettings) {
        return false;
      }

      const updatedSettings = {
        ...currentSettings,
        ...updates,
      };

      return await this.set('APP_SETTINGS', updatedSettings);
    } catch (error) {
      console.error('Failed to update app settings:', error);
      return false;
    }
  }

  /**
   * 데이터 백업
   */
  async backup(): Promise<string | null> {
    try {
      const allData: Partial<DatabaseSchema> = {};
      
      for (const key of Object.keys(STORAGE_KEYS) as StorageKey[]) {
        const data = await this.get(key);
        if (data) {
          allData[key] = data;
        }
      }

      return JSON.stringify(allData, null, 2);
    } catch (error) {
      console.error('Failed to backup data:', error);
      return null;
    }
  }

  /**
   * 데이터 복원
   */
  async restore(backupData: string): Promise<boolean> {
    try {
      const data = JSON.parse(backupData);
      
      for (const [key, value] of Object.entries(data)) {
        await this.set(key as StorageKey, value);
      }

      return true;
    } catch (error) {
      console.error('Failed to restore data:', error);
      return false;
    }
  }
}

// 싱글톤 인스턴스
export const storageService = new StorageService();

export default storageService;
