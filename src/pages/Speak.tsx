/**
 * Speak Page (React Native)
 * 
 * 역할: 텍스트 입력 및 빠른 응답 기능을 제공합니다.
 * 
 * 입력:
 * - onNavigate: 네비게이션 클릭 시 호출되는 콜백 함수
 * 
 * 출력:
 * - 텍스트 입력창
 * - 빠른 응답 문구들
 * - BigTextCard 모달
 * 
 * 향후 연동 지점:
 * - TTS 기능 연동
 * - 사용자 맞춤 문구 저장
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert
} from 'react-native';
import Header from '../components/Header';
import QuickPhrases from '../components/QuickPhrases';
import BigTextCard from '../components/BigTextCard';

interface SpeakProps {
  onNavigate?: (path: string) => void;
}

const Speak: React.FC<SpeakProps> = ({ onNavigate }) => {
  const [text, setText] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handlePhraseClick = (phrase: string) => {
    setText(phrase);
  };

  const handleSubmit = () => {
    if (text.trim()) {
      setShowModal(true);
    } else {
      Alert.alert('알림', '텍스트를 입력해주세요.');
    }
  };

  const handleMenuClick = () => {
    if (onNavigate) onNavigate('/about');
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // 더미 상용구 데이터
  const phrases = [
    '안녕하세요',
    '감사합니다',
    '죄송합니다',
    '괜찮습니다',
    '네',
    '아니요',
    '도움이 필요합니다',
    '화장실은 어디인가요?',
    '얼마나 걸리나요?',
    '언제 시작하나요?'
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <Header onMenuClick={handleMenuClick} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* 제목 */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>
            텍스트로 말하기
          </Text>
          <Text style={styles.subtitle}>
            직접 입력하거나 상용구를 선택하여 음성으로 전달하세요
          </Text>
        </View>

        {/* 곰 캐릭터 */}
        <View style={styles.characterSection}>
          <Text style={styles.characterEmoji}>
            🐻
          </Text>
        </View>

        {/* 텍스트 입력 */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>
            전달할 메시지
          </Text>
          <TextInput
            style={styles.textInput}
            value={text}
            onChangeText={setText}
            placeholder="메시지를 입력하세요..."
            multiline
            textAlignVertical="top"
          />
          
          <TouchableOpacity
            onPress={handleSubmit}
            style={[
              styles.submitButton,
              !text.trim() && styles.submitButtonDisabled
            ]}
            disabled={!text.trim()}
            accessibilityLabel="메시지 전달하기"
            accessibilityRole="button"
          >
            <Text style={[
              styles.submitButtonText,
              !text.trim() && styles.submitButtonTextDisabled
            ]}>
              전달하기
            </Text>
          </TouchableOpacity>
        </View>

        {/* 빠른 응답 문구 */}
        <QuickPhrases 
          phrases={phrases}
          onPhraseClick={handlePhraseClick}
        />
      </ScrollView>

      {/* BigTextCard 모달 */}
      <BigTextCard
        text={text}
        isVisible={showModal}
        onClose={handleCloseModal}
      />

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
    paddingBottom: 80, // 하단 네비게이션 공간
  },
  titleSection: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2E7D32',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
  },
  characterSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  characterEmoji: {
    fontSize: 80,
  },
  inputSection: {
    backgroundColor: '#ffffff',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 12,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
    marginBottom: 16,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#2E7D32',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#cccccc',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  submitButtonTextDisabled: {
    color: '#999999',
  },
});

export default Speak;
