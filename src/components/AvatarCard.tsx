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
  StyleSheet,
  Image
} from 'react-native';

interface AvatarCardProps {
  status: 'idle' | 'listening' | 'analyzing' | 'converting' | 'signing' | 'ready';
  message?: string;
}

const AvatarCard: React.FC<AvatarCardProps> = ({ status, message }) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'listening':
        return '👂';
      case 'analyzing':
        return '💭';
      case 'converting':
        return '🔄';
      case 'signing':
        return '🤟';
      case 'ready':
        return '✅';
      default:
        return null;
    }
  };

  const getBearImage = () => {
    // Sodam-main과 정확히 동일한 로직
    if (status === 'ready') {
      return require('../assets/bear-suggest.png');
    } else if (status === 'analyzing') {
      return require('../assets/bear-thinking.png');
    } else if (status === 'converting') {
      return require('../assets/bear-suggest.png');
    } else if (status === 'signing') {
      return require('../assets/bear-sign.png');
    } else {
      return require('../assets/bear-pointing.png');
    }
  };

  const statusIcon = getStatusIcon();
  const bearImage = getBearImage();

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
        <Image
          source={bearImage}
          style={[
            styles.bearImage,
            status === 'idle' && styles.idleStyle
          ]}
          resizeMode="contain"
        />
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
    gap: 24,
    padding: 40,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    margin: 20,
    marginBottom: 20,
    minHeight: 280,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
    position: 'relative',
  },
  statusIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    padding: 4,
  },
  statusIconText: {
    fontSize: 24,
  },
  bounceAnimation: {
    // React Native에서는 Animated API를 사용해야 함
    // 현재는 정적 스타일로 구현
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
    minHeight: 200,
  },
  shakeAnimation: {
    // React Native에서는 Animated API를 사용해야 함
    // 현재는 정적 스타일로 구현
  },
  bearImage: {
    width: 160,
    height: 160,
  },
  idleStyle: {
    opacity: 0.9,
  },
  message: {
    fontSize: 16,
    color: '#2E7D32',
    textAlign: 'center',
    marginTop: 8,
    fontWeight: '600',
    backgroundColor: '#f0f8f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
});

export default AvatarCard;
