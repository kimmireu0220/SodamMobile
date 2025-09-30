/**
 * QuickPhrases Component (React Native)
 * 
 * 역할: 자주 사용하는 문구들을 칩 형태로 제공하여 빠른 입력을 가능하게 합니다.
 * 
 * 입력:
 * - phrases: 표시할 문구 배열
 * - onPhraseClick: 문구 클릭 시 호출되는 콜백 함수
 * 
 * 출력:
 * - 칩 형태의 문구 버튼들
 * - 클릭 시 입력창에 삽입
 * 
 * 향후 연동 지점:
 * - 사용자별 맞춤 문구 저장
 * - 문맥에 따른 동적 문구 추천
 */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

interface QuickPhrasesProps {
  phrases: string[];
  onPhraseClick: (phrase: string) => void;
}

const QuickPhrases: React.FC<QuickPhrasesProps> = ({ phrases, onPhraseClick }) => {
  const colors = [
    '#E8F5E8', '#FFF3E0', '#E3F2FD', '#F3E5F5', 
    '#FFEBEE', '#F1F8E9', '#E0F2F1', '#FFF8E1',
    '#FCE4EC', '#E8EAF6', '#E0F7FA', '#F9FBE7'
  ];

  // 2개씩 묶어서 행으로 만들기
  const rows: string[][] = [];
  for (let i = 0; i < phrases.length; i += 2) {
    rows.push(phrases.slice(i, i + 2));
  }

  return (
    <View style={styles.container}>
      {rows.map((row, rowIndex) => (
        <View key={`row-${rowIndex}`} style={styles.row}>
          {row.map((phrase, colIndex) => {
            const index = rowIndex * 2 + colIndex;
            return (
              <TouchableOpacity
                key={`${phrase}-${index}`}
                onPress={() => onPhraseClick(phrase)}
                style={[
                  styles.phraseButton,
                  { backgroundColor: colors[index % colors.length] }
                ]}
                accessibilityLabel={`${phrase} 선택`}
                accessibilityRole="button"
              >
                <Text style={styles.phraseText}>
                  {phrase}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  phraseButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  phraseText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default QuickPhrases;
