/**
 * TurnLight Component (React Native)
 * 
 * 역할: 음성 인식 상태를 시각적으로 표시하는 신호등 컴포넌트입니다.
 * 
 * 입력:
 * - status: 현재 상태 ('idle', 'listening', 'analyzing', 'ready')
 * 
 * 출력:
 * - 상태에 따른 색상 변화
 * - 접근성을 위한 accessibility 속성
 * 
 * 향후 연동 지점:
 * - 실제 음성 인식 API와 연동
 * - 더 세밀한 상태 관리
 */
import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

interface TurnLightProps {
  status: 'idle' | 'listening' | 'analyzing' | 'ready';
}

const TurnLight: React.FC<TurnLightProps> = ({ status }) => {
  const getStatusInfo = () => {
    switch (status) {
      case 'idle':
        return { color: '#FF4444', text: '대기 중' };
      case 'listening':
        return { color: '#FFB84D', text: '듣는 중...' };
      case 'analyzing':
        return { color: '#FFB84D', text: '분석 중...' };
      case 'ready':
        return { color: '#44CC44', text: '준비 완료' };
      default:
        return { color: '#FF4444', text: '대기 중' };
    }
  };

  const statusInfo = getStatusInfo();
  const isActive = status === 'listening' || status === 'analyzing';

  return (
    <View
      style={styles.container}
      accessibilityLiveRegion="polite"
      accessibilityLabel={`현재 상태: ${statusInfo.text}`}
    >
      {/* 신호등 원형 표시 */}
      <View
        style={[
          styles.light,
          { backgroundColor: statusInfo.color },
          isActive && styles.activeLight
        ]}
        accessibilityRole="status"
        accessibilityLabel={statusInfo.text}
      />
      
      {/* 상태 텍스트 */}
      <Text style={styles.text}>
        {statusInfo.text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  light: {
    width: 16,
    height: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  activeLight: {
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 4,
  },
  text: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
});

export default TurnLight;
