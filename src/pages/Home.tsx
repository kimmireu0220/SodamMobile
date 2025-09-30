/**
 * Home Page (React Native)
 * 
 * 역할: 앱의 메인 대시보드로 주요 기능들에 대한 접근을 제공합니다.
 * 
 * 입력:
 * - onNavigate: 네비게이션 클릭 시 호출되는 콜백 함수
 * 
 * 출력:
 * - 헤더 (로고 + 햄버거 메뉴)
 * - 3개의 주요 기능 카드
 * - 하단 네비게이션
 * 
 * 향후 연동 지점:
 * - 사용자 맞춤 기능 추천
 * - 최근 사용 기능 표시
 * - 알림 및 업데이트 표시
 */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import AppLayout from '../components/AppLayout';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

interface HomeProps {
  onNavigate?: (path: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleMenuClick = () => {
    if (onNavigate) {
      onNavigate('/about');
    } else {
      // React Navigation 사용
      navigation.navigate('Main');
    }
  };

  const handleLogoClick = () => {
    // 홈 화면에서 로고 클릭 시 스크롤을 맨 위로 이동하거나 새로고침
    // 이미 홈이므로 추가 동작 없음
  };

  const handleCardClick = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      // React Navigation 사용 - 탭 네비게이션으로 이동
      if (path === '/translate') {
        navigation.navigate('Main', { screen: 'Translate' });
      } else if (path === '/speak') {
        navigation.navigate('Main', { screen: 'Speak' }); // Speak 탭으로 이동
      } else if (path === '/mypage') {
        navigation.navigate('Main', { screen: 'MyPage' });
      }
    }
  };

  const cards = [
    {
      title: '수화 변환',
      subtitle: '대화 듣기',
      description: '음성을 실시간으로 수화로 변환합니다',
      icon: require('../assets/sign-language-icon.png'),
      path: '/translate',
      color: '#2E7D32'
    },
    {
      title: '텍스트로 말하기',
      subtitle: '직접 입력 + 상용구',
      description: '직접 입력 또는 상용구를 선택하여 음성으로 전달합니다',
      icon: require('../assets/translate-icon.png'),
      path: '/speak',
      color: '#FF9800'
    },
    {
      title: '마이 페이지',
      subtitle: '사용 통계 + 개인 상용구',
      description: '사용 패턴을 확인하고 개인 상용구를 관리합니다',
      icon: require('../assets/profile-icon.png'),
      path: '/mypage',
      color: '#2E7D32'
    }
  ];

  return (
    <AppLayout onMenuClick={handleMenuClick} onLogoClick={handleLogoClick}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* 환영 메시지 */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>
            반가워요!
          </Text>
          <Text style={styles.welcomeSubtitle}>
            언제 어디서나 실시간 수화 통역을 시작하세요.
          </Text>
        </View>

        {/* 곰 캐릭터 */}
        <View style={styles.characterSection}>
          <Image
            source={require('../assets/bear-new.png')}
            style={styles.characterImage}
            resizeMode="contain"
          />
        </View>

        {/* 기능 카드들 */}
        <View style={styles.cardsContainer}>
          {cards.map((card, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleCardClick(card.path)}
              style={[
                styles.card,
                { borderColor: card.color }
              ]}
              accessibilityLabel={`${card.title} 기능으로 이동`}
              accessibilityRole="button"
            >
              <View style={styles.cardHeader}>
                <Image 
                  source={card.icon} 
                  style={styles.cardIcon}
                  resizeMode="contain"
                />
                <View style={styles.cardTitleContainer}>
                  <Text style={styles.cardTitle}>
                    {card.title}
                  </Text>
                  <Text style={styles.cardSubtitle}>
                    {card.subtitle}
                  </Text>
                </View>
              </View>
              
              <Text style={styles.cardDescription}>
                {card.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
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
    fontSize: 28,
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
    marginBottom: 24,
  },
  characterImage: {
    width: 120,
    height: 120,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardsContainer: {
    paddingHorizontal: 24,
    gap: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardIcon: {
    width: 32,
    height: 32,
    marginRight: 16,
  },
  cardTitleContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666666',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
});

export default Home;
