/**
 * 메인 앱 네비게이션 컴포넌트
 */
import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// 페이지 컴포넌트들
import Splash from '../pages/Splash';
import Home from '../pages/Home';
import Translate from '../pages/Translate';
import Speak from '../pages/Speak';
import MyPage from '../pages/MyPage';

// 타입 정의
import { RootStackParamList, MainTabParamList } from '../types/navigation';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

// 탭 아이콘 컴포넌트들
const HomeIcon = ({ color, size }: { color: string; size: number }) => (
  <Image 
    source={require('../assets/home-icon.png')} 
    style={{ width: size, height: size, tintColor: color }}
  />
);

const TranslateIcon = ({ color, size }: { color: string; size: number }) => (
  <Image 
    source={require('../assets/sign-language-icon.png')} 
    style={{ width: size, height: size, tintColor: color }}
  />
);

const SpeakIcon = ({ color, size }: { color: string; size: number }) => (
  <Image 
    source={require('../assets/translate-icon.png')} 
    style={{ width: size, height: size, tintColor: color }}
  />
);

const MyPageIcon = ({ color, size }: { color: string; size: number }) => (
  <Image 
    source={require('../assets/profile-icon.png')} 
    style={{ width: size, height: size, tintColor: color }}
  />
);

// 메인 탭 네비게이션
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#E0E0E0',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarActiveTintColor: '#2E7D32',
        tabBarInactiveTintColor: '#666666',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: '홈',
          tabBarIcon: HomeIcon,
        }}
      />
      <Tab.Screen
        name="Translate"
        component={Translate}
        options={{
          tabBarLabel: '수화 변환',
          tabBarIcon: TranslateIcon,
        }}
      />
      <Tab.Screen
        name="Speak"
        component={Speak}
        options={{
          tabBarLabel: '텍스트로 말하기',
          tabBarIcon: SpeakIcon,
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPage}
        options={{
          tabBarLabel: '마이페이지',
          tabBarIcon: MyPageIcon,
        }}
      />
    </Tab.Navigator>
  );
};

// 메인 스택 네비게이션
const RootStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        cardStyleInterpolator: ({ current, layouts }) => {
          return {
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0],
                  }),
                },
              ],
            },
          };
        },
      }}
    >
      <Stack.Screen 
        name="Splash" 
        component={Splash}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="Main" 
        component={MainTabNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

// 메인 앱 네비게이션 컨테이너
const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <RootStackNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
