/**
 * Translate Page (React Native)
 * 
 * 역할: 음성 인식 및 수화 변환 기능을 제공합니다.
 * 
 * 입력:
 * - onNavigate: 네비게이션 클릭 시 호출되는 콜백 함수
 * 
 * 출력:
 * - 곰 캐릭터
 * - 마이크 제어
 * - 수화 변환 버튼
 * 
 * 기능:
 * - 실제 STT API 연동
 * - 수화 애니메이션 연동 (향후 구현)
 * - 음성 품질 모니터링 (향후 구현)
 */
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
  PermissionsAndroid
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import AppLayout from '../components/AppLayout';
import AvatarCard from '../components/AvatarCard';
import MicButton from '../components/MicButton';
import TurnLight from '../components/TurnLight';
import SpeechBubble from '../components/SpeechBubble';
import KSLResultCard from '../components/KSLResultCard';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import kslConverterService from '../services/KSLConverterService';
import storageService from '../services/StorageService';

type TranslateScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

interface TranslateProps {
  onNavigate?: (path: string) => void;
}

const Translate: React.FC<TranslateProps> = ({ onNavigate }) => {
  const navigation = useNavigation<TranslateScreenNavigationProp>();
  const [status, setStatus] = useState<'idle' | 'listening' | 'analyzing' | 'converting' | 'signing' | 'ready'>('idle');
  const [localTranscript, setLocalTranscript] = useState('');
  const [kslResult, setKslResult] = useState<{ gloss: string; confidence: number } | null>(null);
  
  // 음성 인식 훅 사용
  const {
    transcript,
    isListening,
    isProcessing,
    error,
    startListening,
    stopListening,
    reset
  } = useSpeechRecognition();

  // 마이크 권한 요청
  const requestMicPermission = async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: '마이크 권한 필요',
            message: '음성 인식을 위해 마이크 권한이 필요합니다.',
            buttonNeutral: '나중에',
            buttonNegative: '거부',
            buttonPositive: '허용',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.error('Failed to request mic permission:', err);
        return false;
      }
    }
    // iOS는 Info.plist 설정으로 자동 처리
    return true;
  };

  // 음성 인식 상태 동기화
  useEffect(() => {
    if (isListening) {
      setStatus('listening');
    } else if (isProcessing) {
      setStatus('analyzing');
    }
  }, [isListening, isProcessing]);

  // transcript 결과 처리
  useEffect(() => {
    if (transcript && transcript.trim()) {
      setLocalTranscript(transcript);
      
      // 실제 KSL 변환
      setStatus('converting');
      
      // 약간의 딜레이를 주어 자연스러운 UI 전환
      setTimeout(() => {
        const result = kslConverterService.convert(transcript);
        
        setStatus('signing');
        setTimeout(() => {
          setStatus('ready');
          setKslResult({
            gloss: result.kslGloss,
            confidence: result.confidence
          });
          
          // 변환 기록 저장
          storageService.addKSLTranslation({
            originalText: result.originalText,
            kslGloss: result.kslGloss,
            confidence: result.confidence,
          }).catch(err => {
            console.error('Failed to save KSL translation:', err);
          });
        }, 800);
      }, 500);
    }
  }, [transcript]);

  // 에러 처리
  useEffect(() => {
    if (error) {
      // "No speech detected" 에러는 사용자 친화적인 메시지로 표시
      if (error.includes('1110') || error.includes('No speech detected')) {
        // 에러 표시 없이 조용히 idle로 돌아가기
        setStatus('idle');
      } else {
        // 다른 실제 에러만 표시
        Alert.alert(
          '음성 인식 실패', 
          '음성 인식에 문제가 발생했어요.\n다시 시도해주세요.'
        );
        setStatus('idle');
      }
    }
  }, [error]);

  const handleMicClick = async () => {
    if (status === 'idle') {
      // 권한 체크
      const hasPermission = await requestMicPermission();
      if (!hasPermission) {
        Alert.alert('권한 필요', '마이크 권한이 필요합니다. 설정에서 권한을 허용해주세요.');
        return;
      }

      // 음성 인식 시작
      const success = await startListening();
      if (!success) {
        Alert.alert('오류', '음성 인식을 시작할 수 없습니다.');
      }
    } else if (status === 'listening') {
      // 음성 인식 중지
      await stopListening();
    } else if (status === 'ready') {
      // 초기화
      setStatus('idle');
      setLocalTranscript('');
      setKslResult(null);
      reset();
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

  return (
    <AppLayout onLogoClick={handleLogoClick}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* 곰돌이의 말풍선 - 공간은 항상 확보 */}
        <View style={styles.speechBubbleContainer}>
          {localTranscript && (status === 'converting' || status === 'signing' || status === 'ready') && (
            <SpeechBubble message={`"${localTranscript}"`} />
          )}
        </View>

        {/* 곰 캐릭터 */}
        <AvatarCard 
          status={status} 
        />

        {/* 상태 표시 - ready 상태가 아닐 때만 표시 */}
        {status !== 'ready' && <TurnLight status={status} />}

        {/* KSL 변환 결과 */}
        {kslResult && (
          <KSLResultCard 
            original={localTranscript}
            kslResult={kslResult}
          />
        )}

        {/* 마이크 버튼 */}
        <View style={styles.micContainer}>
          <MicButton 
            status={status}
            onClick={handleMicClick}
          />
        </View>

          </ScrollView>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingBottom: 100, // 하단 네비게이션 공간
  },
  speechBubbleContainer: {
    marginTop: 20,
    minHeight: 60,
  },
  micContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    marginTop: 20,
  },
});

export default Translate;
