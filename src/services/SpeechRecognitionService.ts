/**
 * 음성 인식(STT) 서비스
 * React Native Voice를 사용한 음성 인식 기능
 */
import Voice, { SpeechResultsEvent, SpeechErrorEvent } from '@react-native-community/voice';

export interface SpeechRecognitionResult {
  transcript: string;
  confidence: number;
  isFinal: boolean;
}

export interface SpeechRecognitionError {
  error: {
    message: string;
    code: string;
  };
}

export type SpeechRecognitionState = 'idle' | 'listening' | 'processing' | 'error';

class SpeechRecognitionService {
  private listeners: {
    onResult?: (result: SpeechRecognitionResult) => void;
    onError?: (error: SpeechRecognitionError) => void;
    onStateChange?: (state: SpeechRecognitionState) => void;
  } = {};

  private currentState: SpeechRecognitionState = 'idle';
  private isInitialized = false;

  constructor() {
    this.initialize();
  }

  private async initialize() {
    try {
      // Voice 이벤트 리스너 설정
      Voice.onSpeechStart = this.onSpeechStart.bind(this);
      Voice.onSpeechEnd = this.onSpeechEnd.bind(this);
      Voice.onSpeechResults = this.onSpeechResults.bind(this);
      Voice.onSpeechError = this.onSpeechError.bind(this);
      Voice.onSpeechPartialResults = this.onSpeechPartialResults.bind(this);
      
      this.isInitialized = true;
      console.log('Speech Recognition Service initialized');
    } catch (error) {
      console.error('Failed to initialize Speech Recognition Service:', error);
    }
  }

  private onSpeechStart = () => {
    console.log('Speech recognition started');
    this.setState('listening');
  };

  private onSpeechEnd = () => {
    console.log('Speech recognition ended');
    this.setState('processing');
  };

  private onSpeechResults = (e: SpeechResultsEvent) => {
    const results = e.value || [];
    if (results.length > 0) {
      const result: SpeechRecognitionResult = {
        transcript: results[0],
        confidence: 0.8, // 기본 신뢰도 (실제로는 API에서 제공)
        isFinal: true,
      };
      
      console.log('Speech recognition result:', result);
      this.listeners.onResult?.(result);
    }
    this.setState('idle');
  };

  private onSpeechPartialResults = (e: SpeechResultsEvent) => {
    const results = e.value || [];
    if (results.length > 0) {
      const result: SpeechRecognitionResult = {
        transcript: results[0],
        confidence: 0.6, // 부분 결과는 낮은 신뢰도
        isFinal: false,
      };
      
      console.log('Speech recognition partial result:', result);
      this.listeners.onResult?.(result);
    }
  };

  private onSpeechError = (e: SpeechErrorEvent) => {
    const error: SpeechRecognitionError = {
      error: {
        message: e.error?.message || 'Unknown error',
        code: e.error?.code || 'UNKNOWN',
      },
    };
    
    console.error('Speech recognition error:', error);
    this.listeners.onError?.(error);
    this.setState('error');
  };

  private setState(state: SpeechRecognitionState) {
    this.currentState = state;
    this.listeners.onStateChange?.(state);
  }

  /**
   * 음성 인식 시작
   */
  async startListening(): Promise<boolean> {
    if (!this.isInitialized) {
      console.error('Speech Recognition Service not initialized');
      return false;
    }

    try {
      await Voice.start('ko-KR'); // 한국어 설정
      return true;
    } catch (error) {
      console.error('Failed to start speech recognition:', error);
      this.setState('error');
      return false;
    }
  }

  /**
   * 음성 인식 중지
   */
  async stopListening(): Promise<boolean> {
    try {
      await Voice.stop();
      return true;
    } catch (error) {
      console.error('Failed to stop speech recognition:', error);
      return false;
    }
  }

  /**
   * 음성 인식 취소
   */
  async cancelListening(): Promise<boolean> {
    try {
      await Voice.cancel();
      this.setState('idle');
      return true;
    } catch (error) {
      console.error('Failed to cancel speech recognition:', error);
      return false;
    }
  }

  /**
   * 음성 인식 가능 여부 확인
   */
  async isAvailable(): Promise<boolean> {
    try {
      const isAvailable = await Voice.isAvailable();
      return isAvailable;
    } catch (error) {
      console.error('Failed to check speech recognition availability:', error);
      return false;
    }
  }

  /**
   * 현재 상태 반환
   */
  getState(): SpeechRecognitionState {
    return this.currentState;
  }

  /**
   * 이벤트 리스너 설정
   */
  setListeners(listeners: {
    onResult?: (result: SpeechRecognitionResult) => void;
    onError?: (error: SpeechRecognitionError) => void;
    onStateChange?: (state: SpeechRecognitionState) => void;
  }) {
    this.listeners = { ...this.listeners, ...listeners };
  }

  /**
   * 리소스 정리
   */
  destroy() {
    Voice.destroy();
    this.listeners = {};
    this.isInitialized = false;
  }
}

// 싱글톤 인스턴스
export const speechRecognitionService = new SpeechRecognitionService();

export default speechRecognitionService;
