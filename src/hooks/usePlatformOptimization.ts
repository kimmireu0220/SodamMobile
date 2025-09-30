/**
 * 플랫폼별 최적화 훅
 * iOS와 Android 플랫폼별 최적화 설정을 관리
 */
import { useState, useEffect, useCallback } from 'react';
import { Platform, Dimensions, StatusBar } from 'react-native';
import { 
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
  platformDebugging
} from '../utils/platform';

export interface PlatformOptimizationReturn {
  // 플랫폼 정보
  platform: string;
  isIOS: boolean;
  isAndroid: boolean;
  
  // 디바이스 정보
  deviceInfo: typeof deviceInfo;
  deviceCharacteristics: typeof deviceCharacteristics;
  
  // 플랫폼별 스타일
  platformStyles: typeof platformStyles;
  platformColors: typeof platformColors;
  platformFonts: typeof platformFonts;
  
  // 플랫폼별 애니메이션
  platformAnimations: typeof platformAnimations;
  platformHaptics: typeof platformHaptics;
  
  // 플랫폼별 권한
  platformPermissions: typeof platformPermissions;
  
  // 플랫폼별 최적화
  platformOptimizations: typeof platformOptimizations;
  platformAccessibility: typeof platformAccessibility;
  platformPerformance: typeof platformPerformance;
  platformDebugging: typeof platformDebugging;
  
  // 최적화 함수들
  getOptimizedStyle: (baseStyle: any) => any;
  getOptimizedAnimation: (baseAnimation: any) => any;
  getOptimizedTouch: (baseTouch: any) => any;
  getOptimizedScroll: (baseScroll: any) => any;
  
  // 플랫폼별 설정
  getPlatformSettings: () => any;
  getPlatformPermissions: () => string[];
  getPlatformOptimizations: () => any;
}

export const usePlatformOptimization = (): PlatformOptimizationReturn => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [statusBarHeight, setStatusBarHeight] = useState(StatusBar.currentHeight || 0);

  // 디바이스 정보 업데이트
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });

    return () => subscription?.remove();
  }, []);

  // 상태 바 높이 업데이트
  useEffect(() => {
    if (isAndroid) {
      setStatusBarHeight(StatusBar.currentHeight || 0);
    }
  }, []);

  // 최적화된 스타일 생성
  const getOptimizedStyle = useCallback((baseStyle: any) => {
    const platformStyle = isIOS ? platformStyles.ios : platformStyles.android;
    const commonStyle = platformStyles.common;
    
    return {
      ...baseStyle,
      ...commonStyle,
      ...platformStyle,
    };
  }, []);

  // 최적화된 애니메이션 생성
  const getOptimizedAnimation = useCallback((baseAnimation: any) => {
    const platformAnimation = isIOS ? platformAnimations.ios : platformAnimations.android;
    
    return {
      ...baseAnimation,
      ...platformAnimation,
    };
  }, []);

  // 최적화된 터치 설정 생성
  const getOptimizedTouch = useCallback((baseTouch: any) => {
    const platformTouch = isIOS ? 
      { activeOpacity: 0.7, delayPressIn: 0, delayPressOut: 0 } :
      { activeOpacity: 0.7, delayPressIn: 0, delayPressOut: 0 };
    
    return {
      ...baseTouch,
      ...platformTouch,
    };
  }, []);

  // 최적화된 스크롤 설정 생성
  const getOptimizedScroll = useCallback((baseScroll: any) => {
    const platformScroll = isIOS ?
      { bounces: true, bouncesZoom: true, alwaysBounceVertical: false } :
      { bounces: false, bouncesZoom: false, alwaysBounceVertical: false };
    
    return {
      ...baseScroll,
      ...platformScroll,
    };
  }, []);

  // 플랫폼별 설정 반환
  const getPlatformSettings = useCallback(() => {
    if (isIOS) {
      return {
        bundleIdentifier: 'com.sodam.mobile',
        version: '1.0.0',
        buildNumber: '1',
        minimumOSVersion: '13.0',
        supportIPhone: true,
        supportIPad: true,
        orientation: ['portrait', 'landscape'],
      };
    } else {
      return {
        packageName: 'com.sodam.mobile',
        versionName: '1.0.0',
        versionCode: 1,
        minSdkVersion: 21,
        targetSdkVersion: 34,
        supportPhone: true,
        supportTablet: true,
        orientation: ['portrait', 'landscape'],
      };
    }
  }, []);

  // 플랫폼별 권한 반환
  const getPlatformPermissions = useCallback(() => {
    if (isIOS) {
      return [
        'NSMicrophoneUsageDescription',
        'NSSpeechRecognitionUsageDescription',
        'NSCameraUsageDescription',
        'NSPhotoLibraryUsageDescription',
        'NSLocationWhenInUseUsageDescription',
        'NSUserNotificationUsageDescription',
      ];
    } else {
      return [
        'android.permission.RECORD_AUDIO',
        'android.permission.CAMERA',
        'android.permission.READ_EXTERNAL_STORAGE',
        'android.permission.ACCESS_FINE_LOCATION',
        'android.permission.POST_NOTIFICATIONS',
      ];
    }
  }, []);

  // 플랫폼별 최적화 설정 반환
  const getPlatformOptimizations = useCallback(() => {
    if (isIOS) {
      return {
        useNativeDriver: true,
        shouldRasterizeIOS: true,
        renderToHardwareTextureAndroid: false,
        enableHermes: true,
        enableFabric: true,
        enableNewArchitecture: true,
      };
    } else {
      return {
        useNativeDriver: true,
        shouldRasterizeIOS: false,
        renderToHardwareTextureAndroid: true,
        enableHermes: true,
        enableFabric: true,
        enableNewArchitecture: true,
      };
    }
  }, []);

  return {
    // 플랫폼 정보
    platform: Platform.OS,
    isIOS,
    isAndroid,
    
    // 디바이스 정보
    deviceInfo: {
      ...deviceInfo,
      screenWidth: dimensions.width,
      screenHeight: dimensions.height,
      statusBarHeight,
    },
    deviceCharacteristics,
    
    // 플랫폼별 스타일
    platformStyles,
    platformColors,
    platformFonts,
    
    // 플랫폼별 애니메이션
    platformAnimations,
    platformHaptics,
    
    // 플랫폼별 권한
    platformPermissions,
    
    // 플랫폼별 최적화
    platformOptimizations,
    platformAccessibility,
    platformPerformance,
    platformDebugging,
    
    // 최적화 함수들
    getOptimizedStyle,
    getOptimizedAnimation,
    getOptimizedTouch,
    getOptimizedScroll,
    
    // 플랫폼별 설정
    getPlatformSettings,
    getPlatformPermissions,
    getPlatformOptimizations,
  };
};

export default usePlatformOptimization;
