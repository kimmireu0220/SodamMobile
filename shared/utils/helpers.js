/**
 * 공통 헬퍼 함수들
 */

/**
 * 텍스트 정규화
 */
export const normalizeText = (text) => {
  if (!text || typeof text !== 'string') {
    return '';
  }
  
  return text
    .trim()
    .replace(/\s+/g, ' ')  // 연속된 공백을 하나로
    .replace(/[^\w\s가-힣]/g, '')  // 특수문자 제거 (한글, 영문, 숫자만 유지)
    .toLowerCase();
};

/**
 * 텍스트 토큰화
 */
export const tokenizeText = (text) => {
  if (!text) return [];
  
  return text
    .split(/\s+/)
    .filter(word => word.length > 0);
};

/**
 * 신뢰도 계산
 */
export const calculateConfidence = (originalWords, mappedWords, totalWords) => {
  if (!originalWords || !mappedWords || totalWords === 0) {
    return 0;
  }
  
  const mappedCount = mappedWords.filter(word => word && word !== '').length;
  const confidence = mappedCount / totalWords;
  
  return Math.min(Math.max(confidence, 0), 1);
};

/**
 * 날짜 포맷팅
 */
export const formatDate = (date) => {
  if (!date) return '';
  
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};

/**
 * 시간 포맷팅
 */
export const formatTime = (date) => {
  if (!date) return '';
  
  const d = new Date(date);
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  
  return `${hours}:${minutes}`;
};

/**
 * 디바운스 함수
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

/**
 * 스로틀 함수
 */
export const throttle = (func, delay) => {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      return func.apply(null, args);
    }
  };
};

/**
 * 배열에서 중복 제거
 */
export const removeDuplicates = (array, key) => {
  if (!key) {
    return [...new Set(array)];
  }
  
  const seen = new Set();
  return array.filter(item => {
    const value = item[key];
    if (seen.has(value)) {
      return false;
    }
    seen.add(value);
    return true;
  });
};

/**
 * 객체 깊은 복사
 */
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }
  
  if (obj instanceof Array) {
    return obj.map(item => deepClone(item));
  }
  
  if (typeof obj === 'object') {
    const cloned = {};
    Object.keys(obj).forEach(key => {
      cloned[key] = deepClone(obj[key]);
    });
    return cloned;
  }
  
  return obj;
};

/**
 * 에러 메시지 생성
 */
export const createErrorMessage = (error, defaultMessage = '알 수 없는 오류가 발생했습니다.') => {
  if (!error) return defaultMessage;
  
  if (typeof error === 'string') {
    return error;
  }
  
  if (error.message) {
    return error.message;
  }
  
  return defaultMessage;
};

/**
 * 로그 레벨
 */
export const LOG_LEVELS = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3
};

/**
 * 로거 클래스
 */
export class Logger {
  constructor(level = LOG_LEVELS.INFO) {
    this.level = level;
  }
  
  error(message, ...args) {
    if (this.level >= LOG_LEVELS.ERROR) {
      console.error(`[ERROR] ${message}`, ...args);
    }
  }
  
  warn(message, ...args) {
    if (this.level >= LOG_LEVELS.WARN) {
      console.warn(`[WARN] ${message}`, ...args);
    }
  }
  
  info(message, ...args) {
    if (this.level >= LOG_LEVELS.INFO) {
      console.info(`[INFO] ${message}`, ...args);
    }
  }
  
  debug(message, ...args) {
    if (this.level >= LOG_LEVELS.DEBUG) {
      console.debug(`[DEBUG] ${message}`, ...args);
    }
  }
}

export default {
  normalizeText,
  tokenizeText,
  calculateConfidence,
  formatDate,
  formatTime,
  debounce,
  throttle,
  removeDuplicates,
  deepClone,
  createErrorMessage,
  Logger
};
