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
  status: 'idle' | 'listening' | 'analyzing' | 'converting' | 'signing' | 'ready';
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
      case 'converting':
        return { color: '#4D9FFF', text: '변환 중...' };
      case 'signing':
        return { color: '#4D9FFF', text: '수화 변환 중...' };
      case 'ready':
        return { color: '#44CC44', text: '준비 완료' };
      default:
        return { color: '#FF4444', text: '대기 중' };
    }
  };

  const statusInfo = getStatusInfo();
  const isActive = status === 'listening' || status === 'analyzing' || status === 'converting' || status === 'signing';

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
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  light: {
    width: 20,
    height: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 3,
  },
  activeLight: {
    shadowOpacity: 0.8,
    shadowRadius: 12,
    elevation: 6,
  },
  text: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '600',
  },
});

export default TurnLight;
