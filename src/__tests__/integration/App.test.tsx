/**
 * 앱 통합 테스트
 */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import App from '../../App';

// 네비게이션 모킹
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
    reset: jest.fn(),
  }),
}));

// SafeAreaProvider 모킹
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
  SafeAreaView: ({ children }: { children: React.ReactNode }) => children,
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

// StatusBar 모킹
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  return {
    ...RN,
    StatusBar: {
      ...RN.StatusBar,
      setBarStyle: jest.fn(),
      setBackgroundColor: jest.fn(),
    },
  };
});

describe('App Integration', () => {
  it('renders without crashing', () => {
    render(<App />);
  });

  it('displays splash screen initially', () => {
    render(<App />);
    // 스플래시 스크린이 표시되는지 확인
    expect(screen.getByTestId('splash-screen')).toBeTruthy();
  });

  it('navigates to main tabs after splash', async () => {
    render(<App />);
    
    // 스플래시 후 메인 탭으로 이동하는지 확인
    await waitFor(() => {
      expect(screen.getByTestId('main-tabs')).toBeTruthy();
    }, { timeout: 3000 });
  });

  it('has correct navigation structure', () => {
    render(<App />);
    
    // 네비게이션 구조 확인
    expect(screen.getByTestId('navigation-container')).toBeTruthy();
  });

  it('handles navigation errors gracefully', () => {
    render(<App />);
    
    // 네비게이션 에러 처리 확인
    expect(screen.getByTestId('error-boundary')).toBeTruthy();
  });
});
