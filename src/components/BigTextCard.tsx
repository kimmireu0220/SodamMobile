/**
 * BigTextCard Component (React Native)
 * 
 * 역할: 텍스트를 큰 글자로 표시하는 모달 컴포넌트입니다.
 * 
 * 입력:
 * - text: 표시할 텍스트
 * - isVisible: 모달 표시 여부
 * - onClose: 모달 닫기 콜백 함수
 * 
 * 출력:
 * - 큰 글자로 표시된 텍스트
 * - 닫기 버튼
 * - 배경 오버레이
 * - TTS 기능 (향후 구현)
 * 
 * 향후 연동 지점:
 * - TTS 기능 연동
 * - 텍스트 크기 조절 기능
 */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  SafeAreaView,
  ScrollView
} from 'react-native';
import nativeTTSService from '../services/NativeTTSService';

interface BigTextCardProps {
  text: string;
  isVisible: boolean;
  onClose: () => void;
}

const BigTextCard: React.FC<BigTextCardProps> = ({ text, isVisible, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // TTS 상태 확인
  useEffect(() => {
    const checkPlayingState = () => {
      setIsPlaying(nativeTTSService.getPlayingState());
    };

    // 주기적으로 재생 상태 확인
    const interval = setInterval(checkPlayingState, 500);

    return () => {
      clearInterval(interval);
      // 컴포넌트 언마운트 시 TTS 중지
      if (isPlaying) {
        nativeTTSService.stop();
      }
    };
  }, [isPlaying]);

  // 모달이 닫힐 때 음성 중지
  useEffect(() => {
    if (!isVisible && isPlaying) {
      nativeTTSService.stop();
    }
  }, [isVisible, isPlaying]);

  const handleSpeakClick = async () => {
    if (isPlaying) {
      // 재생 중이면 중지
      await nativeTTSService.stop();
    } else {
      // 재생 시작
      const success = await nativeTTSService.speak(text, {
        rate: 0.5,    // 속도 (조금 느리게)
        pitch: 1.0,   // 피치 (기본)
        language: 'ko-KR' // 한국어
      });

      if (!success) {
        console.error('TTS 재생 실패');
      }
    }
  };

  if (!isVisible) return null;

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.modalContainer}>
            {/* 닫기 버튼 */}
            <TouchableOpacity
              onPress={onClose}
              style={styles.closeButton}
              accessibilityLabel="닫기"
              accessibilityRole="button"
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>

            {/* 제목 */}
            <Text style={styles.title}>
              전달할 메시지
            </Text>

            {/* 큰 텍스트 */}
            <ScrollView 
              style={styles.textContainer}
              contentContainerStyle={styles.textContent}
            >
              <Text style={[
                styles.bigText,
                text.length > 50 && styles.bigTextSmall
              ]}>
                {text}
              </Text>
            </ScrollView>

            {/* 액션 버튼 */}
            <View style={styles.actionContainer}>
              <TouchableOpacity
                onPress={handleSpeakClick}
                disabled={!text.trim()}
                style={[
                  styles.speakButton,
                  isPlaying && styles.speakButtonActive,
                  !text.trim() && styles.speakButtonDisabled
                ]}
                accessibilityLabel={isPlaying ? '음성 재생 중지' : '음성으로 전달'}
                accessibilityRole="button"
              >
                {isPlaying && (
                  <Text style={styles.speakerIcon}>🔊</Text>
                )}
                <Text style={[
                  styles.speakButtonText,
                  isPlaying && styles.speakButtonTextActive
                ]}>
                  {isPlaying ? '재생 중...' : '음성으로 전달'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 24,
    maxWidth: '95%',
    maxHeight: '90%',
    width: '100%',
    minWidth: 300,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 20,
    color: '#666666',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 20,
    textAlign: 'center',
  },
  textContainer: {
    maxHeight: '50%',
    marginBottom: 24,
  },
  textContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 120,
    padding: 16,
  },
  bigText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#2E7D32',
    textAlign: 'center',
    lineHeight: 40,
  },
  bigTextSmall: {
    fontSize: 24,
    lineHeight: 32,
  },
  actionContainer: {
    alignItems: 'center',
  },
  speakButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2E7D32',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 120,
  },
  speakButtonActive: {
    backgroundColor: '#666666',
  },
  speakButtonDisabled: {
    backgroundColor: '#cccccc',
  },
  speakerIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  speakButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  speakButtonTextActive: {
    color: '#ffffff',
  },
});

export default BigTextCard;
