/**
 * 통계 계산 서비스
 * 사용자 데이터를 기반으로 통계를 계산하고 분석
 */
import { UserStatistics, DailyUsage, TopPhrase } from '../types/data';

export interface StatisticsSummary {
  totalTranslations: number;
  totalTextInputs: number;
  totalTimeSpent: number; // 초 단위
  averageSessionTime: number; // 초 단위
  averageDailyUsage: {
    translations: number;
    textInputs: number;
    timeSpent: number;
  };
  weeklyUsage: DailyUsage[];
  monthlyUsage: DailyUsage[];
  topPhrases: TopPhrase[];
  usageTrend: 'increasing' | 'decreasing' | 'stable';
  streak: number; // 연속 사용 일수
}

export interface UsagePattern {
  peakHours: number[]; // 가장 많이 사용한 시간대
  peakDays: string[]; // 가장 많이 사용한 요일
  averageSessionLength: number; // 평균 세션 길이
  mostUsedCategory: string;
  productivityScore: number; // 0-100
}

class StatisticsService {
  /**
   * 통계 요약 생성
   */
  calculateSummary(
    userStats: UserStatistics,
    dailyUsage: DailyUsage[],
    topPhrases: TopPhrase[]
  ): StatisticsSummary {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // 주간 사용량
    const weeklyUsage = dailyUsage.filter(usage => {
      const usageDate = new Date(usage.date);
      return usageDate >= oneWeekAgo;
    });

    // 월간 사용량
    const monthlyUsage = dailyUsage.filter(usage => {
      const usageDate = new Date(usage.date);
      return usageDate >= oneMonthAgo;
    });

    // 평균 일일 사용량
    const averageDailyUsage = this.calculateAverageDailyUsage(dailyUsage);

    // 사용량 트렌드
    const usageTrend = this.calculateUsageTrend(dailyUsage);

    // 연속 사용 일수
    const streak = this.calculateStreak(dailyUsage);

    return {
      totalTranslations: userStats.totalTranslations,
      totalTextInputs: userStats.totalTextInputs,
      totalTimeSpent: userStats.totalTimeSpent,
      averageSessionTime: userStats.averageSessionTime,
      averageDailyUsage,
      weeklyUsage,
      monthlyUsage,
      topPhrases: topPhrases.slice(0, 10), // 상위 10개만
      usageTrend,
      streak,
    };
  }

  /**
   * 평균 일일 사용량 계산
   */
  private calculateAverageDailyUsage(dailyUsage: DailyUsage[]): {
    translations: number;
    textInputs: number;
    timeSpent: number;
  } {
    if (dailyUsage.length === 0) {
      return { translations: 0, textInputs: 0, timeSpent: 0 };
    }

    const totalTranslations = dailyUsage.reduce((sum, usage) => sum + usage.translations, 0);
    const totalTextInputs = dailyUsage.reduce((sum, usage) => sum + usage.textInputs, 0);
    const totalTimeSpent = dailyUsage.reduce((sum, usage) => sum + usage.timeSpent, 0);

    return {
      translations: Math.round(totalTranslations / dailyUsage.length),
      textInputs: Math.round(totalTextInputs / dailyUsage.length),
      timeSpent: Math.round(totalTimeSpent / dailyUsage.length),
    };
  }

  /**
   * 사용량 트렌드 계산
   */
  private calculateUsageTrend(dailyUsage: DailyUsage[]): 'increasing' | 'decreasing' | 'stable' {
    if (dailyUsage.length < 7) {
      return 'stable';
    }

    // 최근 7일과 그 이전 7일 비교
    const recent7Days = dailyUsage.slice(-7);
    const previous7Days = dailyUsage.slice(-14, -7);

    if (previous7Days.length === 0) {
      return 'stable';
    }

    const recentTotal = recent7Days.reduce((sum, usage) => 
      sum + usage.translations + usage.textInputs, 0);
    const previousTotal = previous7Days.reduce((sum, usage) => 
      sum + usage.translations + usage.textInputs, 0);

    const changePercent = ((recentTotal - previousTotal) / previousTotal) * 100;

    if (changePercent > 10) return 'increasing';
    if (changePercent < -10) return 'decreasing';
    return 'stable';
  }

