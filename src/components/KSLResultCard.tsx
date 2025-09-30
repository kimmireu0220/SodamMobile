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
      {/* 간단한 변환 결과 표시 */}
      <View style={styles.resultRow}>
        <Text style={styles.originalText}>
          "{original}"
        </Text>
        <Text style={styles.arrow}>→</Text>
        <Text style={styles.kslText}>
          "{kslResult.gloss}"
        </Text>
      </View>

      {/* 신뢰도 - 작게 표시 */}
      {kslResult.confidence !== undefined && (
        <Text style={styles.confidenceText}>
          신뢰도: {Math.round(kslResult.confidence * 100)}%
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2E7D32',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 8,
  },
  originalText: {
    fontSize: 16,
    color: '#666666',
    flex: 1,
    textAlign: 'center',
  },
  arrow: {
    fontSize: 20,
    color: '#2E7D32',
    fontWeight: 'bold',
  },
  kslText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2E7D32',
    flex: 1,
    textAlign: 'center',
  },
  confidenceText: {
    fontSize: 12,
    color: '#888888',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default KSLResultCard;

