/**
 * 공통 로직 인덱스 파일
 * 웹과 모바일에서 공통으로 사용하는 모든 로직을 export
 */

// KSL 엔진
export { KSLConverter } from './ksl/converter.js';
export { KSL_DICTIONARY } from './ksl/dictionary.js';
export { KSL_RULES } from './ksl/rules.js';

// 유틸리티
export { Storage } from './utils/storage.js';
export { calculateStatistics, getWeeklyStats, getMonthlyStats } from './utils/statistics.js';
export { APP_CONSTANTS, KSL_TAGS, DEFAULT_PHRASES } from './utils/constants.js';
export { 
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
  Logger,
  LOG_LEVELS
} from './utils/helpers.js';

// 데이터
export { default as PHRASES_DATA } from './data/phrases.json';

// 기본 export
export default {
  // KSL 엔진
  KSLConverter: require('./ksl/converter.js').KSLConverter,
  KSL_DICTIONARY: require('./ksl/dictionary.js').KSL_DICTIONARY,
  KSL_RULES: require('./ksl/rules.js').KSL_RULES,
  
  // 유틸리티
  Storage: require('./utils/storage.js').Storage,
  Statistics: require('./utils/statistics.js'),
  Constants: require('./utils/constants.js'),
  Helpers: require('./utils/helpers.js'),
  
  // 데이터
  PhrasesData: require('./data/phrases.json')
};
