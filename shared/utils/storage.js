/**
 * 공통 저장소 유틸리티
 * 웹: localStorage, 모바일: AsyncStorage
 */

// 플랫폼별 저장소 구현
let storage;

// 웹 환경에서 localStorage 사용
if (typeof window !== 'undefined' && window.localStorage) {
  storage = {
    async getItem(key) {
      // eslint-disable-next-line no-undef
      return localStorage.getItem(key);
    },
    async setItem(key, value) {
      // eslint-disable-next-line no-undef
      localStorage.setItem(key, value);
    },
    async removeItem(key) {
      // eslint-disable-next-line no-undef
      localStorage.removeItem(key);
    },
    async clear() {
      // eslint-disable-next-line no-undef
      localStorage.clear();
    }
  };
} else {
  // React Native 환경에서 AsyncStorage 사용
  try {
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    storage = AsyncStorage;
  } catch (error) {
    console.warn('AsyncStorage not available, using fallback');
    // 폴백 저장소 (메모리 기반)
    const memoryStorage = {};
    storage = {
      async getItem(key) {
        return memoryStorage[key] || null;
      },
      async setItem(key, value) {
        memoryStorage[key] = value;
      },
      async removeItem(key) {
        delete memoryStorage[key];
      },
      async clear() {
        Object.keys(memoryStorage).forEach(key => delete memoryStorage[key]);
      }
    };
  }
}

export const Storage = {
  /**
   * 데이터 저장
   */
  async save(key, data) {
    try {
      const jsonData = JSON.stringify(data);
      await storage.setItem(key, jsonData);
      return true;
    } catch (error) {
      console.error('Storage save error:', error);
      return false;
    }
  },

  /**
   * 데이터 로드
   */
  async load(key, defaultValue = null) {
    try {
      const data = await storage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
      console.error('Storage load error:', error);
      return defaultValue;
    }
  },

  /**
   * 데이터 삭제
   */
  async remove(key) {
    try {
      await storage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Storage remove error:', error);
      return false;
    }
  },

  /**
   * 모든 데이터 삭제
   */
  async clear() {
    try {
      await storage.clear();
      return true;
    } catch (error) {
      console.error('Storage clear error:', error);
      return false;
    }
  }
};

export default Storage;
