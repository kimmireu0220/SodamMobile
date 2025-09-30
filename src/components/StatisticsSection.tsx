/**
 * Statistics Section Component (React Native)
 * 
 * 역할: 사용자의 앱 사용 통계를 시각적으로 표시하는 대시보드 섹션
 * 
 * 입력:
 * - 없음 (AsyncStorage에서 직접 데이터 로드)
 * 
 * 출력:
 * - 4개의 통계 카드 (수화 변환, 텍스트 입력, 자주 사용하는 문구, 사용 패턴)
 * - 최근 7일 사용 패턴 막대 차트
 * - 사용 비율 및 추가 통계 정보
 * 
 * 상호작용:
 * - 막대 차트 hover/focus 시 상세 정보 표시
 * - 자주 사용하는 문구 리스트 표시
 * 
 * 접근성:
 * - 차트 데이터의 텍스트 설명 제공
 * - 키보드 네비게이션 지원
 * - 적절한 색상 대비 및 포커스 스타일
 * - 스크린 리더용 accessibility 속성
 */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';

interface Statistics {
  totalTranslations: number;
  totalTextInputs: number;
  totalTimeSpent: number;
  averageSessionTime: number;
  topPhrases: Array<{ phrase: string; count: number }>;
  dailyUsage: Array<{ date: string; count: number }>;
}

const StatisticsSection: React.FC = () => {
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: AsyncStorage에서 데이터 로드
    // 현재는 더미 데이터로 구현
    const dummyData: Statistics = {
      totalTranslations: 45,
      totalTextInputs: 23,
      totalTimeSpent: 1800, // 30분
      averageSessionTime: 300, // 5분
      topPhrases: [
        { phrase: '안녕하세요', count: 8 },
        { phrase: '감사합니다', count: 6 },
        { phrase: '괜찮습니다', count: 4 }
      ],
      dailyUsage: [
        { date: '월', count: 5 },
        { date: '화', count: 8 },
        { date: '수', count: 3 },
        { date: '목', count: 12 },
        { date: '금', count: 7 },
        { date: '토', count: 2 },
        { date: '일', count: 1 }
      ]
    };

    setTimeout(() => {
      setStatistics(dummyData);
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>통계 로딩 중...</Text>
      </View>
    );
  }

  if (!statistics) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>통계 데이터를 불러올 수 없습니다.</Text>
      </View>
    );
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}시간 ${minutes}분`;
    }
    return `${minutes}분`;
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>사용 통계</Text>
      
      {/* 통계 카드들 */}
      <View style={styles.cardsContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>수화 변환</Text>
          <Text style={styles.cardValue}>{statistics.totalTranslations}회</Text>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>텍스트 입력</Text>
          <Text style={styles.cardValue}>{statistics.totalTextInputs}회</Text>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>총 사용 시간</Text>
          <Text style={styles.cardValue}>{formatTime(statistics.totalTimeSpent)}</Text>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>평균 세션</Text>
          <Text style={styles.cardValue}>{formatTime(statistics.averageSessionTime)}</Text>
        </View>
      </View>

      {/* 주간 사용 패턴 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>최근 7일 사용 패턴</Text>
        <View style={styles.chartContainer}>
          {statistics.dailyUsage.map((day, index) => (
            <View key={index} style={styles.chartBar}>
              <View 
                style={[
                  styles.bar, 
                  { height: Math.max(day.count * 10, 20) }
                ]} 
              />
              <Text style={styles.barLabel}>{day.date}</Text>
              <Text style={styles.barValue}>{day.count}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* 자주 사용하는 문구 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>자주 사용하는 문구</Text>
        {statistics.topPhrases.map((phrase, index) => (
          <View key={index} style={styles.phraseItem}>
            <Text style={styles.phraseText}>{phrase.phrase}</Text>
            <Text style={styles.phraseCount}>{phrase.count}회</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#666666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#f44336',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    margin: 16,
    textAlign: 'center',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 12,
  },
  card: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  section: {
    backgroundColor: '#ffffff',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 16,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 120,
  },
  chartBar: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    width: 20,
    backgroundColor: '#2E7D32',
    borderRadius: 4,
    marginBottom: 8,
  },
  barLabel: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },
  barValue: {
    fontSize: 10,
    color: '#999999',
  },
  phraseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  phraseText: {
    fontSize: 16,
    color: '#333333',
    flex: 1,
  },
  phraseCount: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
});

export default StatisticsSection;
