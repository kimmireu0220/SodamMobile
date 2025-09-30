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
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView
} from 'react-native';
import Header from '../components/Header';
import AvatarCard from '../components/AvatarCard';
import MicButton from '../components/MicButton';
import TurnLight from '../components/TurnLight';
import SpeechBubble from '../components/SpeechBubble';
import KSLResultCard from '../components/KSLResultCard';

interface TranslateProps {
  onNavigate?: (path: string) => void;
}

const Translate: React.FC<TranslateProps> = ({ onNavigate }) => {
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

  const handleMenuClick = () => {
    if (onNavigate) onNavigate('/about');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <Header onMenuClick={handleMenuClick} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* 곰 캐릭터 */}
        <AvatarCard 
          status={status} 
          message={status === 'ready' ? '수화 변환이 완료되었습니다!' : undefined}
        />

        {/* 상태 표시 */}
        <TurnLight status={status} />

        {/* 말풍선 */}
        {transcript && (
          <SpeechBubble message={transcript} />
        )}

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

        {/* 사용 안내 */}
        <View style={styles.guideContainer}>
          <Text style={styles.guideTitle}>
            사용 방법
          </Text>
          <Text style={styles.guideText}>
            • 마이크 버튼을 눌러 음성을 인식하세요{'\n'}
            • 명확하고 천천히 말씀해 주세요{'\n'}
            • 조용한 환경에서 사용하세요
          </Text>
        </View>
          </ScrollView>
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
  micContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  guideContainer: {
    backgroundColor: '#ffffff',
    margin: 16,
    padding: 16,
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
  guideTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  guideText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
});

export default Translate;
