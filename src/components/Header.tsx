/**
 * Header Component (React Native)
 * 
 * 역할: 앱의 상단 헤더를 표시하며, 로고를 제공합니다.
 * 
 * 입력:
 * - onLogoClick: 로고 클릭 시 호출되는 콜백 함수
 * 
 * 출력:
 * - 로고 표시
 * 
 * 향후 연동 지점:
 * - 로고 클릭 시 홈으로 이동
 */
import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Image
} from 'react-native';
import { Colors, Spacing, getShadowStyle } from '../styles';

interface HeaderProps {
  onLogoClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick }) => {
  return (
    <SafeAreaView style={styles.safeArea} testID="header">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.container}>
        {/* 로고 */}
        <TouchableOpacity
          onPress={onLogoClick}
          style={styles.logoButton}
          accessibilityLabel="홈으로 이동"
          accessibilityRole="button"
          testID="logo-button"
        >
          <Image
            source={require('../assets/sodam-logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
            testID="logo-image"
          />
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
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.surface,
    ...getShadowStyle('md'),
  },
  logoButton: {
    padding: 0,
    paddingLeft: 0,
    marginLeft: -20,
    marginRight: 0,
    borderRadius: Spacing.radius.md,
  },
  logoImage: {
    width: 160,
    height: 50,
  },
});

export default Header;
