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
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import AppLayout from '../components/AppLayout';
import QuickPhrases from '../components/QuickPhrases';
import BigTextCard from '../components/BigTextCard';
import storageService from '../services/StorageService';
import { CustomPhrase } from '../types/data';

type SpeakScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

interface SpeakProps {
  onNavigate?: (path: string) => void;
}

const Speak: React.FC<SpeakProps> = ({ onNavigate }) => {
  const navigation = useNavigation<SpeakScreenNavigationProp>();
  const [text, setText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [phrases, setPhrases] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 마이페이지의 개인 상용구 로드
  useEffect(() => {
    loadPhrases();
  }, []);

  const loadPhrases = async () => {
    try {
      const customPhrases = await storageService.get<CustomPhrase[]>('CUSTOM_PHRASES');
      if (customPhrases && customPhrases.length > 0) {
        // 사용 횟수 순으로 정렬하여 상위 6개만 표시
        const sortedPhrases = [...customPhrases]
          .sort((a, b) => b.usageCount - a.usageCount)
          .slice(0, 6)
          .map(p => p.text);
        setPhrases(sortedPhrases);
      } else {
        // 저장된 상용구가 없으면 기본 상용구 사용 (6개)
        setPhrases([
          '안녕하세요',
          '감사합니다',
          '죄송합니다',
          '괜찮습니다',
          '네',
          '아니요'
        ]);
      }
    } catch (error) {
      console.error('Failed to load custom phrases:', error);
      // 에러 시 기본 상용구 사용
      setPhrases([
        '안녕하세요',
        '감사합니다',
        '죄송합니다',
        '괜찮습니다',
        '네',
        '아니요'
      ]);
    } finally {
      setIsLoading(false);
    }
  };

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

  const handleLogoClick = () => {
    // 홈으로 이동
    if (onNavigate) {
      onNavigate('/');
    } else {
      navigation.navigate('Main', { screen: 'Home' });
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <AppLayout onLogoClick={handleLogoClick}>
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

    </AppLayout>
  );
};

const styles = StyleSheet.create({
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
