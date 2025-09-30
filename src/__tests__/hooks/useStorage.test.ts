/**
 * useStorage 훅 테스트
 */
import { renderHook, act } from '@testing-library/react-hooks';
import useStorage from '../../hooks/useStorage';
import { mockFunctions } from '../../utils/testUtils';

// 모킹 설정
jest.mock('../../services/StorageService', () => ({
  StorageService: {
    getItem: mockFunctions.storage.getItem,
    setItem: mockFunctions.storage.setItem,
    removeItem: mockFunctions.storage.removeItem,
    clear: mockFunctions.storage.clear,
  },
}));

describe('useStorage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useStorage());
    
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should save data successfully', async () => {
    const { result } = renderHook(() => useStorage());
    
    await act(async () => {
      await result.current.saveData('test-key', { test: 'data' });
    });
    
    expect(mockFunctions.storage.setItem).toHaveBeenCalledWith('test-key', JSON.stringify({ test: 'data' }));
    expect(result.current.error).toBeNull();
  });

  it('should load data successfully', async () => {
    const testData = { test: 'data' };
    mockFunctions.storage.getItem.mockResolvedValue(JSON.stringify(testData));
    
    const { result } = renderHook(() => useStorage());
    
    await act(async () => {
      const data = await result.current.loadData('test-key');
      expect(data).toEqual(testData);
    });
    
    expect(mockFunctions.storage.getItem).toHaveBeenCalledWith('test-key');
  });

  it('should handle errors when saving data', async () => {
    const error = new Error('Storage error');
    mockFunctions.storage.setItem.mockRejectedValue(error);
    
    const { result } = renderHook(() => useStorage());
    
    await act(async () => {
      await result.current.saveData('test-key', { test: 'data' });
    });
    
    expect(result.current.error).toBe(error);
  });

  it('should handle errors when loading data', async () => {
    const error = new Error('Storage error');
    mockFunctions.storage.getItem.mockRejectedValue(error);
    
    const { result } = renderHook(() => useStorage());
    
    await act(async () => {
      await result.current.loadData('test-key');
    });
    
    expect(result.current.error).toBe(error);
  });

  it('should clear data successfully', async () => {
    const { result } = renderHook(() => useStorage());
    
    await act(async () => {
      await result.current.clearData();
    });
    
    expect(mockFunctions.storage.clear).toHaveBeenCalled();
    expect(result.current.error).toBeNull();
  });
});
