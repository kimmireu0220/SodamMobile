/**
 * BottomNav Component (React Native)
 * 
 * 역할: 앱의 하단 네비게이션을 제공하며, 주요 기능 간 이동을 가능하게 합니다.
 * 
 * 입력:
 * - currentPath: 현재 경로를 나타내는 문자열
 * - onNavigate: 네비게이션 클릭 시 호출되는 콜백 함수
 * 
 * 출력:
 * - 홈, 수화 변환, 마이페이지 탭
 * - 현재 활성 탭 하이라이트
 * 
 * 향후 연동 지점:
 * - 각 탭별 권한 체크
 * - 마이페이지에서 사용자 정보 표시
 */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView
} from 'react-native';

interface BottomNavProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentPath, onNavigate }) => {
  const navItems = [
    { path: '/home', label: '홈', icon: '🏠' },
    { path: '/translate', label: '수화 변환', icon: '🤟' },
    { path: '/mypage', label: '마이 페이지', icon: '👤' }
  ];

  const handleNavClick = (path: string) => {
    onNavigate(path);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {navItems.map((item) => {
          const isActive = currentPath === item.path;
          
          return (
            <TouchableOpacity
              key={item.path}
              onPress={() => handleNavClick(item.path)}
              style={[
                styles.navItem,
                isActive && styles.activeNavItem
              ]}
              accessibilityLabel={`${item.label}로 이동`}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
            >
              <Text style={[
                styles.navIcon,
                isActive && styles.activeNavIcon
              ]}>
                {item.icon}
              </Text>
              <Text style={[
                styles.navLabel,
                isActive && styles.activeNavLabel
              ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#ffffff',
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  activeNavItem: {
    backgroundColor: '#E8F5E8',
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 4,
    opacity: 0.6,
  },
  activeNavIcon: {
    opacity: 1,
  },
  navLabel: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    fontWeight: '400',
  },
  activeNavLabel: {
    color: '#2E7D32',
    fontWeight: '600',
  },
});

export default BottomNav;
