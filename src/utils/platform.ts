/**
 * 플랫폼별 유틸리티
 * iOS와 Android 플랫폼별 최적화 및 설정
 */
import { Platform, Dimensions, StatusBar } from 'react-native';

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

// 디바이스 정보
export const deviceInfo = {
  platform: Platform.OS,
  version: Platform.Version,
  isTablet: (Platform.OS === 'ios' && (Platform as any).isPad) || 
            (Platform.OS === 'android' && Dimensions.get('window').width >= 768),
  screenWidth: Dimensions.get('window').width,
  screenHeight: Dimensions.get('window').height,
  statusBarHeight: StatusBar.currentHeight || 0,
};

// 플랫폼별 스타일
export const platformStyles = {
  // iOS 전용 스타일
  ios: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  
  // Android 전용 스타일
  android: {
    elevation: 4,
  },
  
  // 공통 스타일
  common: {
    borderRadius: 8,
  },
};

// 플랫폼별 색상
export const platformColors = {
  ios: {
    primary: '#007AFF',
    secondary: '#FF9500',
    background: '#F2F2F7',
    surface: '#FFFFFF',
    text: '#000000',
    textSecondary: '#8E8E93',
  },
  
  android: {
    primary: '#2196F3',
    secondary: '#FF9800',
    background: '#FAFAFA',
    surface: '#FFFFFF',
    text: '#212121',
    textSecondary: '#757575',
  },
};

// 플랫폼별 폰트
export const platformFonts = {
  ios: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
    light: 'System',
  },
  
  android: {
    regular: 'Roboto',
    medium: 'Roboto-Medium',
    bold: 'Roboto-Bold',
    light: 'Roboto-Light',
  },
};

// 플랫폼별 애니메이션 설정
export const platformAnimations = {
  ios: {
    duration: 300,
    easing: 'ease-in-out',
  },
  
  android: {
    duration: 250,
    easing: 'ease-in-out',
  },
};

// 플랫폼별 터치 피드백
export const platformHaptics = {
  ios: {
    light: 'light',
    medium: 'medium',
    heavy: 'heavy',
    success: 'success',
    warning: 'warning',
    error: 'error',
  },
  
  android: {
    light: 'light',
    medium: 'medium',
    heavy: 'heavy',
    success: 'success',
    warning: 'warning',
    error: 'error',
  },
};

// 플랫폼별 권한 설정
export const platformPermissions = {
  ios: {
    microphone: 'NSMicrophoneUsageDescription',
    speech: 'NSSpeechRecognitionUsageDescription',
    camera: 'NSCameraUsageDescription',
  },
  
  android: {
    microphone: 'android.permission.RECORD_AUDIO',
    speech: 'android.permission.RECORD_AUDIO',
    camera: 'android.permission.CAMERA',
  },
};

// 플랫폼별 최적화 설정
export const platformOptimizations = {
  ios: {
    // iOS 전용 최적화
    useNativeDriver: true,
    shouldRasterizeIOS: true,
    renderToHardwareTextureAndroid: false,
  },
  
  android: {
    // Android 전용 최적화
    useNativeDriver: true,
    shouldRasterizeIOS: false,
    renderToHardwareTextureAndroid: true,
  },
};

// 플랫폼별 디바이스 특성
export const deviceCharacteristics = {
  isSmallScreen: deviceInfo.screenWidth < 375,
  isLargeScreen: deviceInfo.screenWidth > 414,
  isTablet: deviceInfo.isTablet,
  hasNotch: isIOS && deviceInfo.screenHeight > 800,
  hasHomeIndicator: isIOS && deviceInfo.screenHeight > 800,
};

// 플랫폼별 접근성 설정
export const platformAccessibility = {
  ios: {
    minimumTouchTarget: 44,
    preferredContentSizeCategory: 'medium',
  },
  
  android: {
    minimumTouchTarget: 48,
    preferredContentSizeCategory: 'medium',
  },
};

// 플랫폼별 성능 최적화
export const platformPerformance = {
  ios: {
    // iOS 성능 최적화
    enableHermes: true,
    enableFabric: true,
    enableNewArchitecture: true,
  },
  
  android: {
    // Android 성능 최적화
    enableHermes: true,
    enableFabric: true,
    enableNewArchitecture: true,
  },
};

// 플랫폼별 디버깅 설정
export const platformDebugging = {
  ios: {
    enableFlipper: true,
    enableChromeDebugger: false,
  },
  
  android: {
    enableFlipper: true,
    enableChromeDebugger: true,
  },
};

export default {
  isIOS,
  isAndroid,
  deviceInfo,
  platformStyles,
  platformColors,
  platformFonts,
  platformAnimations,
  platformHaptics,
  platformPermissions,
  platformOptimizations,
  deviceCharacteristics,
  platformAccessibility,
  platformPerformance,
  platformDebugging,
};
