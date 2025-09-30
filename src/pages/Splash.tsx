/**
 * Splash Page (React Native)
 * 
 * 역할: 앱의 첫 화면으로 로고와 시작하기 버튼을 제공합니다.
 * 
 * 입력:
 * - onStart: 시작하기 버튼 클릭 시 호출되는 콜백 함수
 * 
 * 출력:
 * - 앱 로고
 * - 시작하기 버튼
 * - 자동 전환 (2초 후)
 * 
 * 향후 연동 지점:
 * - 사용자 인증 상태 확인
 * - 온보딩 플로우 연동
 * - 앱 초기화 로직
 */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Splash'>;

interface SplashProps {
  onStart?: () => void;
}

const Splash: React.FC<SplashProps> = ({ onStart }) => {
  const navigation = useNavigation<SplashScreenNavigationProp>();

  const handleStartClick = () => {
    if (onStart) {
      onStart();
    } else {
      // 네비게이션으로 Main 화면으로 이동
      navigation.navigate('Main');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      
      <View style={styles.content}>
        {/* 로고 */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>소담</Text>
          <Text style={styles.logoSubtext}>
            손으로 전하는 소중한 이야기
          </Text>
        </View>

        {/* 시작하기 버튼 */}
        <TouchableOpacity
          onPress={handleStartClick}
          style={styles.startButton}
          accessibilityLabel="앱 시작하기"
          accessibilityRole="button"
        >
          <Text style={styles.startButtonText}>
            시작하기
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 40,
  },
  logoContainer: {
    alignItems: 'center',
    gap: 20,
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  logoSubtext: {
    fontSize: 18,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 28,
  },
  startButton: {
    backgroundColor: '#2E7D32',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    minWidth: 200,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  startButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '600',
  },
});

export default Splash;
