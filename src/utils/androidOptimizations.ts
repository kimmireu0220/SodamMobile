/**
 * Android 최적화 설정
 * Android 플랫폼별 최적화 및 설정
 */
// import { Platform } from 'react-native'; // 향후 사용 예정

// Android 전용 최적화 설정
export const androidOptimizations = {
  // 상태 바 최적화
  statusBar: {
    translucent: false,
    backgroundColor: '#FFFFFF',
    barStyle: 'dark-content',
    hidden: false,
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
    shouldRasterizeIOS: false,
    renderToHardwareTextureAndroid: true,
  },
  
  // 스크롤 최적화
  scrolling: {
    useNativeDriver: true,
    bounces: false,
    bouncesZoom: false,
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
    enableChromeDebugger: true,
    enableRemoteDebugging: true,
    enableHotReloading: true,
  },
  
  // 접근성 최적화
  accessibility: {
    minimumTouchTarget: 48,
    preferredContentSizeCategory: 'medium',
    enableTalkBack: true,
    enableSwitchAccess: true,
  },
  
  // 보안 최적화
  security: {
    enableKeystore: true,
    enableBiometric: true,
    enableFingerprint: true,
    enableFace: true,
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
    enableSharedPreferences: true,
    enableRoom: false,
    enableRealm: false,
  },
};

// Android 전용 스타일 최적화
export const androidStyles = {
  // 상태 바 스타일
  statusBar: {
    backgroundColor: '#FFFFFF',
    barStyle: 'dark-content',
    translucent: false,
  },
  
  // 네비게이션 스타일
  navigation: {
    headerStyle: {
      backgroundColor: '#FFFFFF',
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    headerTitleStyle: {
      fontSize: 18,
      fontWeight: '500',
      color: '#000000',
    },
  },
  
  // 탭 바 스타일
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopColor: '#E0E0E0',
    borderTopWidth: 1,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  
  // 버튼 스타일
  button: {
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#2196F3',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  
  // 카드 스타일
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
};

// Android 전용 애니메이션 설정
export const androidAnimations = {
  // 페이지 전환 애니메이션
  pageTransition: {
    duration: 250,
    easing: 'ease-in-out',
    useNativeDriver: true,
  },
  
  // 모달 애니메이션
  modal: {
    duration: 200,
    easing: 'ease-out',
    useNativeDriver: true,
  },
  
  // 버튼 애니메이션
  button: {
    duration: 100,
    easing: 'ease-in-out',
    useNativeDriver: true,
  },
  
  // 스크롤 애니메이션
  scroll: {
    duration: 150,
    easing: 'ease-out',
    useNativeDriver: true,
  },
};

// Android 전용 터치 피드백
export const androidHaptics = {
  light: 'light',
  medium: 'medium',
  heavy: 'heavy',
  success: 'success',
  warning: 'warning',
  error: 'error',
  selection: 'selection',
  impact: 'impact',
};

// Android 전용 권한 설정
export const androidPermissions = {
  microphone: 'android.permission.RECORD_AUDIO',
  speech: 'android.permission.RECORD_AUDIO',
  camera: 'android.permission.CAMERA',
  photoLibrary: 'android.permission.READ_EXTERNAL_STORAGE',
  location: 'android.permission.ACCESS_FINE_LOCATION',
  notification: 'android.permission.POST_NOTIFICATIONS',
};

// Android 전용 설정
export const androidSettings = {
  // 앱 설정
  app: {
    packageName: 'com.sodam.mobile',
    versionName: '1.0.0',
    versionCode: 1,
    minSdkVersion: 21,
    targetSdkVersion: 34,
    compileSdkVersion: 34,
  },
  
  // 디바이스 설정
  device: {
    supportPhone: true,
    supportTablet: true,
    supportTV: false,
    orientation: ['portrait', 'landscape'],
  },
  
  // 기능 설정
  features: {
    enableGoogleAssistant: true,
    enableShortcuts: true,
    enableWidgets: true,
    enableAppShortcuts: true,
  },
};

// Android 전용 성능 최적화
export const androidPerformance = {
  // 메모리 최적화
  memory: {
    enableHermes: true,
    enableFabric: true,
    enableNewArchitecture: true,
    optimizeForSize: true,
    enableProguard: true,
    enableR8: true,
  },
  
  // 네트워킹 최적화
  networking: {
    enableHTTP2: true,
    enableCompression: true,
    enableCaching: true,
    timeout: 30000,
    enableRetry: true,
  },
  
  // 스토리지 최적화
  storage: {
    enableSQLite: true,
    enableSharedPreferences: true,
    enableRoom: false,
    enableRealm: false,
    enableEncryption: true,
  },
  
  // 보안 최적화
  security: {
    enableSSL: true,
    enableCertificatePinning: true,
    enableBiometric: true,
    enableKeystore: true,
  },
};

export default {
  androidOptimizations,
  androidStyles,
  androidAnimations,
  androidHaptics,
  androidPermissions,
  androidSettings,
  androidPerformance,
};
