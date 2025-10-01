/**
 * StorageService 테스트
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import storageService from '../../services/StorageService';
import { STORAGE_KEYS } from '../../types/data';

// AsyncStorage 모킹
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

describe('StorageService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('get', () => {
    it('should return parsed data when item exists', async () => {
      const testData = { totalTranslations: 10 };
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(testData));
      
      const result = await storageService.get('USER_STATISTICS');
      
      expect(AsyncStorage.getItem).toHaveBeenCalledWith(STORAGE_KEYS.USER_STATISTICS);
      expect(result).toEqual(testData);
    });

    it('should return null when item does not exist', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
      
      const result = await storageService.get('USER_STATISTICS');
      
      expect(result).toBeNull();
    });

    it('should handle JSON parse errors', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue('invalid-json');
      
      const result = await storageService.get('USER_STATISTICS');
      
      expect(result).toBeNull();
    });
  });

  describe('set', () => {
    it('should save data successfully', async () => {
      const testData = { totalTranslations: 10 };
      (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);
      
      const result = await storageService.set('USER_STATISTICS', testData);
      
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        STORAGE_KEYS.USER_STATISTICS,
        JSON.stringify(testData)
      );
      expect(result).toBe(true);
    });

    it('should return false on save errors', async () => {
      const error = new Error('Storage error');
      (AsyncStorage.setItem as jest.Mock).mockRejectedValue(error);
      
      const result = await storageService.set('USER_STATISTICS', { totalTranslations: 10 });
      
      expect(result).toBe(false);
    });
  });

  describe('remove', () => {
    it('should remove item successfully', async () => {
      (AsyncStorage.removeItem as jest.Mock).mockResolvedValue(undefined);
      
      const result = await storageService.remove('USER_STATISTICS');
      
      expect(AsyncStorage.removeItem).toHaveBeenCalledWith(STORAGE_KEYS.USER_STATISTICS);
      expect(result).toBe(true);
    });

    it('should return false on remove errors', async () => {
      const error = new Error('Storage error');
      (AsyncStorage.removeItem as jest.Mock).mockRejectedValue(error);
      
      const result = await storageService.remove('USER_STATISTICS');
      
      expect(result).toBe(false);
    });
  });

  describe('clear', () => {
    it('should clear all data successfully', async () => {
      (AsyncStorage.clear as jest.Mock).mockResolvedValue(undefined);
      
      const result = await storageService.clear();
      
      expect(AsyncStorage.clear).toHaveBeenCalled();
      expect(result).toBe(true);
    });

    it('should return false on clear errors', async () => {
      const error = new Error('Storage error');
      (AsyncStorage.clear as jest.Mock).mockRejectedValue(error);
      
      const result = await storageService.clear();
      
      expect(result).toBe(false);
    });
  });

  describe('updateUserStatistics', () => {
    it('should update user statistics successfully', async () => {
      const currentStats = {
        totalTranslations: 10,
        totalTextInputs: 5,
        totalTimeSpent: 100,
        averageSessionTime: 20,
        lastUsed: '2024-01-01T00:00:00.000Z',
        createdAt: '2024-01-01T00:00:00.000Z',
      };
      
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(currentStats));
      (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);
      
      const result = await storageService.updateUserStatistics({ totalTranslations: 15 });
      
      expect(result).toBe(true);
      expect(AsyncStorage.setItem).toHaveBeenCalled();
    });
  });
});
