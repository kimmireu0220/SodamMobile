/**
 * 웹뷰 기반 TTS 서비스 (Web Speech API 사용)
 * 
 * 역할: 웹뷰를 통한 Web Speech API 사용
 * Sodam-main과 동일한 방식
 * 
 * 장점:
 * - Sodam-main과 동일한 방식
 * - 웹에서 검증된 안정성
 * - 한국어 지원 우수
 * - 설정 불필요
 */
import { WebView } from 'react-native-webview';

export interface WebTTSOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
  language?: string;
}

class WebTTSService {
  private webViewRef: WebView | null = null;
  private isPlaying = false;

  /**
   * 웹뷰 참조 설정
   */
  setWebViewRef(ref: WebView | null) {
    this.webViewRef = ref;
  }

  /**
   * 텍스트를 음성으로 변환하여 재생
   */
  async speak(text: string, options: WebTTSOptions = {}): Promise<boolean> {
    try {
      if (!this.webViewRef) {
        console.error('WebView not initialized');
        return false;
      }

      this.isPlaying = true;

      // 웹뷰에 TTS 명령 전송
      const ttsScript = `
        (function() {
          if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance('${text}');
            utterance.rate = ${options.rate || 0.8};
            utterance.pitch = ${options.pitch || 1.0};
            utterance.volume = ${options.volume || 1.0};
            utterance.lang = '${options.language || 'ko-KR'}';
            
            utterance.onstart = () => {
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'tts-start'
              }));
            };
            
            utterance.onend = () => {
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'tts-end'
              }));
            };
            
            utterance.onerror = (event) => {
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'tts-error',
                error: event.error
              }));
            };
            
            speechSynthesis.speak(utterance);
          } else {
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'tts-error',
              error: 'Speech synthesis not supported'
            }));
          }
        })();
      `;

      this.webViewRef.injectJavaScript(ttsScript);
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
      if (!this.webViewRef) {
        return false;
      }

      const stopScript = `
        (function() {
          if ('speechSynthesis' in window) {
            speechSynthesis.cancel();
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'tts-stop'
            }));
          }
        })();
      `;

      this.webViewRef.injectJavaScript(stopScript);
      this.isPlaying = false;
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
    return true; // 웹뷰에서는 항상 사용 가능
  }

  /**
   * 현재 재생 상태 확인
   */
  getPlayingState(): boolean {
    return this.isPlaying;
  }
}

// 싱글톤 인스턴스
export const webTTSService = new WebTTSService();

export default webTTSService;

