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
  StyleProp,
  ViewStyle
} from 'react-native';

interface SpeechBubbleProps {
  message: string;
  style?: StyleProp<ViewStyle>;
}

const SpeechBubble: React.FC<SpeechBubbleProps> = ({ message, style }) => {
  if (!message) return null;

  return (
    <View
      style={[styles.container, style]}
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
    marginHorizontal: 20,
    marginBottom: 8,
    alignItems: 'center',
  },
  bubble: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    maxWidth: 300,
    alignItems: 'center',
  },
  message: {
    fontSize: 16,
    fontWeight: '400',
    color: '#666666',
    textAlign: 'center',
    lineHeight: 22,
  },
  tail: {
    position: 'absolute',
    bottom: -6,
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#f8f9fa',
  },
});

export default SpeechBubble;
