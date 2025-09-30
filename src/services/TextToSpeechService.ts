/**
 * 음성 합성(TTS) 서비스
 * iOS에서는 Alert 기반의 간단한 TTS, Android에서는 react-native-tts 사용
 */
import { Platform, Alert } from 'react-native';
import Tts from 'react-native-tts';

export interface TTSOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
  language?: string;
}

export interface TTSState {
  isPlaying: boolean;
  isPaused: boolean;
  isStopped: boolean;
}

export type TTSStatus = 'idle' | 'playing' | 'paused' | 'stopped' | 'error';

class TextToSpeechService {
  private listeners: {
    onStart?: () => void;
    onFinish?: () => void;
    onPause?: () => void;
    onResume?: () => void;
    onStop?: () => void;
    onError?: (error: string) => void;
    onStatusChange?: (status: TTSStatus) => void;
  } = {};

  private currentStatus: TTSStatus = 'idle';
  private isInitialized = false;
  private isIOS = Platform.OS === 'ios';

  constructor() {
    this.initialize();
  }

  private async initialize() {
    try {
      // iOS에서는 Alert 사용, Android에서만 react-native-tts 초기화
      if (this.isIOS) {
        console.log('iOS: Using Alert-based TTS');
        this.isInitialized = true;
        return;
      }

      // Android: TTS 초기화
      await Tts.setDefaultLanguage('ko-KR');
      await Tts.setDefaultRate(0.5);
      await Tts.setDefaultPitch(1.0);
      
      // 이벤트 리스너 설정
      Tts.addEventListener('tts-start', this.onStart.bind(this));
      Tts.addEventListener('tts-finish', this.onFinish.bind(this));
      Tts.addEventListener('tts-cancel', this.onStop.bind(this));
      Tts.addEventListener('tts-progress', this.onProgress.bind(this));
      Tts.addEventListener('tts-error', this.onError.bind(this));
      
      this.isInitialized = true;
      console.log('Android: Text-to-Speech Service initialized');
    } catch (error) {
      console.error('Failed to initialize Text-to-Speech Service:', error);
    }
  }

  private onStart = () => {
    console.log('TTS started');
    this.setStatus('playing');
    this.listeners.onStart?.();
  };

  private onFinish = () => {
    console.log('TTS finished');
    this.setStatus('idle');
    this.listeners.onFinish?.();
  };

  private onPause = () => {
    console.log('TTS paused');
    this.setStatus('paused');
    this.listeners.onPause?.();
  };

  private onResume = () => {
    console.log('TTS resumed');
    this.setStatus('playing');
    this.listeners.onResume?.();
  };

  private onStop = () => {
    console.log('TTS stopped');
    this.setStatus('stopped');
    this.listeners.onStop?.();
  };

  private onProgress = (event: any) => {
    console.log('TTS progress:', event);
  };

  private onError = (event: any) => {
    const error = event.error || 'Unknown TTS error';
    console.error('TTS error:', error);
    this.setStatus('error');
    this.listeners.onError?.(error);
  };

  private setStatus(status: TTSStatus) {
    this.currentStatus = status;
    this.listeners.onStatusChange?.(status);
  }

  /**
   * 텍스트를 음성으로 변환하여 재생
   */
  async speak(text: string, options: TTSOptions = {}): Promise<boolean> {
    if (!this.isInitialized) {
      console.error('Text-to-Speech Service not initialized');
      return false;
    }

    if (!text || text.trim() === '') {
      console.warn('Empty text provided to TTS');
      return false;
    }

    try {
      // iOS: Alert로 텍스트 표시
      if (this.isIOS) {
        this.setStatus('playing');
        this.listeners.onStart?.();
        
        Alert.alert('음성 메시지', text, [
          {
            text: '확인',
            onPress: () => {
              this.setStatus('idle');
              this.listeners.onFinish?.();
            }
          }
        ]);
        
        return true;
      }

      // Android: react-native-tts 사용
      if (options.rate !== undefined) {
        await Tts.setDefaultRate(options.rate);
      }
      if (options.pitch !== undefined) {
        await Tts.setDefaultPitch(options.pitch);
      }
      if (options.language) {
        await Tts.setDefaultLanguage(options.language);
      }

      await Tts.speak(text);
      return true;
    } catch (error) {
      console.error('Failed to speak text:', error);
      this.setStatus('error');
      return false;
    }
  }

  /**
   * 현재 재생 중인 음성 일시정지
   */
  async pause(): Promise<boolean> {
    try {
      // iOS는 Alert 기반이므로 pause 불가
      if (this.isIOS) {
        console.warn('Pause not supported on iOS (Alert-based TTS)');
        return false;
      }
      
      // Android: stop으로 대체
      await Tts.stop();
      return true;
    } catch (error) {
      console.error('Failed to pause TTS:', error);
      return false;
    }
  }

  /**
   * 일시정지된 음성 재개
   */
  async resume(): Promise<boolean> {
    try {
      // iOS/Android 모두 지원하지 않음
      console.warn('Resume functionality not supported');
      return false;
    } catch (error) {
      console.error('Failed to resume TTS:', error);
      return false;
    }
  }

  /**
   * 현재 재생 중인 음성 중지
   */
  async stop(): Promise<boolean> {
    try {
      // iOS는 Alert 기반이므로 stop 불가 (사용자가 수동으로 닫음)
      if (this.isIOS) {
        this.setStatus('stopped');
        return true;
      }
      
      // Android
      await Tts.stop();
      return true;
    } catch (error) {
      console.error('Failed to stop TTS:', error);
      return false;
    }
  }

  /**
   * TTS 엔진 사용 가능 여부 확인
   */
  async isAvailable(): Promise<boolean> {
    try {
      // iOS는 Alert 기반이므로 항상 사용 가능
      if (this.isIOS) {
        return true;
      }
      
      const voices = await Tts.voices();
      return voices && voices.length > 0;
    } catch (error) {
      console.error('Failed to check TTS availability:', error);
      return false;
    }
  }

  /**
   * 사용 가능한 음성 목록 가져오기
   */
  async getVoices(): Promise<any[]> {
    try {
      // iOS는 Alert 기반이므로 빈 배열 반환
      if (this.isIOS) {
        return [];
      }
      
      const voices = await Tts.voices();
      return voices || [];
    } catch (error) {
      console.error('Failed to get voices:', error);
      return [];
    }
  }

  /**
   * 현재 상태 반환
   */
  getStatus(): TTSStatus {
    return this.currentStatus;
  }

  /**
   * 이벤트 리스너 설정
   */
  setListeners(listeners: {
    onStart?: () => void;
    onFinish?: () => void;
    onPause?: () => void;
    onResume?: () => void;
    onStop?: () => void;
    onError?: (error: string) => void;
    onStatusChange?: (status: TTSStatus) => void;
  }) {
    this.listeners = { ...this.listeners, ...listeners };
  }

  /**
   * 리소스 정리
   */
  destroy() {
    // iOS는 Alert 기반이므로 정리할 리스너 없음
    if (!this.isIOS) {
      Tts.removeAllListeners('tts-start');
      Tts.removeAllListeners('tts-finish');
      Tts.removeAllListeners('tts-cancel');
      Tts.removeAllListeners('tts-pause');
      Tts.removeAllListeners('tts-resume');
      Tts.removeAllListeners('tts-progress');
      Tts.removeAllListeners('tts-error');
    }
    
    this.listeners = {};
    this.isInitialized = false;
  }
}

// 싱글톤 인스턴스
export const textToSpeechService = new TextToSpeechService();

export default textToSpeechService;
