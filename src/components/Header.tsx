/**
 * Header Component (React Native)
 * 
 * 역할: 앱의 상단 헤더를 표시하며, 로고와 네비게이션 메뉴를 제공합니다.
 * 
 * 입력:
 * - onMenuClick: 햄버거 메뉴 클릭 시 호출되는 콜백 함수
 * - onLogoClick: 로고 클릭 시 호출되는 콜백 함수
 * 
 * 출력:
 * - 로고 표시
 * - 햄버거 메뉴 버튼
 * 
 * 향후 연동 지점:
 * - 로고 클릭 시 홈으로 이동
 * - 햄버거 메뉴에서 설정, 프로필 등 추가 메뉴
 */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView
} from 'react-native';
import { Colors, Typography, Spacing, getShadowStyle } from '../styles';

interface HeaderProps {
  onMenuClick?: () => void;
  onLogoClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, onLogoClick }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.container}>
        {/* 로고 */}
        <TouchableOpacity
          onPress={onLogoClick}
          style={styles.logoButton}
          accessibilityLabel="홈으로 이동"
          accessibilityRole="button"
        >
          <Text style={styles.logoText}>소담</Text>
        </TouchableOpacity>

        {/* 햄버거 메뉴 */}
        <TouchableOpacity
          onPress={onMenuClick}
          style={styles.menuButton}
          accessibilityLabel="메뉴 열기"
          accessibilityRole="button"
        >
          <View style={styles.menuIcon}>
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.surface,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.surface,
    ...getShadowStyle('md'),
  },
  logoButton: {
    padding: Spacing.sm,
    borderRadius: Spacing.radius.md,
  },
  logoText: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary,
  },
  menuButton: {
    padding: Spacing.sm,
    borderRadius: Spacing.radius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIcon: {
    width: 24,
    height: 18,
    justifyContent: 'space-between',
  },
  menuLine: {
    width: 24,
    height: 3,
    backgroundColor: Colors.textPrimary,
    borderRadius: Spacing.radius.sm,
  },
});

export default Header;
