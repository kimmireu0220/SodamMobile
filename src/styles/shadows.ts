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
      elevation: 0,
    },
    sm: {
      elevation: 2,
      shadowColor: Colors.shadow,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    md: {
      elevation: 4,
      shadowColor: Colors.shadow,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    lg: {
      elevation: 8,
      shadowColor: Colors.shadow,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.15,
      shadowRadius: 8,
    },
    xl: {
      elevation: 12,
      shadowColor: Colors.shadow,
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.2,
      shadowRadius: 12,
    },
    '2xl': {
      elevation: 16,
      shadowColor: Colors.shadow,
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.25,
      shadowRadius: 16,
    },
  },
} as const;

export type ShadowKey = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

// Helper function to get shadow style
export const getShadowStyle = (shadow: ShadowKey): ViewStyle => {
  const shadowStyles = {
    none: {
      elevation: 0,
    },
    sm: {
      elevation: 2,
      shadowColor: Colors.shadow,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    md: {
      elevation: 4,
      shadowColor: Colors.shadow,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    lg: {
      elevation: 8,
      shadowColor: Colors.shadow,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.15,
      shadowRadius: 8,
    },
    xl: {
      elevation: 12,
      shadowColor: Colors.shadow,
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.2,
      shadowRadius: 12,
    },
    '2xl': {
      elevation: 16,
      shadowColor: Colors.shadow,
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.25,
      shadowRadius: 16,
    },
  };
  
  return shadowStyles[shadow];
};

export default Shadows;
