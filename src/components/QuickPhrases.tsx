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
  StyleSheet,
  ScrollView,
  FlatList
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

  const renderPhrase = ({ item, index }: { item: string; index: number }) => (
    <TouchableOpacity
      key={index}
      onPress={() => onPhraseClick(item)}
      style={[
        styles.phraseButton,
        { backgroundColor: colors[index % colors.length] }
      ]}
      accessibilityLabel={`${item} 선택`}
      accessibilityRole="button"
    >
      <Text style={styles.phraseText}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={phrases}
        renderItem={renderPhrase}
        keyExtractor={(item, index) => `${item}-${index}`}
        numColumns={2}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
      />
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
    maxHeight: 300,
  },
  grid: {
    gap: 8,
  },
  phraseButton: {
    flex: 1,
    margin: 4,
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
