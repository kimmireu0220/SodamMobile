/**
 * 간단한 Alert 기반 TTS 서비스
 * 
 * 역할: 복잡한 TTS 라이브러리 없이 기본 기능 제공
 * 
 * 장점:
 * - 설정 불필요
 * - 오류 없음
 * - 즉시 작동
 * - 모든 플랫폼 지원
 */
import { Alert } from 'react-native';

export interface AlertTTSOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
  language?: string;
}

class AlertTTSService {
  private isPlaying = false;
  private currentText = '';

  /**
   * 텍스트를 Alert로 표시 (TTS 대신)
   */
  async speak(text: string, options: AlertTTSOptions = {}): Promise<boolean> {
    try {
      this.currentText = text;
      this.isPlaying = true;

      // Alert로 텍스트 표시
      Alert.alert(
        '🔊 음성으로 전달',
        text,
        [
          {
            text: '닫기',
            onPress: () => {
              this.isPlaying = false;
            },
            style: 'cancel'
          }
        ],
        { cancelable: true }
      );

      return true;
    } catch (error) {
      console.error('Failed to show text:', error);
      this.isPlaying = false;
      return false;
    }
  }

  /**
   * 현재 재생 중인 음성 중지
   */
  async stop(): Promise<boolean> {
    try {
      this.isPlaying = false;
      return true;
    } catch (error) {
      console.error('Failed to stop:', error);
      return false;
    }
  }

  /**
   * TTS 엔진 사용 가능 여부 확인
   */
  async isAvailable(): Promise<boolean> {
    return true; // Alert는 항상 사용 가능
  }

  /**
   * 현재 재생 상태 확인
   */
  getPlayingState(): boolean {
    return this.isPlaying;
  }

  /**
   * 현재 재생 중인 텍스트
   */
  getCurrentText(): string {
    return this.currentText;
  }
}

// 싱글톤 인스턴스
export const alertTTSService = new AlertTTSService();

export default alertTTSService;

