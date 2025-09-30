/**
 * AvatarCard Component (React Native)
 * 
 * 역할: 곰 캐릭터를 표시하며, 상태에 따른 애니메이션을 제공합니다.
 * 
 * 입력:
 * - status: 현재 상태 ('idle', 'listening', 'analyzing', 'ready')
 * - message: 표시할 메시지 (ready 상태에서만)
 * 
 * 출력:
 * - 곰 캐릭터 이미지
 * - 상태에 따른 애니메이션
 * 
 * 향후 연동 지점:
 * - 실제 수화 애니메이션 연동
 * - 음성 인식 결과에 따른 동적 표현
 */
import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

interface AvatarCardProps {
  status: 'idle' | 'listening' | 'analyzing' | 'ready';
  message?: string;
}

const AvatarCard: React.FC<AvatarCardProps> = ({ status, message }) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'listening':
        return '👂';
      case 'analyzing':
        return '💭';
      case 'ready':
        return '🤟';
      default:
        return null;
    }
  };

  const statusIcon = getStatusIcon();

  return (
    <View style={styles.container}>
      {/* 상태 아이콘 */}
      {statusIcon && (
        <View style={styles.statusIcon}>
          <Text style={[
            styles.statusIconText,
            status === 'analyzing' && styles.bounceAnimation
          ]}>
            {statusIcon}
          </Text>
        </View>
      )}

      {/* 곰 캐릭터 */}
      <View style={[
        styles.avatarContainer,
        status === 'ready' && styles.shakeAnimation
      ]}>
        <Text style={[
          styles.bearEmoji,
          status === 'idle' && styles.idleStyle
        ]}>
          🐻
        </Text>
      </View>

      {/* 메시지 표시 (ready 상태에서만) */}
      {status === 'ready' && message && (
        <Text style={styles.message}>
          {message}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
    padding: 24,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    position: 'relative',
  },
  statusIcon: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  statusIconText: {
    fontSize: 32,
  },
  bounceAnimation: {
    // React Native에서는 Animated API를 사용해야 함
    // 현재는 정적 스타일로 구현
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  shakeAnimation: {
    // React Native에서는 Animated API를 사용해야 함
    // 현재는 정적 스타일로 구현
  },
  bearEmoji: {
    fontSize: 80,
  },
  idleStyle: {
    opacity: 0.8,
  },
  message: {
    fontSize: 16,
    color: '#2E7D32',
    textAlign: 'center',
    marginTop: 8,
    fontWeight: '500',
  },
});

export default AvatarCard;
