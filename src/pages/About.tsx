/**
 * About Page (React Native)
 * 
 * 역할: 앱 정보와 고지사항을 표시합니다.
 * 
 * 입력:
 * - onNavigate: 네비게이션 클릭 시 호출되는 콜백 함수
 * 
 * 출력:
 * - 앱 정보
 * - 고지사항
 * - 뒤로 가기 버튼
 * 
 * 향후 연동 지점:
 * - 버전 정보 동적 표시
 * - 개인정보처리방침 링크
 * - 이용약관 링크
 */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Linking
} from 'react-native';

interface AboutProps {
  onNavigate?: (path: string) => void;
}

const About: React.FC<AboutProps> = ({ onNavigate }) => {
  const handleBackClick = () => {
    if (onNavigate) onNavigate('/home');
  };

  const handlePrivacyPolicy = () => {
    // TODO: 개인정보처리방침 링크 열기
    Linking.openURL('https://example.com/privacy');
  };

  const handleTermsOfService = () => {
    // TODO: 이용약관 링크 열기
    Linking.openURL('https://example.com/terms');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* 헤더 */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={handleBackClick}
            style={styles.backButton}
            accessibilityLabel="뒤로 가기"
            accessibilityRole="button"
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>앱 정보</Text>
        </View>

        {/* 앱 로고 및 정보 */}
        <View style={styles.appInfoSection}>
          <Text style={styles.logoText}>소담</Text>
          <Text style={styles.appDescription}>
            손으로 전하는 소중한 이야기
          </Text>
          <Text style={styles.versionText}>
            버전 1.0.0
          </Text>
        </View>

        {/* 앱 설명 */}
        <View style={styles.descriptionSection}>
          <Text style={styles.sectionTitle}>앱 소개</Text>
          <Text style={styles.descriptionText}>
            소담은 청각 장애인과의 소통을 돕는 수화 통역 서비스입니다.{'\n\n'}
            음성과 텍스트를 실시간으로 수화로 변환하여,{'\n'}
            더 나은 소통의 다리를 만들어갑니다.
          </Text>
        </View>

        {/* 주요 기능 */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>주요 기능</Text>
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🤟</Text>
              <Text style={styles.featureText}>실시간 수화 변환</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>✏️</Text>
              <Text style={styles.featureText}>텍스트 입력 및 상용구</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>📊</Text>
              <Text style={styles.featureText}>사용 통계 및 분석</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>📝</Text>
              <Text style={styles.featureText}>개인 상용구 관리</Text>
            </View>
          </View>
        </View>

        {/* 고지사항 */}
        <View style={styles.disclaimerSection}>
          <Text style={styles.sectionTitle}>고지사항</Text>
          <Text style={styles.disclaimerText}>
            • 본 앱은 수화 통역 서비스의 사용자 경험을 시연하기 위한 프로토타입입니다.{'\n\n'}
            • 실제 수화 통역 서비스와는 차이가 있을 수 있습니다.{'\n\n'}
            • 개인정보는 로컬에만 저장되며 외부로 전송되지 않습니다.{'\n\n'}
            • 지속적인 개선을 위해 피드백을 환영합니다.
          </Text>
        </View>

        {/* 링크 섹션 */}
        <View style={styles.linksSection}>
          <TouchableOpacity
            onPress={handlePrivacyPolicy}
            style={styles.linkButton}
            accessibilityLabel="개인정보처리방침 보기"
            accessibilityRole="button"
          >
            <Text style={styles.linkButtonText}>개인정보처리방침</Text>
            <Text style={styles.linkArrow}>→</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={handleTermsOfService}
            style={styles.linkButton}
            accessibilityLabel="이용약관 보기"
            accessibilityRole="button"
          >
            <Text style={styles.linkButtonText}>이용약관</Text>
            <Text style={styles.linkArrow}>→</Text>
          </TouchableOpacity>
        </View>

        {/* 푸터 */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2024 Sodam. All rights reserved.
          </Text>
        </View>
      </ScrollView>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  backButtonText: {
    fontSize: 20,
    color: '#333333',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  appInfoSection: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: '#ffffff',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 8,
  },
  appDescription: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 8,
    textAlign: 'center',
  },
  versionText: {
    fontSize: 14,
    color: '#999999',
  },
  descriptionSection: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  featuresSection: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginBottom: 16,
  },
  featureList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  featureIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  featureText: {
    fontSize: 14,
    color: '#333333',
    flex: 1,
  },
  disclaimerSection: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginBottom: 16,
  },
  disclaimerText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  linksSection: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginBottom: 16,
  },
  linkButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  linkButtonText: {
    fontSize: 16,
    color: '#2E7D32',
  },
  linkArrow: {
    fontSize: 16,
    color: '#2E7D32',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#999999',
  },
});

export default About;
