/**
 * 음성 합성 훅
 * TextToSpeechService를 React 훅으로 래핑
 */
import { useState, useEffect, useCallback } from 'react';
import textToSpeechService, { TTSOptions, TTSStatus } from '../services/TextToSpeechService';

export interface UseTextToSpeechReturn {
  isPlaying: boolean;
  isPaused: boolean;
  isStopped: boolean;
  error: string | null;
  speak: (text: string, options?: TTSOptions) => Promise<boolean>;
  pause: () => Promise<boolean>;
  resume: () => Promise<boolean>;
  stop: () => Promise<boolean>;
  reset: () => void;
}

export const useTextToSpeech = (): UseTextToSpeechReturn => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isStopped, setIsStopped] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // TTS 시작 처리
  const handleStart = useCallback(() => {
    setIsPlaying(true);
    setIsPaused(false);
    setIsStopped(false);
    setError(null);
  }, []);

  // TTS 완료 처리
  const handleFinish = useCallback(() => {
    setIsPlaying(false);
    setIsPaused(false);
    setIsStopped(true);
  }, []);

  // TTS 일시정지 처리
  const handlePause = useCallback(() => {
    setIsPlaying(false);
    setIsPaused(true);
    setIsStopped(false);
  }, []);

  // TTS 재개 처리
  const handleResume = useCallback(() => {
    setIsPlaying(true);
    setIsPaused(false);
    setIsStopped(false);
  }, []);

  // TTS 중지 처리
  const handleStop = useCallback(() => {
    setIsPlaying(false);
    setIsPaused(false);
    setIsStopped(true);
  }, []);

  // TTS 에러 처리
  const handleError = useCallback((errorMessage: string) => {
    setError(errorMessage);
    setIsPlaying(false);
    setIsPaused(false);
    setIsStopped(false);
  }, []);

  // 상태 변경 처리
  const handleStatusChange = useCallback((status: TTSStatus) => {
    switch (status) {
      case 'idle':
        setIsPlaying(false);
        setIsPaused(false);
        setIsStopped(true);
        break;
      case 'playing':
        setIsPlaying(true);
        setIsPaused(false);
        setIsStopped(false);
        break;
      case 'paused':
        setIsPlaying(false);
        setIsPaused(true);
        setIsStopped(false);
        break;
      case 'stopped':
        setIsPlaying(false);
        setIsPaused(false);
        setIsStopped(true);
        break;
      case 'error':
        setIsPlaying(false);
        setIsPaused(false);
        setIsStopped(false);
        break;
    }
  }, []);

  // 서비스 리스너 설정
  useEffect(() => {
    textToSpeechService.setListeners({
      onStart: handleStart,
      onFinish: handleFinish,
      onPause: handlePause,
      onResume: handleResume,
      onStop: handleStop,
      onError: handleError,
      onStatusChange: handleStatusChange,
    });

    return () => {
      textToSpeechService.setListeners({});
    };
  }, [handleStart, handleFinish, handlePause, handleResume, handleStop, handleError, handleStatusChange]);

  // 텍스트를 음성으로 변환하여 재생
  const speak = useCallback(async (text: string, options?: TTSOptions): Promise<boolean> => {
    setError(null);
    const success = await textToSpeechService.speak(text, options);
    return success;
  }, []);

  // 현재 재생 중인 음성 일시정지
  const pause = useCallback(async (): Promise<boolean> => {
    const success = await textToSpeechService.pause();
    return success;
  }, []);

  // 일시정지된 음성 재개
  const resume = useCallback(async (): Promise<boolean> => {
    const success = await textToSpeechService.resume();
    return success;
  }, []);

  // 현재 재생 중인 음성 중지
  const stop = useCallback(async (): Promise<boolean> => {
    const success = await textToSpeechService.stop();
    return success;
  }, []);

  // 상태 초기화
  const reset = useCallback(() => {
    setIsPlaying(false);
    setIsPaused(false);
    setIsStopped(false);
    setError(null);
  }, []);

  return {
    isPlaying,
    isPaused,
    isStopped,
    error,
    speak,
    pause,
    resume,
    stop,
    reset,
  };
};

export default useTextToSpeech;
