/**
 * MicButton Component (React Native)
 * 
 * 역할: 마이크 버튼을 통해 음성 인식 상태를 제어합니다.
 * 
 * 입력:
 * - status: 현재 상태 ('idle', 'listening', 'analyzing', 'ready')
 * - onClick: 버튼 클릭 시 호출되는 콜백 함수
 * 
 * 출력:
 * - 상태에 따른 마이크 버튼 모양 변화
 * - 접근성을 위한 accessibility 속성
 * 
 * 향후 연동 지점:
 * - 실제 음성 인식 API 연동
 * - 오디오 스트림 처리
 * - 음성 품질 모니터링
 */
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View
} from 'react-native';

interface MicButtonProps {
  status: 'idle' | 'listening' | 'analyzing' | 'ready';
  onClick: () => void;
}

const MicButton: React.FC<MicButtonProps> = ({ status, onClick }) => {
  const getButtonInfo = () => {
    switch (status) {
      case 'idle':
        return {
          icon: '🎤',
          text: '대화 듣기',
          color: '#2E7D32',
          disabled: false
        };
      case 'listening':
        return {
          icon: '⏸️',
          text: '일시 정지',
          color: '#f44336',
          disabled: false
        };
      case 'analyzing':
        return {
          icon: '⏸️',
          text: '일시 정지',
          color: '#f44336',
          disabled: false
        };
      case 'ready':
        return {
          icon: '🔄',
          text: '다시 듣기',
          color: '#2E7D32',
          disabled: false
        };
      default:
        return {
          icon: '🎤',
          text: '대화 듣기',
          color: '#2E7D32',
          disabled: false
        };
    }
  };

  const buttonInfo = getButtonInfo();
  const isActive = status === 'listening' || status === 'analyzing';

  return (
    <TouchableOpacity
      onPress={onClick}
      disabled={buttonInfo.disabled}
      style={[
        styles.button,
        { backgroundColor: buttonInfo.color },
        isActive && styles.activeButton
      ]}
      accessibilityLabel={`${buttonInfo.text} 버튼`}
      accessibilityRole="button"
    >
      <View style={styles.buttonContent}>
        <Text style={styles.icon}>
          {buttonInfo.icon}
        </Text>
        <Text style={styles.text}>
          {buttonInfo.text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2E7D32',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    minWidth: 160,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activeButton: {
    shadowColor: '#f44336',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  icon: {
    fontSize: 24,
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default MicButton;
