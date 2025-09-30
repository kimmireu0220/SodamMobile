/**
 * 데이터 저장소 훅
 * StorageService를 React 훅으로 래핑
 */
import { useState, useEffect, useCallback } from 'react';
import storageService from '../services/StorageService';
import { 
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

export interface UseStorageReturn<T extends StorageValue> {
  data: T | null;
  loading: boolean;
  error: string | null;
  setData: (value: T) => Promise<boolean>;
  updateData: (updates: Partial<T>) => Promise<boolean>;
  removeData: () => Promise<boolean>;
  refresh: () => Promise<void>;
}

export const useStorage = <T extends StorageValue>(
  key: StorageKey
): UseStorageReturn<T> => {
  const [data, setDataState] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 데이터 로드
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await storageService.get<T>(key);
      setDataState(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [key]);

  // 초기 데이터 로드
  useEffect(() => {
    loadData();
  }, [loadData]);

  // 데이터 설정
  const setData = useCallback(async (value: T): Promise<boolean> => {
    try {
      setError(null);
      const success = await storageService.set(key, value);
      if (success) {
        setDataState(value);
      }
      return success;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to set data');
      return false;
    }
  }, [key]);

  // 데이터 업데이트
  const updateData = useCallback(async (updates: Partial<T>): Promise<boolean> => {
    try {
      setError(null);
      if (!data) {
        setError('No data to update');
        return false;
      }

      const updatedData = { ...data, ...updates };
      const success = await storageService.set(key, updatedData);
      if (success) {
        setDataState(updatedData);
      }
      return success;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update data');
      return false;
    }
  }, [key, data]);

  // 데이터 삭제
  const removeData = useCallback(async (): Promise<boolean> => {
    try {
      setError(null);
      const success = await storageService.remove(key);
      if (success) {
        setDataState(null);
      }
      return success;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove data');
      return false;
    }
  }, [key]);

  // 데이터 새로고침
  const refresh = useCallback(async () => {
    await loadData();
  }, [loadData]);

  return {
    data,
    loading,
    error,
    setData,
    updateData,
    removeData,
    refresh,
  };
};

// 특화된 훅들
export const useUserStatistics = () => {
  return useStorage<UserStatistics>('USER_STATISTICS');
};

export const useDailyUsage = () => {
  return useStorage<DailyUsage[]>('DAILY_USAGE');
};

export const useTopPhrases = () => {
  return useStorage<TopPhrase[]>('TOP_PHRASES');
};

export const useCustomPhrases = () => {
  return useStorage<CustomPhrase[]>('CUSTOM_PHRASES');
};

export const useKSLTranslations = () => {
  return useStorage<KSLTranslation[]>('KSL_TRANSLATIONS');
};

export const useAppSettings = () => {
  return useStorage<AppSettings>('APP_SETTINGS');
};

export const useUserProfile = () => {
  return useStorage<UserProfile>('USER_PROFILE');
};

export const useAppState = () => {
  return useStorage<AppState>('APP_STATE');
};

export default useStorage;
