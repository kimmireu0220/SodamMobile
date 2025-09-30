/**
 * MyPage - Sodam 마이페이지 (React Native)
 * 
 * ## 기능 요약
 * 사용자 개인화 대시보드로 다음 기능을 제공:
 * 1. **사용 통계 대시보드**: 수화 변환/텍스트 입력 횟수, 자주 사용하는 문구, 최근 7일 사용 패턴
 * 2. **개인 상용구 관리**: CRUD 기능, 즐겨찾기, 카테고리 필터링, 정렬
 * 
 * 역할: 사용자의 앱 사용 패턴 분석 및 개인 상용구 관리 인터페이스
 * 
 * 입력:
 * - onNavigate: 네비게이션 콜백 함수
 * 
 * 출력:
 * - 환영 메시지 및 곰 캐릭터
 * - 사용 통계 시각화 (4개 카드 + 막대 차트)
 * - 개인 상용구 관리 인터페이스
 * 
 * 상호작용:
 * - 통계 차트의 인터랙티브 요소
 * - 상용구 추가/수정/삭제/정렬/필터링
 * 
 * 접근성:
 * - 키보드로 모든 기능 사용 가능
 * - 스크린 리더 지원 (accessibility 속성)
 * - 적절한 색상 대비 및 포커스 스타일
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import StatisticsSection from '../components/StatisticsSection';
import CustomPhrasesSection from '../components/CustomPhrasesSection';

interface MyPageProps {
  onNavigate?: (path: string) => void;
}

const MyPage: React.FC<MyPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'stats' | 'phrases'>('stats');

  const handleMenuClick = () => {
    if (onNavigate) onNavigate('/about');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <Header onMenuClick={handleMenuClick} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* 환영 메시지 */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>
            안녕하세요! 👋
          </Text>
          <Text style={styles.welcomeSubtitle}>
            사용 통계와 개인 상용구를 관리해보세요
          </Text>
        </View>

        {/* 곰 캐릭터 */}
        <View style={styles.characterSection}>
          <Text style={styles.characterEmoji}>
            🐻
          </Text>
        </View>

        {/* 탭 네비게이션 */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'stats' && styles.tabButtonActive
            ]}
            onPress={() => setActiveTab('stats')}
            accessibilityLabel="사용 통계 탭"
            accessibilityRole="button"
          >
            <Text style={[
              styles.tabButtonText,
              activeTab === 'stats' && styles.tabButtonTextActive
            ]}>
              📊 사용 통계
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'phrases' && styles.tabButtonActive
            ]}
            onPress={() => setActiveTab('phrases')}
            accessibilityLabel="개인 상용구 탭"
            accessibilityRole="button"
          >
            <Text style={[
              styles.tabButtonText,
              activeTab === 'phrases' && styles.tabButtonTextActive
            ]}>
              📝 개인 상용구
            </Text>
          </TouchableOpacity>
        </View>

        {/* 탭 콘텐츠 */}
        {activeTab === 'stats' ? (
          <StatisticsSection />
        ) : (
          <CustomPhrasesSection />
        )}
      </ScrollView>

      {/* 하단 네비게이션 */}
      <BottomNav currentPath="/mypage" onNavigate={onNavigate || (() => {})} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    paddingBottom: 80, // 하단 네비게이션 공간
  },
  welcomeSection: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2E7D32',
    marginBottom: 8,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
  },
  characterSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  characterEmoji: {
    fontSize: 80,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    margin: 16,
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  tabButtonActive: {
    backgroundColor: '#2E7D32',
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
  tabButtonTextActive: {
    color: '#ffffff',
  },
});

export default MyPage;
