/**
 * Sodam React Native App
 * 
 * 수화 통역 서비스 프로토타입 앱
 * 
 * @format
 */

import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar 
        barStyle={isDarkMode ? 'light-content' : 'dark-content'} 
        backgroundColor="#ffffff"
      />
      <AppNavigator />
    </SafeAreaProvider>
  );
}

export default App;
