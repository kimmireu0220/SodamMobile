/**
 * 간단한 TTS 서비스 (Expo Speech API 사용)
 * 
 * 역할: Expo Speech API를 사용한 간단하고 안정적인 TTS 기능
 * 
 * 장점:
 * - 설정이 간단함
 * - 권한 문제 없음
 * - 안정적으로 작동
 * - 한국어 지원
 */
// @ts-ignore - expo-speech는 선택적 의존성입니다
import * as Speech from 'expo-speech';

export interface SimpleTTSOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
  language?: string;
}

class SimpleTTSService {
  private isPlaying = false;
  private currentText = '';

  /**
   * 텍스트를 음성으로 변환하여 재생
   */
  async speak(text: string, options: SimpleTTSOptions = {}): Promise<boolean> {
    try {
      // 이전 음성 중지
      if (this.isPlaying) {
        await this.stop();
      }

      this.currentText = text;
      this.isPlaying = true;

      // Expo Speech로 음성 재생
      await Speech.speak(text, {
        rate: options.rate || 0.8,    // 속도 (0.1 ~ 2.0)
        pitch: options.pitch || 1.0,  // 피치 (0.5 ~ 2.0)
        volume: options.volume || 1.0, // 볼륨 (0.0 ~ 1.0)
        language: options.language || 'ko-KR', // 한국어
        onStart: () => {
          console.log('TTS started');
          this.isPlaying = true;
        },
        onDone: () => {
          console.log('TTS finished');
          this.isPlaying = false;
        },
        onStopped: () => {
          console.log('TTS stopped');
          this.isPlaying = false;
        },
        onError: (error: any) => {
          console.error('TTS error:', error);
          this.isPlaying = false;
        }
      });

      return true;
    } catch (error) {
      console.error('Failed to speak text:', error);
      this.isPlaying = false;
      return false;
    }
  }

  /**
   * 현재 재생 중인 음성 중지
   */
  async stop(): Promise<boolean> {
    try {
      if (this.isPlaying) {
        await Speech.stop();
        this.isPlaying = false;
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to stop TTS:', error);
      return false;
    }
  }

  /**
   * TTS 엔진 사용 가능 여부 확인
   */
  async isAvailable(): Promise<boolean> {
    // Expo Speech는 항상 사용 가능
    return true;
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
export const simpleTTSService = new SimpleTTSService();

export default simpleTTSService;

