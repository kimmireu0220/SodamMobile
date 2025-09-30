/**
 * 음성 제어 컴포넌트
 * STT와 TTS 기능을 통합한 음성 제어 인터페이스
 */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Colors, Typography, Spacing, getShadowStyle } from '../styles';
import useSpeechRecognition from '../hooks/useSpeechRecognition';
import useTextToSpeech from '../hooks/useTextToSpeech';

interface SpeechControlsProps {
  onTranscriptChange?: (transcript: string) => void;
  onError?: (error: string) => void;
}

const SpeechControls: React.FC<SpeechControlsProps> = ({
  onTranscriptChange,
  onError,
}) => {
  const [isInitialized, setIsInitialized] = useState(false);
  
  // STT 훅
  const {
    transcript,
    isListening,
    isProcessing,
    error: sttError,
    startListening,
    stopListening,
    cancelListening,
  } = useSpeechRecognition();

  // TTS 훅
  const {
    isPlaying,
    isPaused,
    error: ttsError,
    speak,
    pause,
    resume,
    stop,
  } = useTextToSpeech();

  // 초기화
  useEffect(() => {
    const initializeServices = async () => {
      try {
        // STT 서비스 초기화는 자동으로 처리됨
        // TTS 서비스 초기화는 자동으로 처리됨
        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize speech services:', error);
        Alert.alert('오류', '음성 서비스를 초기화할 수 없습니다.');
      }
    };

    initializeServices();
  }, []);

  // 트랜스크립트 변경 시 콜백 호출
  useEffect(() => {
    if (transcript && onTranscriptChange) {
      onTranscriptChange(transcript);
    }
  }, [transcript, onTranscriptChange]);

  // 에러 발생 시 콜백 호출
  useEffect(() => {
    if (sttError && onError) {
      onError(`음성 인식 오류: ${sttError}`);
    }
  }, [sttError, onError]);

  useEffect(() => {
    if (ttsError && onError) {
      onError(`음성 합성 오류: ${ttsError}`);
    }
  }, [ttsError, onError]);

  // STT 제어 함수들
  const handleStartListening = async () => {
    if (!isInitialized) {
      Alert.alert('알림', '음성 서비스가 초기화되지 않았습니다.');
      return;
    }

    const success = await startListening();
    if (!success) {
      Alert.alert('오류', '음성 인식을 시작할 수 없습니다.');
    }
  };

  const handleStopListening = async () => {
    const success = await stopListening();
    if (!success) {
      Alert.alert('오류', '음성 인식을 중지할 수 없습니다.');
    }
  };

  const handleCancelListening = async () => {
    const success = await cancelListening();
    if (!success) {
      Alert.alert('오류', '음성 인식을 취소할 수 없습니다.');
    }
  };

  // TTS 제어 함수들
  const handleSpeak = async (text: string) => {
    if (!isInitialized) {
      Alert.alert('알림', '음성 서비스가 초기화되지 않았습니다.');
      return;
    }

    if (!text || text.trim() === '') {
      Alert.alert('알림', '재생할 텍스트가 없습니다.');
      return;
    }

    const success = await speak(text, {
      rate: 0.5,
      pitch: 1.0,
      volume: 1.0,
      language: 'ko-KR',
    });

    if (!success) {
      Alert.alert('오류', '음성 재생을 시작할 수 없습니다.');
    }
  };

  const handlePauseTTS = async () => {
    const success = await pause();
    if (!success) {
      Alert.alert('오류', '음성 재생을 일시정지할 수 없습니다.');
    }
  };

  const handleResumeTTS = async () => {
    const success = await resume();
    if (!success) {
      Alert.alert('오류', '음성 재생을 재개할 수 없습니다.');
    }
  };

  const handleStopTTS = async () => {
    const success = await stop();
    if (!success) {
      Alert.alert('오류', '음성 재생을 중지할 수 없습니다.');
    }
  };

  // 상태에 따른 버튼 텍스트 결정
  const getSTTButtonText = () => {
    if (isListening) return '듣는 중...';
    if (isProcessing) return '처리 중...';
    return '음성 인식 시작';
  };

  const getTTSButtonText = () => {
    if (isPlaying) return '재생 중...';
    if (isPaused) return '일시정지됨';
    return '음성 재생';
  };

  return (
    <View style={styles.container}>
      {/* STT 컨트롤 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>음성 인식 (STT)</Text>
        
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.primaryButton,
              (isListening || isProcessing) && styles.activeButton
            ]}
            onPress={isListening ? handleStopListening : handleStartListening}
            disabled={isProcessing}
            accessibilityLabel={getSTTButtonText()}
            accessibilityRole="button"
          >
            <Text style={[
              styles.buttonText,
              (isListening || isProcessing) && styles.activeButtonText
            ]}>
              {getSTTButtonText()}
            </Text>
          </TouchableOpacity>

          {(isListening || isProcessing) && (
            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={handleCancelListening}
              accessibilityLabel="음성 인식 취소"
              accessibilityRole="button"
            >
              <Text style={[styles.buttonText, styles.secondaryButtonText]}>
                취소
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {transcript && (
          <View style={styles.transcriptContainer}>
            <Text style={styles.transcriptLabel}>인식된 텍스트:</Text>
            <Text style={styles.transcriptText}>{transcript}</Text>
          </View>
        )}
      </View>

      {/* TTS 컨트롤 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>음성 합성 (TTS)</Text>
        
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.primaryButton,
              isPlaying && styles.activeButton
            ]}
            onPress={() => handleSpeak(transcript || '안녕하세요')}
            accessibilityLabel={getTTSButtonText()}
            accessibilityRole="button"
          >
            <Text style={[
              styles.buttonText,
              isPlaying && styles.activeButtonText
            ]}>
              {getTTSButtonText()}
            </Text>
          </TouchableOpacity>

          {isPlaying && (
            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={handlePauseTTS}
              accessibilityLabel="음성 재생 일시정지"
              accessibilityRole="button"
            >
              <Text style={[styles.buttonText, styles.secondaryButtonText]}>
                일시정지
              </Text>
            </TouchableOpacity>
          )}

          {isPaused && (
            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={handleResumeTTS}
              accessibilityLabel="음성 재생 재개"
              accessibilityRole="button"
            >
              <Text style={[styles.buttonText, styles.secondaryButtonText]}>
                재개
              </Text>
            </TouchableOpacity>
          )}

          {(isPlaying || isPaused) && (
            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={handleStopTTS}
              accessibilityLabel="음성 재생 중지"
              accessibilityRole="button"
            >
              <Text style={[styles.buttonText, styles.secondaryButtonText]}>
                중지
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* 에러 표시 */}
      {(sttError || ttsError) && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            {sttError || ttsError}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: Spacing.radius.lg,
    padding: Spacing.lg,
    margin: Spacing.lg,
    ...getShadowStyle('md'),
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    flexWrap: 'wrap',
  },
  button: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: Spacing.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    ...getShadowStyle('sm'),
  },
  secondaryButton: {
    backgroundColor: Colors.gray[200],
    borderWidth: Spacing.borderWidth.base,
    borderColor: Colors.border,
  },
  activeButton: {
    backgroundColor: Colors.secondary,
  },
  buttonText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textInverse,
  },
  secondaryButtonText: {
    color: Colors.textPrimary,
  },
  activeButtonText: {
    color: Colors.textInverse,
  },
  transcriptContainer: {
    marginTop: Spacing.md,
    padding: Spacing.md,
    backgroundColor: Colors.gray[50],
    borderRadius: Spacing.radius.md,
    borderWidth: Spacing.borderWidth.base,
    borderColor: Colors.border,
  },
  transcriptLabel: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  transcriptText: {
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
    lineHeight: Typography.lineHeight.normal * Typography.fontSize.base,
  },
  errorContainer: {
    marginTop: Spacing.md,
    padding: Spacing.md,
    backgroundColor: Colors.error + '10',
    borderRadius: Spacing.radius.md,
    borderWidth: Spacing.borderWidth.base,
    borderColor: Colors.error,
  },
  errorText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.error,
    textAlign: 'center',
  },
});

export default SpeechControls;
