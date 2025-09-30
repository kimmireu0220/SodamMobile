/**
 * AppLayout Component (React Native)
 * 
 * 역할: 모든 페이지에서 공통으로 사용되는 레이아웃을 제공합니다.
 * - 공통 Header (로고 + 메뉴)
 * - 페이지 컨텐츠 영역
 * 
 * 입력:
 * - children: 페이지 컨텐츠
 * - onMenuClick: 햄버거 메뉴 클릭 시 호출되는 콜백 함수
 * - onLogoClick: 로고 클릭 시 호출되는 콜백 함수
 * 
 * 출력:
 * - 공통 Header
 * - 페이지 컨텐츠
 */
import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from './Header';

interface AppLayoutProps {
  children: React.ReactNode;
  onMenuClick?: () => void;
  onLogoClick?: () => void;
}

const AppLayout: React.FC<AppLayoutProps> = ({ 
  children, 
  onMenuClick, 
  onLogoClick 
}) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* 공통 Header */}
      <Header 
        onMenuClick={onMenuClick}
        onLogoClick={onLogoClick}
      />
      
      {/* 페이지 컨텐츠 */}
      <View style={styles.content}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  content: {
    flex: 1,
  },
});

export default AppLayout;
