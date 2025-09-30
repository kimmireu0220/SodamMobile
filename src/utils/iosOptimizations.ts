/**
 * iOS 최적화 설정
 * iOS 플랫폼별 최적화 및 설정
 */
// import { Platform } from 'react-native'; // 향후 사용 예정

// iOS 전용 최적화 설정
export const iosOptimizations = {
  // Safe Area 최적화
  safeArea: {
    useSafeAreaInsets: true,
    respectKeyboard: true,
    adjustForKeyboard: true,
  },
  
  // 네비게이션 최적화
  navigation: {
    useNativeDriver: true,
    gestureEnabled: true,
    gestureResponseDistance: 50,
    gestureVelocityImpact: 0.3,
  },
  
  // 애니메이션 최적화
  animations: {
    useNativeDriver: true,
    shouldRasterizeIOS: true,
    renderToHardwareTextureAndroid: false,
  },
  
  // 스크롤 최적화
  scrolling: {
    useNativeDriver: true,
    bounces: true,
    bouncesZoom: true,
    alwaysBounceVertical: false,
    alwaysBounceHorizontal: false,
  },
  
  // 터치 최적화
  touch: {
    delayPressIn: 0,
    delayPressOut: 0,
    delayLongPress: 500,
    activeOpacity: 0.7,
  },
  
  // 메모리 최적화
  memory: {
    enableHermes: true,
    enableFabric: true,
    enableNewArchitecture: true,
    optimizeForSize: true,
  },
  
  // 성능 최적화
  performance: {
    enableFlipper: true,
    enableChromeDebugger: false,
    enableRemoteDebugging: false,
    enableHotReloading: true,
  },
  
  // 접근성 최적화
  accessibility: {
    minimumTouchTarget: 44,
    preferredContentSizeCategory: 'medium',
    enableVoiceOver: true,
    enableSwitchControl: true,
  },
  
  // 보안 최적화
  security: {
    enableKeychain: true,
    enableBiometric: true,
    enableFaceID: true,
    enableTouchID: true,
  },
  
  // 네트워킹 최적화
  networking: {
    enableHTTP2: true,
    enableCompression: true,
    enableCaching: true,
    timeout: 30000,
  },
  
  // 스토리지 최적화
  storage: {
    enableSQLite: true,
    enableKeychain: true,
    enableUserDefaults: true,
    enableCoreData: false,
  },
};

// iOS 전용 스타일 최적화
export const iosStyles = {
  // Safe Area 스타일
  safeArea: {
    paddingTop: 0, // SafeAreaView가 자동으로 처리
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
  
  // 네비게이션 스타일
  navigation: {
    headerStyle: {
      backgroundColor: '#FFFFFF',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    headerTitleStyle: {
      fontSize: 17,
      fontWeight: '600',
      color: '#000000',
    },
  },
  
  // 탭 바 스타일
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopColor: '#E0E0E0',
    borderTopWidth: 0.5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  
  // 버튼 스타일
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#007AFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  
  // 카드 스타일
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
};

// iOS 전용 애니메이션 설정
export const iosAnimations = {
  // 페이지 전환 애니메이션
  pageTransition: {
    duration: 300,
    easing: 'ease-in-out',
    useNativeDriver: true,
  },
  
  // 모달 애니메이션
  modal: {
    duration: 250,
    easing: 'ease-out',
    useNativeDriver: true,
  },
  
  // 버튼 애니메이션
  button: {
    duration: 150,
    easing: 'ease-in-out',
    useNativeDriver: true,
  },
  
  // 스크롤 애니메이션
  scroll: {
    duration: 200,
    easing: 'ease-out',
    useNativeDriver: true,
  },
};

// iOS 전용 터치 피드백
export const iosHaptics = {
  light: 'light',
  medium: 'medium',
  heavy: 'heavy',
  success: 'success',
  warning: 'warning',
  error: 'error',
  selection: 'selection',
  impact: 'impact',
};

// iOS 전용 권한 설정
export const iosPermissions = {
  microphone: 'NSMicrophoneUsageDescription',
  speech: 'NSSpeechRecognitionUsageDescription',
  camera: 'NSCameraUsageDescription',
  photoLibrary: 'NSPhotoLibraryUsageDescription',
  location: 'NSLocationWhenInUseUsageDescription',
  notification: 'NSUserNotificationUsageDescription',
};

// iOS 전용 설정
export const iosSettings = {
  // 앱 설정
  app: {
    bundleIdentifier: 'com.sodam.mobile',
    version: '1.0.0',
    buildNumber: '1',
    minimumOSVersion: '13.0',
  },
  
  // 디바이스 설정
  device: {
    supportIPhone: true,
    supportIPad: true,
    supportIPod: false,
    orientation: ['portrait', 'landscape'],
  },
  
  // 기능 설정
  features: {
    enableSiri: true,
    enableShortcuts: true,
    enableWidgets: true,
    enableAppClips: false,
  },
};

export default {
  iosOptimizations,
  iosStyles,
  iosAnimations,
  iosHaptics,
  iosPermissions,
  iosSettings,
};
