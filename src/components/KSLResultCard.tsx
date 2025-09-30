/**
 * KSL 변환 결과 표시 컴포넌트 (React Native)
 */
import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

interface KSLResult {
  gloss: string;
  confidence?: number;
}

interface KSLResultCardProps {
  original: string;
  kslResult: KSLResult | null;
}

const KSLResultCard: React.FC<KSLResultCardProps> = ({ original, kslResult }) => {
  if (!kslResult) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        🤟 KSL 변환 결과
      </Text>

      {/* 가로 배치 컨테이너 */}
      <View style={styles.contentContainer}>
        {/* 한국어 원본 - 왼쪽 */}
        <View style={styles.originalContainer}>
          <Text style={styles.sectionTitle}>
            🇰🇷 한국어
          </Text>
          <Text style={styles.originalText}>
            "{original}"
          </Text>
        </View>

        {/* KSL 글로스 - 오른쪽 */}
        <View style={styles.kslContainer}>
          <Text style={styles.kslSectionTitle}>
            🤟 KSL 글로스
          </Text>
          <Text style={styles.kslText}>
            "{kslResult.gloss}"
          </Text>
        </View>
      </View>

      {/* 신뢰도 - 하단 */}
      {kslResult.confidence !== undefined && (
        <View style={styles.confidenceContainer}>
          <View style={styles.confidenceBox}>
            <Text style={styles.confidenceText}>
              변환 신뢰도: {Math.round(kslResult.confidence * 100)}%
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#2E7D32',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2E7D32',
    marginBottom: 16,
    textAlign: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    gap: 16,
    minHeight: 80,
  },
  originalContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  originalText: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 20,
  },
  kslContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#e8f5e8',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4caf50',
    justifyContent: 'center',
  },
  kslSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2E7D32',
    marginBottom: 8,
  },
  kslText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E7D32',
    lineHeight: 22,
  },
  confidenceContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  confidenceBox: {
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#f0f8ff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#87ceeb',
    alignItems: 'center',
  },
  confidenceText: {
    fontSize: 12,
    color: '#0066cc',
    fontWeight: '500',
  },
});

export default KSLResultCard;
