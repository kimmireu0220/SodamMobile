/**
 * 테스트 설정 파일
 */
import 'react-native-gesture-handler/jestSetup';

// NativeEventEmitter 모킹 (Keyboard 등에 필요)
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter', () => {
  class MockEventEmitter {
    addListener = jest.fn();
    removeListener = jest.fn();
    removeAllListeners = jest.fn();
    emit = jest.fn();
  }
  return MockEventEmitter;
});

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

// NativeDeviceInfo 모킹
jest.mock('react-native/src/private/specs_DEPRECATED/modules/NativeDeviceInfo', () => ({
  getConstants: () => ({
    Dimensions: {
      windowPhysicalPixels: {
        width: 1080,
        height: 1920,
        scale: 3,
        fontScale: 1,
      },
      screenPhysicalPixels: {
        width: 1080,
        height: 1920,
        scale: 3,
        fontScale: 1,
      },
    },
  }),
}));

// NativePlatformConstantsIOS 모킹
jest.mock('react-native/Libraries/Utilities/NativePlatformConstantsIOS', () => ({
  __esModule: true,
  default: {
    getConstants: () => ({
      interfaceIdiom: 'phone',
      isTesting: true,
      osVersion: '15.0',
      systemName: 'iOS',
    }),
  },
}));

// NativeStatusBarManagerIOS 모킹
jest.mock('react-native/src/private/specs_DEPRECATED/modules/NativeStatusBarManagerIOS', () => ({
  __esModule: true,
  default: {
    getConstants: () => ({
      HEIGHT: 20,
    }),
    getHeight: jest.fn((callback: (height: { height: number }) => void) => callback({ height: 20 })),
    setStyle: jest.fn(),
    setHidden: jest.fn(),
    setNetworkActivityIndicatorVisible: jest.fn(),
  },
}));

// NativeAnimatedHelper 모킹
jest.mock('react-native/src/private/animated/NativeAnimatedHelper', () => ({
  API: {
    flushQueue: jest.fn(),
    sendKeyDown: jest.fn(),
    sendKeyUp: jest.fn(),
  },
}));

// TurboModuleRegistry 모킹 (DevMenu 에러 해결)
jest.mock('react-native/Libraries/TurboModule/TurboModuleRegistry', () => {
  const registry = {
    getEnforcing: jest.fn((name: string) => {
      if (name === 'DevMenu') {
        return {
          show: jest.fn(),
          hide: jest.fn(),
        };
      }
      if (name === 'DeviceInfo') {
        return {
          getConstants: () => ({
            Dimensions: {
              windowPhysicalPixels: {
                width: 1080,
                height: 1920,
                scale: 3,
                fontScale: 1,
              },
            },
          }),
        };
      }
      return {};
    }),
    get: jest.fn(() => null),
  };
  return registry;
});

// 플랫폼 특정 속성 모킹
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  
  RN.Platform.OS = 'ios';
  RN.Platform.Version = '15.0';
  
  return RN;
});

// 글로벌 설정
globalThis.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};
