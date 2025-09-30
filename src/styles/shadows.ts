/**
 * 그림자 시스템 정의
 * 일관된 그림자 사용을 위한 전역 그림자 스타일
 */

import { ViewStyle } from 'react-native';
import Colors from './colors';

export const Shadows = {
  // Elevation shadows (Android)
  elevation: {
    none: {
      elevation: 0,
    },
    sm: {
      elevation: 2,
    },
    md: {
      elevation: 4,
    },
    lg: {
      elevation: 8,
    },
    xl: {
      elevation: 12,
    },
    '2xl': {
      elevation: 16,
    },
  },
  
  // iOS shadows
  ios: {
    none: {},
    sm: {
      shadowColor: Colors.shadow,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    md: {
      shadowColor: Colors.shadow,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    lg: {
      shadowColor: Colors.shadow,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.15,
      shadowRadius: 8,
    },
    xl: {
      shadowColor: Colors.shadow,
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.2,
      shadowRadius: 12,
    },
    '2xl': {
      shadowColor: Colors.shadow,
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.25,
      shadowRadius: 16,
    },
  },
  
  // Combined shadows (iOS + Android)
  combined: {
    none: {
      ...Shadows.elevation.none,
      ...Shadows.ios.none,
    },
    sm: {
      ...Shadows.elevation.sm,
      ...Shadows.ios.sm,
    },
    md: {
      ...Shadows.elevation.md,
      ...Shadows.ios.md,
    },
    lg: {
      ...Shadows.elevation.lg,
      ...Shadows.ios.lg,
    },
    xl: {
      ...Shadows.elevation.xl,
      ...Shadows.ios.xl,
    },
    '2xl': {
      ...Shadows.elevation['2xl'],
      ...Shadows.ios['2xl'],
    },
  },
} as const;

export type ShadowKey = keyof typeof Shadows.combined;

// Helper function to get shadow style
export const getShadowStyle = (shadow: ShadowKey): ViewStyle => {
  return Shadows.combined[shadow];
};

export default Shadows;
