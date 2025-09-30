/**
 * 네이티브 TTS 서비스 (react-native-tts 사용)
 * 
 * 역할: react-native-tts를 사용한 실제 음성 재생
 * 
 * 장점:
 * - 실제 음성 재생
 * - 한국어 지원
 * - iOS/Android 네이티브 TTS 엔진 사용
 */
import Tts from 'react-native-tts';

export interface NativeTTSOptions {
  rate?: number;
  pitch?: number;
  language?: string;
}

class NativeTTSService {
  private isPlaying = false;
  private isInitialized = false;

  constructor() {
    this.initialize();
  }

  /**
   * TTS 초기화
   */
  private async initialize() {
    try {
      // 한국어 설정
      await Tts.setDefaultLanguage('ko-KR');
      
      // iOS에서 setDefaultRate/Pitch가 타입 에러를 일으킬 수 있으므로 try-catch로 감싸기
      try {
        await Tts.setDefaultRate(0.5, false); // 속도 (두 번째 파라미터는 skipTransform)
      } catch (e) {
        console.warn('setDefaultRate 실패, 기본값 사용');
      }
      
      try {
        await Tts.setDefaultPitch(1.0);
      } catch (e) {
        console.warn('setDefaultPitch 실패, 기본값 사용');
      }
      
      // 이벤트 리스너
      Tts.addEventListener('tts-start', () => {
        this.isPlaying = true;
      });
      
      Tts.addEventListener('tts-finish', () => {
        this.isPlaying = false;
      });
      
      Tts.addEventListener('tts-cancel', () => {
        this.isPlaying = false;
      });
      
      this.isInitialized = true;
      console.log('✅ TTS 초기화 완료');
    } catch (error) {
      console.error('❌ TTS 초기화 실패:', error);
      this.isInitialized = false;
    }
  }

  /**
   * 텍스트를 음성으로 변환
   */
  async speak(text: string, options: NativeTTSOptions = {}): Promise<boolean> {
    try {
      if (!this.isInitialized) {
        console.warn('TTS가 초기화되지 않았습니다');
        await this.initialize();
      }

      // 옵션 적용 (iOS 타입 에러 방지)
      if (options.rate !== undefined) {
        try {
          await Tts.setDefaultRate(options.rate, false);
        } catch (e) {
          console.warn('setDefaultRate 실패');
        }
      }
      if (options.pitch !== undefined) {
        try {
          await Tts.setDefaultPitch(options.pitch);
        } catch (e) {
          console.warn('setDefaultPitch 실패');
        }
      }
      if (options.language) {
        try {
          await Tts.setDefaultLanguage(options.language);
        } catch (e) {
          console.warn('setDefaultLanguage 실패');
        }
      }

      // 음성 재생
      await Tts.speak(text);
      return true;
    } catch (error) {
      console.error('TTS 재생 실패:', error);
      return false;
    }
  }

  /**
   * 음성 중지
   */
  async stop(): Promise<boolean> {
    try {
      // iOS에서 타입 에러 방지를 위해 파라미터 전달
      await Tts.stop(false);
      this.isPlaying = false;
      return true;
    } catch (error) {
      console.error('TTS 중지 실패:', error);
      return false;
    }
  }

  /**
   * 재생 상태 확인
   */
  getPlayingState(): boolean {
    return this.isPlaying;
  }

  /**
   * TTS 사용 가능 여부
   */
  async isAvailable(): Promise<boolean> {
    try {
      const voices = await Tts.voices();
      return voices && voices.length > 0;
    } catch (error) {
      return false;
    }
  }
}

// 싱글톤 인스턴스
export const nativeTTSService = new NativeTTSService();

export default nativeTTSService;

