/**
 * 음성 인식 훅
 * SpeechRecognitionService를 React 훅으로 래핑
 */
import { useState, useEffect, useCallback } from 'react';
import speechRecognitionService, { 
  SpeechRecognitionResult, 
  SpeechRecognitionError, 
  SpeechRecognitionState 
} from '../services/SpeechRecognitionService';

export interface UseSpeechRecognitionReturn {
  transcript: string;
  isListening: boolean;
  isProcessing: boolean;
  error: string | null;
  startListening: () => Promise<boolean>;
  stopListening: () => Promise<boolean>;
  cancelListening: () => Promise<boolean>;
  reset: () => void;
}

export const useSpeechRecognition = (): UseSpeechRecognitionReturn => {
  const [transcript, setTranscript] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 음성 인식 결과 처리
  const handleResult = useCallback((result: SpeechRecognitionResult) => {
    setTranscript(result.transcript);
    if (result.isFinal) {
      setIsProcessing(false);
    }
  }, []);

  // 음성 인식 에러 처리
  const handleError = useCallback((error: SpeechRecognitionError) => {
    setError(error.error.message);
    setIsListening(false);
    setIsProcessing(false);
  }, []);

  // 상태 변경 처리
  const handleStateChange = useCallback((state: SpeechRecognitionState) => {
    switch (state) {
      case 'idle':
        setIsListening(false);
        setIsProcessing(false);
        break;
      case 'listening':
        setIsListening(true);
        setIsProcessing(false);
        setError(null);
        break;
      case 'processing':
        setIsListening(false);
        setIsProcessing(true);
        break;
      case 'error':
        setIsListening(false);
        setIsProcessing(false);
        break;
    }
  }, []);

  // 서비스 리스너 설정
  useEffect(() => {
    speechRecognitionService.setListeners({
      onResult: handleResult,
      onError: handleError,
      onStateChange: handleStateChange,
    });

    return () => {
      speechRecognitionService.setListeners({});
    };
  }, [handleResult, handleError, handleStateChange]);

  // 음성 인식 시작
  const startListening = useCallback(async (): Promise<boolean> => {
    setError(null);
    const success = await speechRecognitionService.startListening();
    return success;
  }, []);

  // 음성 인식 중지
  const stopListening = useCallback(async (): Promise<boolean> => {
    const success = await speechRecognitionService.stopListening();
    return success;
  }, []);

  // 음성 인식 취소
  const cancelListening = useCallback(async (): Promise<boolean> => {
    const success = await speechRecognitionService.cancelListening();
    setTranscript('');
    setError(null);
    return success;
  }, []);

  // 상태 초기화
  const reset = useCallback(() => {
    setTranscript('');
    setError(null);
    setIsListening(false);
    setIsProcessing(false);
  }, []);

  return {
    transcript,
    isListening,
    isProcessing,
    error,
    startListening,
    stopListening,
    cancelListening,
    reset,
  };
};

export default useSpeechRecognition;
