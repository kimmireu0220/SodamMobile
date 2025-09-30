/**
 * 네비게이션 타입 정의
 */

export type RootStackParamList = {
  Splash: undefined;
  Main: undefined;
  About: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Translate: undefined;
  Speak: undefined;
  MyPage: undefined;
};

export type HomeStackParamList = {
  HomeMain: undefined;
  About: undefined;
};

export type TranslateStackParamList = {
  TranslateMain: undefined;
};

export type MyPageStackParamList = {
  MyPageMain: undefined;
};

// 네비게이션 프로퍼티 타입
export type NavigationProp<T> = {
  navigate: (screen: keyof T, params?: any) => void;
  goBack: () => void;
  reset: (state: any) => void;
};

// 라우트 프로퍼티 타입
export type RouteProp<T, K extends keyof T> = {
  key: string;
  name: K;
  params: T[K];
};

export default {
  RootStackParamList: {} as RootStackParamList,
  MainTabParamList: {} as MainTabParamList,
  HomeStackParamList: {} as HomeStackParamList,
  TranslateStackParamList: {} as TranslateStackParamList,
  MyPageStackParamList: {} as MyPageStackParamList,
};
