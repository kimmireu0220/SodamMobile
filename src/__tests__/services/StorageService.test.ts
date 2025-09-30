/**
 * StorageService 테스트
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  describe('getItem', () => {
    it('should return parsed data when item exists', async () => {
      const testData = { test: 'data' };
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(testData));
      
      const result = await StorageService.getItem('test-key');
      
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('test-key');
      expect(result).toEqual(testData);
    });

    it('should return null when item does not exist', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
      
      const result = await StorageService.getItem('test-key');
      
      expect(result).toBeNull();
    });

    it('should handle JSON parse errors', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue('invalid-json');
      
      const result = await StorageService.getItem('test-key');
      
      expect(result).toBeNull();
    });
  });

  describe('setItem', () => {
    it('should save data successfully', async () => {
      const testData = { test: 'data' };
      (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);
      
      await StorageService.setItem('test-key', testData);
      
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('test-key', JSON.stringify(testData));
    });

    it('should handle save errors', async () => {
      const error = new Error('Storage error');
      (AsyncStorage.setItem as jest.Mock).mockRejectedValue(error);
      
      await expect(StorageService.setItem('test-key', { test: 'data' })).rejects.toThrow('Storage error');
    });
  });

  describe('removeItem', () => {
    it('should remove item successfully', async () => {
      (AsyncStorage.removeItem as jest.Mock).mockResolvedValue(undefined);
      
      await StorageService.removeItem('test-key');
      
      expect(AsyncStorage.removeItem).toHaveBeenCalledWith('test-key');
    });

    it('should handle remove errors', async () => {
      const error = new Error('Storage error');
      (AsyncStorage.removeItem as jest.Mock).mockRejectedValue(error);
      
      await expect(StorageService.removeItem('test-key')).rejects.toThrow('Storage error');
    });
  });

  describe('clear', () => {
    it('should clear all data successfully', async () => {
      (AsyncStorage.clear as jest.Mock).mockResolvedValue(undefined);
      
      await StorageService.clear();
      
      expect(AsyncStorage.clear).toHaveBeenCalled();
    });

    it('should handle clear errors', async () => {
      const error = new Error('Storage error');
      (AsyncStorage.clear as jest.Mock).mockRejectedValue(error);
      
      await expect(StorageService.clear()).rejects.toThrow('Storage error');
    });
  });
});
