/**
 * 테스트 설정 파일
 */
import 'react-native-gesture-handler/jestSetup';

// 네비게이션 모킹
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
    reset: jest.fn(),
  }),
}));

// SafeAreaProvider 모킹
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
  SafeAreaView: ({ children }: { children: React.ReactNode }) => children,
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

// AsyncStorage 모킹
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

// 음성 인식 모킹
jest.mock('@react-native-community/voice', () => ({
  Voice: {
    start: jest.fn(),
    stop: jest.fn(),
    cancel: jest.fn(),
    destroy: jest.fn(),
    isAvailable: jest.fn(() => Promise.resolve(true)),
    isRecognizing: jest.fn(() => Promise.resolve(false)),
    isRecording: jest.fn(() => Promise.resolve(false)),
  },
}));

// TTS 모킹
jest.mock('react-native-tts', () => ({
  speak: jest.fn(),
  stop: jest.fn(),
  pause: jest.fn(),
  resume: jest.fn(),
  getInitStatus: jest.fn(() => Promise.resolve('success')),
}));

// 플랫폼 모킹
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  return {
    ...RN,
    Platform: {
      OS: 'ios',
      Version: '15.0',
      isPad: false,
    },
    Dimensions: {
      get: jest.fn(() => ({
        width: 375,
        height: 812,
      })),
    },
    StatusBar: {
      currentHeight: 0,
      setBarStyle: jest.fn(),
      setBackgroundColor: jest.fn(),
    },
  };
});

// 글로벌 설정
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};
