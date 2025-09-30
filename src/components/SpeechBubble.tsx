/**
 * SpeechBubble Component (React Native)
 * 
 * 역할: 곰돌이 캐릭터 위에 표시되는 말풍선 컴포넌트입니다.
 * 
 * 입력:
 * - message: 말풍선에 표시할 메시지
 * 
 * 출력:
 * - 말풍선 UI
 * - 접근성을 위한 accessibility 속성
 * 
 * 향후 연동 지점:
 * - 애니메이션 효과 추가
 * - 다양한 말풍선 스타일
 */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated
} from 'react-native';

interface SpeechBubbleProps {
  message: string;
}

const SpeechBubble: React.FC<SpeechBubbleProps> = ({ message }) => {
  if (!message) return null;

  return (
    <View
      style={styles.container}
      accessibilityLiveRegion="polite"
      accessibilityLabel={`곰돌이가 말하는 내용: ${message}`}
    >
      {/* 말풍선 본체 */}
      <View style={styles.bubble}>
        <Text style={styles.message}>
          "{message}"
        </Text>
        
        {/* 말풍선 꼬리 */}
        <View style={styles.tail} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 0,
    alignItems: 'center',
  },
  bubble: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 16,
    maxWidth: 280,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  message: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333333',
    textAlign: 'center',
    lineHeight: 24,
  },
  tail: {
    position: 'absolute',
    bottom: -8,
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
});

export default SpeechBubble;
