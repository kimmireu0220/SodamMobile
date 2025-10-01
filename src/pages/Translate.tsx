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
 * - 실제 STT API 연동 (향후 구현)
 * - 수화 애니메이션 연동 (향후 구현)
 * - 음성 품질 모니터링 (향후 구현)
 */
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView
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

type TranslateScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

interface TranslateProps {
  onNavigate?: (path: string) => void;
}

const Translate: React.FC<TranslateProps> = ({ onNavigate }) => {
  const navigation = useNavigation<TranslateScreenNavigationProp>();
  const [status, setStatus] = useState<'idle' | 'listening' | 'analyzing' | 'converting' | 'signing' | 'ready'>('idle');
  const [transcript, setTranscript] = useState('');
  const [kslResult, setKslResult] = useState<{ gloss: string; confidence: number } | null>(null);

  const handleMicClick = () => {
    switch (status) {
      case 'idle':
        setStatus('listening');
        // TODO: 실제 음성 인식 시작
        setTimeout(() => {
          setStatus('analyzing');
          setTranscript('안녕하세요, 반갑습니다');
          setTimeout(() => {
            setStatus('converting');
            setTimeout(() => {
              setStatus('signing');
              setTimeout(() => {
                setStatus('ready');
                setKslResult({
                  gloss: '안녕 반갑다',
                  confidence: 0.85
                });
              }, 1000);
            }, 1000);
          }, 2000);
        }, 3000);
        break;
      case 'listening':
        setStatus('analyzing');
        break;
      case 'analyzing':
        setStatus('converting');
        break;
      case 'converting':
        setStatus('signing');
        break;
      case 'signing':
        setStatus('ready');
        break;
      case 'ready':
        setStatus('idle');
        setTranscript('');
        setKslResult(null);
        break;
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
          {transcript && (status === 'converting' || status === 'signing' || status === 'ready') && (
            <SpeechBubble message={`"${transcript}"`} />
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
            original={transcript}
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
