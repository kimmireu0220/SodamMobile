/**
 * 공통 상수 정의
 */

export const APP_CONSTANTS = {
  // 앱 정보
  APP_NAME: 'Sodam',
  VERSION: '1.0.0',
  
  // 저장소 키
  STORAGE_KEYS: {
    USER_STATS: 'user_stats',
    CUSTOM_PHRASES: 'custom_phrases',
    SETTINGS: 'app_settings',
    RECENT_TRANSLATIONS: 'recent_translations'
  },
  
  // KSL 설정
  KSL: {
    MIN_CONFIDENCE: 0.3,
    MAX_CONFIDENCE: 1.0,
    DEFAULT_CONFIDENCE: 0.7
  },
  
  // 음성 설정
  SPEECH: {
    LANGUAGE: 'ko-KR',
    RATE: 1.0,
    PITCH: 1.0,
    VOLUME: 1.0
  },
  
  // UI 설정
  UI: {
    ANIMATION_DURATION: 300,
    DEBOUNCE_DELAY: 500,
    MAX_RECENT_ITEMS: 10
  }
};

export const KSL_TAGS = {
  // 문법 태그
  GRAMMAR: {
    SUBJECT: '주어',
    OBJECT: '목적어',
    VERB: '동사',
    ADJECTIVE: '형용사',
    ADVERB: '부사',
    TIME: '시간',
    PLACE: '장소',
    MANNER: '방식'
  },
  
  // 감정 태그
  EMOTION: {
    POSITIVE: '긍정',
    NEGATIVE: '부정',
    NEUTRAL: '중립',
    QUESTION: '질문',
    EXCLAMATION: '감탄'
  },
  
  // 난이도 태그
  DIFFICULTY: {
    BASIC: '기초',
    INTERMEDIATE: '중급',
    ADVANCED: '고급'
  }
};

export const DEFAULT_PHRASES = [
  { text: '안녕하세요', category: '인사' },
  { text: '감사합니다', category: '인사' },
  { text: '죄송합니다', category: '인사' },
  { text: '괜찮습니다', category: '일반' },
  { text: '네', category: '일반' },
  { text: '아니요', category: '일반' },
  { text: '도움이 필요합니다', category: '도움' },
  { text: '화장실은 어디인가요?', category: '질문' },
  { text: '얼마나 걸리나요?', category: '질문' },
  { text: '언제 시작하나요?', category: '질문' }
];

export default APP_CONSTANTS;
