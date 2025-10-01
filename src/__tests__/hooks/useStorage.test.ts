/**
 * useStorage 훅 테스트
 */
import { renderHook, waitFor } from '@testing-library/react-native';
import useStorage from '../../hooks/useStorage';
import storageService from '../../services/StorageService';

// StorageService 모킹
jest.mock('../../services/StorageService', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    set: jest.fn(),
    remove: jest.fn(),
    clear: jest.fn(),
  },
}));

describe('useStorage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('초기화', () => {
    it('should load data on mount', async () => {
      const testData = { totalTranslations: 10 };
      (storageService.get as jest.Mock).mockResolvedValue(testData);

      const { result } = renderHook(() => useStorage('USER_STATISTICS'));

      // 초기 로딩 상태
      expect(result.current.loading).toBe(true);
      expect(result.current.data).toBeNull();

      // 데이터 로드 완료 대기
      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.data).toEqual(testData);
      expect(result.current.error).toBeNull();
      expect(storageService.get).toHaveBeenCalledWith('USER_STATISTICS');
    });

    it('should handle loading errors', async () => {
      const error = new Error('Load failed');
      (storageService.get as jest.Mock).mockRejectedValue(error);

      const { result } = renderHook(() => useStorage('USER_STATISTICS'));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.data).toBeNull();
      expect(result.current.error).toBe('Load failed');
    });

    it('should handle null data', async () => {
      (storageService.get as jest.Mock).mockResolvedValue(null);

      const { result } = renderHook(() => useStorage('USER_STATISTICS'));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.data).toBeNull();
      expect(result.current.error).toBeNull();
    });
  });

  describe('setData', () => {
    it('should save data successfully', async () => {
      const testData = { totalTranslations: 10 };
      (storageService.get as jest.Mock).mockResolvedValue(null);
      (storageService.set as jest.Mock).mockResolvedValue(true);

      const { result } = renderHook(() => useStorage('USER_STATISTICS'));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      // setData 호출
      const setResult = await result.current.setData(testData);

      expect(setResult).toBe(true);
      expect(storageService.set).toHaveBeenCalledWith('USER_STATISTICS', testData);
      
      // 상태 업데이트 대기
      await waitFor(() => {
        expect(result.current.data).toEqual(testData);
      });
      
      expect(result.current.error).toBeNull();
    });

    it('should handle save errors', async () => {
      (storageService.get as jest.Mock).mockResolvedValue(null);
      (storageService.set as jest.Mock).mockResolvedValue(false);

      const { result } = renderHook(() => useStorage('USER_STATISTICS'));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      let setResult: boolean = true;
      await waitFor(async () => {
        setResult = await result.current.setData({ totalTranslations: 10 });
      });

      expect(setResult).toBe(false);
    });
  });

  describe('updateData', () => {
    it('should update existing data', async () => {
      const initialData = { totalTranslations: 10, totalTextInputs: 5 };
      (storageService.get as jest.Mock).mockResolvedValue(initialData);
      (storageService.set as jest.Mock).mockResolvedValue(true);

      const { result } = renderHook(() => useStorage('USER_STATISTICS'));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      // updateData 호출
      let updateResult: boolean = false;
      await waitFor(async () => {
        updateResult = await result.current.updateData({ totalTranslations: 15 });
      });

      expect(updateResult).toBe(true);
      expect(storageService.set).toHaveBeenCalledWith('USER_STATISTICS', {
        totalTranslations: 15,
        totalTextInputs: 5,
      });
    });

    it('should fail when no data exists', async () => {
      (storageService.get as jest.Mock).mockResolvedValue(null);

      const { result } = renderHook(() => useStorage('USER_STATISTICS'));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      const updateResult = await result.current.updateData({ totalTranslations: 15 });

      expect(updateResult).toBe(false);
      
      // 에러 상태 업데이트 대기
      await waitFor(() => {
        expect(result.current.error).toBe('No data to update');
      });
    });
  });

  describe('removeData', () => {
    it('should remove data successfully', async () => {
      const testData = { totalTranslations: 10 };
      (storageService.get as jest.Mock).mockResolvedValue(testData);
      (storageService.remove as jest.Mock).mockResolvedValue(true);

      const { result } = renderHook(() => useStorage('USER_STATISTICS'));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.data).toEqual(testData);

      // removeData 호출
      const removeResult = await result.current.removeData();

      expect(removeResult).toBe(true);
      expect(storageService.remove).toHaveBeenCalledWith('USER_STATISTICS');
      
      // 상태 업데이트 대기
      await waitFor(() => {
        expect(result.current.data).toBeNull();
      });
    });

    it('should handle remove errors', async () => {
      (storageService.get as jest.Mock).mockResolvedValue({ totalTranslations: 10 });
      (storageService.remove as jest.Mock).mockResolvedValue(false);

      const { result } = renderHook(() => useStorage('USER_STATISTICS'));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      let removeResult: boolean = true;
      await waitFor(async () => {
        removeResult = await result.current.removeData();
      });

      expect(removeResult).toBe(false);
    });
  });

  describe('refresh', () => {
    it('should reload data', async () => {
      const initialData = { totalTranslations: 10 };
      const updatedData = { totalTranslations: 20 };
      
      (storageService.get as jest.Mock)
        .mockResolvedValueOnce(initialData)
        .mockResolvedValueOnce(updatedData);

      const { result } = renderHook(() => useStorage('USER_STATISTICS'));

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.data).toEqual(initialData);

      // refresh 호출
      await waitFor(async () => {
        await result.current.refresh();
      });

      await waitFor(() => {
        expect(result.current.data).toEqual(updatedData);
      });

      expect(storageService.get).toHaveBeenCalledTimes(2);
    });
  });
});
