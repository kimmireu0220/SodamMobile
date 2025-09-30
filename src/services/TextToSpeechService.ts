/**
 * 음성 합성(TTS) 서비스
 * React Native TTS를 사용한 음성 합성 기능
 */
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

  constructor() {
    this.initialize();
  }

  private async initialize() {
    try {
      // TTS 초기화
      await Tts.setDefaultLanguage('ko-KR');
      await Tts.setDefaultRate(0.5);
      await Tts.setDefaultPitch(1.0);
      
      // 이벤트 리스너 설정
      Tts.addEventListener('tts-start', this.onStart.bind(this));
      Tts.addEventListener('tts-finish', this.onFinish.bind(this));
      Tts.addEventListener('tts-cancel', this.onStop.bind(this));
      // react-native-tts에서 pause/resume 이벤트는 지원하지 않음
      // Tts.addEventListener('tts-pause', this.onPause.bind(this));
      // Tts.addEventListener('tts-resume', this.onResume.bind(this));
      Tts.addEventListener('tts-progress', this.onProgress.bind(this));
      Tts.addEventListener('tts-error', this.onError.bind(this));
      
      this.isInitialized = true;
      console.log('Text-to-Speech Service initialized');
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
      // 옵션 설정
      if (options.rate !== undefined) {
        await Tts.setDefaultRate(options.rate);
      }
      if (options.pitch !== undefined) {
        await Tts.setDefaultPitch(options.pitch);
      }
      // Volume 설정은 react-native-tts에서 지원하지 않음
      // if (options.volume !== undefined) {
      //   await Tts.setDefaultVolume(options.volume);
      // }
      if (options.language) {
        await Tts.setDefaultLanguage(options.language);
      }

      // 음성 재생
      await Tts.speak(text);
      return true;
    } catch (error) {
      console.error('Failed to speak text:', error);
      this.setStatus('error');
      return false;
    }
  }

  /**
   * 현재 재생 중인 음성 일시정지 (react-native-tts에서 지원하지 않음)
   */
  async pause(): Promise<boolean> {
    try {
      // react-native-tts에서는 pause 기능을 지원하지 않으므로 stop으로 대체
      await Tts.stop();
      return true;
    } catch (error) {
      console.error('Failed to pause TTS:', error);
      return false;
    }
  }

  /**
   * 일시정지된 음성 재개 (react-native-tts에서 지원하지 않음)
   */
  async resume(): Promise<boolean> {
    try {
      // react-native-tts에서는 resume 기능을 지원하지 않음
      console.warn('Resume functionality not supported in react-native-tts');
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
    Tts.removeAllListeners('tts-start');
    Tts.removeAllListeners('tts-finish');
    Tts.removeAllListeners('tts-cancel');
    Tts.removeAllListeners('tts-pause');
    Tts.removeAllListeners('tts-resume');
    Tts.removeAllListeners('tts-progress');
    Tts.removeAllListeners('tts-error');
    
    this.listeners = {};
    this.isInitialized = false;
  }
}

// 싱글톤 인스턴스
export const textToSpeechService = new TextToSpeechService();

export default textToSpeechService;
