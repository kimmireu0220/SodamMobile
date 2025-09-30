/**
 * 플랫폼별 최적화된 뷰 컴포넌트
 * iOS와 Android 플랫폼별 최적화를 자동으로 적용
 */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Colors, Typography, Spacing, getShadowStyle } from '../styles';
import usePlatformOptimization from '../hooks/usePlatformOptimization';

interface PlatformOptimizedViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
  platformStyle?: {
    ios?: ViewStyle;
    android?: ViewStyle;
  };
  accessibilityLabel?: string;
  accessibilityRole?: string;
  accessibilityHint?: string;
}

const PlatformOptimizedView: React.FC<PlatformOptimizedViewProps> = ({
  children,
  style,
  platformStyle,
  accessibilityLabel,
  accessibilityRole,
  accessibilityHint,
}) => {
  const { isIOS, isAndroid, getOptimizedStyle } = usePlatformOptimization();

  // 플랫폼별 스타일 적용
  const optimizedStyle = getOptimizedStyle({
    ...style,
    ...(isIOS && platformStyle?.ios),
    ...(isAndroid && platformStyle?.android),
  });

  return (
    <View
      style={optimizedStyle}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
      accessibilityHint={accessibilityHint}
    >
      {children}
    </View>
  );
};

interface PlatformOptimizedTextProps {
  children: React.ReactNode;
  style?: TextStyle;
  platformStyle?: {
    ios?: TextStyle;
    android?: TextStyle;
  };
  accessibilityLabel?: string;
  accessibilityRole?: string;
  accessibilityHint?: string;
}

export const PlatformOptimizedText: React.FC<PlatformOptimizedTextProps> = ({
  children,
  style,
  platformStyle,
  accessibilityLabel,
  accessibilityRole,
  accessibilityHint,
}) => {
  const { isIOS, isAndroid, getOptimizedStyle } = usePlatformOptimization();

  // 플랫폼별 스타일 적용
  const optimizedStyle = getOptimizedStyle({
    ...style,
    ...(isIOS && platformStyle?.ios),
    ...(isAndroid && platformStyle?.android),
  });

  return (
    <Text
      style={optimizedStyle}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
      accessibilityHint={accessibilityHint}
    >
      {children}
    </Text>
  );
};

interface PlatformOptimizedTouchableProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  platformStyle?: {
    ios?: ViewStyle;
    android?: ViewStyle;
  };
  accessibilityLabel?: string;
  accessibilityRole?: string;
  accessibilityHint?: string;
  disabled?: boolean;
}

export const PlatformOptimizedTouchable: React.FC<PlatformOptimizedTouchableProps> = ({
  children,
  onPress,
  style,
  platformStyle,
  accessibilityLabel,
  accessibilityRole,
  accessibilityHint,
  disabled = false,
}) => {
  const { isIOS, isAndroid, getOptimizedStyle, getOptimizedTouch } = usePlatformOptimization();

  // 플랫폼별 스타일 적용
  const optimizedStyle = getOptimizedStyle({
    ...style,
    ...(isIOS && platformStyle?.ios),
    ...(isAndroid && platformStyle?.android),
  });

  // 플랫폼별 터치 설정 적용
  const optimizedTouch = getOptimizedTouch({
    activeOpacity: disabled ? 1 : 0.7,
    disabled,
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      style={optimizedStyle}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled }}
      {...optimizedTouch}
    >
      {children}
    </TouchableOpacity>
  );
};

interface PlatformOptimizedScrollViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
  platformStyle?: {
    ios?: ViewStyle;
    android?: ViewStyle;
  };
  contentContainerStyle?: ViewStyle;
  platformContentContainerStyle?: {
    ios?: ViewStyle;
    android?: ViewStyle;
  };
  accessibilityLabel?: string;
  accessibilityRole?: string;
  accessibilityHint?: string;
  showsVerticalScrollIndicator?: boolean;
  showsHorizontalScrollIndicator?: boolean;
}

export const PlatformOptimizedScrollView: React.FC<PlatformOptimizedScrollViewProps> = ({
  children,
  style,
  platformStyle,
  contentContainerStyle,
  platformContentContainerStyle,
  accessibilityLabel,
  accessibilityRole,
  accessibilityHint,
  showsVerticalScrollIndicator = true,
  showsHorizontalScrollIndicator = false,
}) => {
  const { isIOS, isAndroid, getOptimizedStyle, getOptimizedScroll } = usePlatformOptimization();

  // 플랫폼별 스타일 적용
  const optimizedStyle = getOptimizedStyle({
    ...style,
    ...(isIOS && platformStyle?.ios),
    ...(isAndroid && platformStyle?.android),
  });

  const optimizedContentContainerStyle = getOptimizedStyle({
    ...contentContainerStyle,
    ...(isIOS && platformContentContainerStyle?.ios),
    ...(isAndroid && platformContentContainerStyle?.android),
  });

  // 플랫폼별 스크롤 설정 적용
  const optimizedScroll = getOptimizedScroll({
    showsVerticalScrollIndicator,
    showsHorizontalScrollIndicator,
  });

  return (
    <ScrollView
      style={optimizedStyle}
      contentContainerStyle={optimizedContentContainerStyle}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
      accessibilityHint={accessibilityHint}
      {...optimizedScroll}
    >
      {children}
    </ScrollView>
  );
};

// 플랫폼별 최적화된 스타일 생성 함수
export const createPlatformStyles = () => {
  const { isIOS, isAndroid } = usePlatformOptimization();

  return StyleSheet.create({
    // 플랫폼별 컨테이너 스타일
    container: {
      flex: 1,
      backgroundColor: Colors.background,
      ...(isIOS && {
        paddingTop: 0, // SafeAreaView가 자동으로 처리
      }),
      ...(isAndroid && {
        paddingTop: 0, // 상태 바 높이만큼 패딩
      }),
    },

    // 플랫폼별 카드 스타일
    card: {
      backgroundColor: Colors.surface,
      borderRadius: Spacing.radius.lg,
      padding: Spacing.lg,
      margin: Spacing.md,
      ...(isIOS && {
        ...getShadowStyle('md'),
      }),
      ...(isAndroid && {
        elevation: 4,
      }),
    },

    // 플랫폼별 버튼 스타일
    button: {
      backgroundColor: Colors.primary,
      borderRadius: Spacing.radius.md,
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.lg,
      alignItems: 'center',
      justifyContent: 'center',
      ...(isIOS && {
        ...getShadowStyle('sm'),
      }),
      ...(isAndroid && {
        elevation: 2,
      }),
    },

    // 플랫폼별 텍스트 스타일
    text: {
      fontSize: Typography.fontSize.base,
      color: Colors.textPrimary,
      ...(isIOS && {
        fontFamily: 'System',
      }),
      ...(isAndroid && {
        fontFamily: 'Roboto',
      }),
    },
  });
};

export default PlatformOptimizedView;