  /**
   * 연속 사용 일수 계산
   */
  private calculateStreak(dailyUsage: DailyUsage[]): number {
    if (dailyUsage.length === 0) return 0;

    const sortedUsage = dailyUsage
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < sortedUsage.length; i++) {
      const usageDate = new Date(sortedUsage[i].date);
      usageDate.setHours(0, 0, 0, 0);
      
      const expectedDate = new Date(today);
      expectedDate.setDate(today.getDate() - i);

      if (usageDate.getTime() === expectedDate.getTime()) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  }

  /**
   * 사용 패턴 분석
   */
  analyzeUsagePattern(dailyUsage: DailyUsage[]): UsagePattern {
    // 시간대별 사용량 분석 (현재는 더미 데이터)
    const peakHours = [9, 10, 14, 15, 16]; // 오전 9-10시, 오후 2-4시
    const peakDays = ['월', '화', '수', '목', '금']; // 평일
    const averageSessionLength = 300; // 5분
    const mostUsedCategory = '일상';
    const productivityScore = this.calculateProductivityScore(dailyUsage);

    return {
      peakHours,
      peakDays,
      averageSessionLength,
      mostUsedCategory,
      productivityScore,
    };
  }

  /**
   * 생산성 점수 계산
   */
  private calculateProductivityScore(dailyUsage: DailyUsage[]): number {
    if (dailyUsage.length === 0) return 0;

    const totalUsage = dailyUsage.reduce((sum, usage) => 
      sum + usage.translations + usage.textInputs, 0);
    
    const averageDailyUsage = totalUsage / dailyUsage.length;
    
    // 생산성 점수 (0-100)
    const score = Math.min(100, Math.max(0, averageDailyUsage * 2));
    return Math.round(score);
  }

  /**
   * 목표 달성률 계산
   */
  calculateGoalProgress(
    currentStats: UserStatistics,
    goals: {
      dailyTranslations?: number;
      dailyTextInputs?: number;
      dailyTimeSpent?: number;
    }
  ): {
    translations: number;
    textInputs: number;
    timeSpent: number;
    overall: number;
  } {
    const progress = {
      translations: 0,
      textInputs: 0,
      timeSpent: 0,
      overall: 0,
    };

    if (goals.dailyTranslations) {
      progress.translations = Math.min(100, 
        (currentStats.totalTranslations / goals.dailyTranslations) * 100);
    }

    if (goals.dailyTextInputs) {
      progress.textInputs = Math.min(100, 
        (currentStats.totalTextInputs / goals.dailyTextInputs) * 100);
    }

    if (goals.dailyTimeSpent) {
      progress.timeSpent = Math.min(100, 
        (currentStats.totalTimeSpent / goals.dailyTimeSpent) * 100);
    }

    // 전체 진행률
    const validGoals = Object.values(goals).filter(goal => goal !== undefined);
    if (validGoals.length > 0) {
      progress.overall = (progress.translations + progress.textInputs + progress.timeSpent) / validGoals.length;
    }

    return progress;
  }

  /**
   * 인사이트 생성
   */
  generateInsights(summary: StatisticsSummary): string[] {
    const insights: string[] = [];

    // 사용량 기반 인사이트
    if (summary.totalTranslations > 100) {
      insights.push('수화 변환을 많이 사용하고 계시네요! 👍');
    }

    if (summary.streak > 7) {
      insights.push(`${summary.streak}일 연속으로 사용하고 계세요! 🔥`);
    }

    if (summary.usageTrend === 'increasing') {
      insights.push('최근 사용량이 증가하고 있어요! 📈');
    }

    // 시간 기반 인사이트
    if (summary.averageSessionTime > 600) { // 10분 이상
      insights.push('세션 시간이 길어서 집중도가 높으시네요! 🎯');
    }

    // 문구 기반 인사이트
    if (summary.topPhrases.length > 0) {
      const mostUsed = summary.topPhrases[0];
      insights.push(`"${mostUsed.phrase}"을(를) 가장 많이 사용하셨어요! 💬`);
    }

    return insights;
  }
}

// 싱글톤 인스턴스
export const statisticsService = new StatisticsService();

export default statisticsService;
