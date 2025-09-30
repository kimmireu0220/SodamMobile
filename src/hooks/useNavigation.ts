/**
 * 네비게이션 훅
 * React Navigation과 호환되는 네비게이션 훅
 */
import { useNavigation as useRNNavigation } from '@react-navigation/native';
import { useCallback } from 'react';

export const useAppNavigation = () => {
  const navigation = useRNNavigation();

  const navigate = useCallback((path: string) => {
    // 경로에 따라 적절한 네비게이션 메서드 호출
    switch (path) {
      case '/home':
        navigation.navigate('Main', { screen: 'Home' });
        break;
      case '/translate':
        navigation.navigate('Main', { screen: 'Translate' });
        break;
      case '/mypage':
        navigation.navigate('Main', { screen: 'MyPage' });
        break;
      case '/about':
        // About은 별도 스택으로 처리
        navigation.navigate('About');
        break;
      case '/splash':
        navigation.navigate('Splash');
        break;
      default:
        console.warn(`Unknown path: ${path}`);
    }
  }, [navigation]);

  const goBack = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }, [navigation]);

  const reset = useCallback((path: string) => {
    navigation.reset({
      index: 0,
      routes: [{ name: path as any }],
    });
  }, [navigation]);

  return {
    navigate,
    goBack,
    reset,
    currentPath: navigation.getState()?.routes[navigation.getState()?.index || 0]?.name || '/splash',
  };
};

export default useAppNavigation;
