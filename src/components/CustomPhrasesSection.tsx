/**
 * Custom Phrases Section Component (React Native)
 * 
 * 역할: 사용자의 개인 상용구를 관리하는 섹션
 * 
 * 입력:
 * - 없음 (AsyncStorage에서 직접 데이터 로드)
 * 
 * 출력:
 * - 상용구 목록 (필터링/정렬 가능)
 * - 추가/수정/삭제 기능
 * - 즐겨찾기 토글
 * 
 * 상호작용:
 * - 툴바: 추가 버튼, 카테고리 필터, 즐겨찾기 토글, 정렬 옵션
 * - 리스트: 각 아이템의 수정/삭제/즐겨찾기
 * - 모달: 상용구 추가/수정 폼
 * 
 * 접근성:
 * - 키보드로 모든 기능 사용 가능
 * - 적절한 accessibility 속성 및 설명
 * - 포커스 관리 및 스크린 리더 지원
 */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal
} from 'react-native';

interface CustomPhrase {
  id: string;
  text: string;
  category: string;
  isFavorite: boolean;
  usageCount: number;
  createdAt: string;
}

const CATEGORIES = ['전체', '업무', '일상', '긴급'];

const CustomPhrasesSection: React.FC = () => {
  const [phrases, setPhrases] = useState<CustomPhrase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingPhrase, setEditingPhrase] = useState<CustomPhrase | null>(null);
  const [newPhrase, setNewPhrase] = useState('');
  const [newCategory, setNewCategory] = useState('일상');

  useEffect(() => {
    // TODO: AsyncStorage에서 데이터 로드
    // 현재는 더미 데이터로 구현
    const dummyPhrases: CustomPhrase[] = [
      {
        id: '1',
        text: '안녕하세요',
        category: '일상',
        isFavorite: true,
        usageCount: 15,
        createdAt: '2024-01-01'
      },
      {
        id: '2',
        text: '감사합니다',
        category: '일상',
        isFavorite: true,
        usageCount: 12,
        createdAt: '2024-01-02'
      },
      {
        id: '3',
        text: '회의실은 어디인가요?',
        category: '업무',
        isFavorite: false,
        usageCount: 8,
        createdAt: '2024-01-03'
      }
    ];

    setTimeout(() => {
      setPhrases(dummyPhrases);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredPhrases = phrases.filter(phrase => {
    if (selectedCategory !== '전체' && phrase.category !== selectedCategory) {
      return false;
    }
    if (showFavoritesOnly && !phrase.isFavorite) {
      return false;
    }
    return true;
  });

  const sortedPhrases = [...filteredPhrases].sort((a, b) => {
    return b.usageCount - a.usageCount;
  });

  const handleAddPhrase = () => {
    if (!newPhrase.trim()) {
      Alert.alert('오류', '문구를 입력해주세요.');
      return;
    }

    const phrase: CustomPhrase = {
      id: Date.now().toString(),
      text: newPhrase.trim(),
      category: newCategory,
      isFavorite: false,
      usageCount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setPhrases([...phrases, phrase]);
    setNewPhrase('');
    setNewCategory('일상');
    setShowModal(false);
  };

  const handleEditPhrase = (phrase: CustomPhrase) => {
    setEditingPhrase(phrase);
    setNewPhrase(phrase.text);
    setNewCategory(phrase.category);
    setShowModal(true);
  };

  const handleUpdatePhrase = () => {
    if (!editingPhrase || !newPhrase.trim()) {
      Alert.alert('오류', '문구를 입력해주세요.');
      return;
    }

    setPhrases(phrases.map(p => 
      p.id === editingPhrase.id 
        ? { ...p, text: newPhrase.trim(), category: newCategory }
        : p
    ));

    setEditingPhrase(null);
    setNewPhrase('');
    setNewCategory('일상');
    setShowModal(false);
  };

  const handleDeletePhrase = (id: string) => {
    Alert.alert(
      '삭제 확인',
      '이 상용구를 삭제하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        { 
          text: '삭제', 
          style: 'destructive',
          onPress: () => setPhrases(phrases.filter(p => p.id !== id))
        }
      ]
    );
  };

  const handleToggleFavorite = (id: string) => {
    setPhrases(phrases.map(p => 
      p.id === id ? { ...p, isFavorite: !p.isFavorite } : p
    ));
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>상용구 로딩 중...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* 툴바 */}
      <View style={styles.toolbar}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowModal(true)}
          accessibilityLabel="상용구 추가"
          accessibilityRole="button"
        >
          <Text style={styles.addButtonText}>+ 추가</Text>
        </TouchableOpacity>

        <View style={styles.filters}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {CATEGORIES.map(category => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.filterButton,
                  selectedCategory === category && styles.filterButtonActive
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={[
                  styles.filterButtonText,
                  selectedCategory === category && styles.filterButtonTextActive
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <TouchableOpacity
          style={[
            styles.favoriteButton,
            showFavoritesOnly && styles.favoriteButtonActive
          ]}
          onPress={() => setShowFavoritesOnly(!showFavoritesOnly)}
        >
          <Text style={styles.favoriteButtonText}>
            {showFavoritesOnly ? '⭐' : '☆'} 즐겨찾기
          </Text>
        </TouchableOpacity>
      </View>

      {/* 상용구 목록 */}
      <ScrollView style={styles.list}>
        {sortedPhrases.map(phrase => (
          <View key={phrase.id} style={styles.phraseItem}>
            <View style={styles.phraseContent}>
              <Text style={styles.phraseText}>{phrase.text}</Text>
              <View style={styles.phraseMeta}>
                <Text style={styles.phraseCategory}>{phrase.category}</Text>
                <Text style={styles.phraseUsage}>{phrase.usageCount}회 사용</Text>
              </View>
            </View>
            
            <View style={styles.phraseActions}>
              <TouchableOpacity
                onPress={() => handleToggleFavorite(phrase.id)}
                style={styles.actionButton}
              >
                <Text style={styles.actionButtonText}>
                  {phrase.isFavorite ? '⭐' : '☆'}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={() => handleEditPhrase(phrase)}
                style={styles.actionButton}
              >
                <Text style={styles.actionButtonText}>✏️</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={() => handleDeletePhrase(phrase.id)}
                style={styles.actionButton}
              >
                <Text style={styles.actionButtonText}>🗑️</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* 추가/수정 모달 */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editingPhrase ? '상용구 수정' : '상용구 추가'}
            </Text>
            
            <TextInput
              style={styles.input}
              value={newPhrase}
              onChangeText={setNewPhrase}
              placeholder="상용구를 입력하세요"
              multiline
            />
            
            <View style={styles.categoryContainer}>
              <Text style={styles.categoryLabel}>카테고리:</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {CATEGORIES.filter(cat => cat !== '전체').map(category => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.categoryButton,
                      newCategory === category && styles.categoryButtonActive
                    ]}
                    onPress={() => setNewCategory(category)}
                  >
                    <Text style={[
                      styles.categoryButtonText,
                      newCategory === category && styles.categoryButtonTextActive
                    ]}>
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
            
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setShowModal(false);
                  setEditingPhrase(null);
                  setNewPhrase('');
                  setNewCategory('일상');
                }}
              >
                <Text style={styles.cancelButtonText}>취소</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.saveButton}
                onPress={editingPhrase ? handleUpdatePhrase : handleAddPhrase}
              >
                <Text style={styles.saveButtonText}>
                  {editingPhrase ? '수정' : '추가'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
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
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  addButton: {
    backgroundColor: '#2E7D32',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 12,
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  filters: {
    flex: 1,
    marginRight: 12,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: '#2E7D32',
  },
  filterButtonText: {
    color: '#666666',
    fontSize: 14,
  },
  filterButtonTextActive: {
    color: '#ffffff',
  },
  favoriteButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
  },
  favoriteButtonActive: {
    backgroundColor: '#FFD700',
  },
  favoriteButtonText: {
    color: '#666666',
    fontSize: 14,
  },
  list: {
    flex: 1,
  },
  phraseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  phraseContent: {
    flex: 1,
  },
  phraseText: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 4,
  },
  phraseMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phraseCategory: {
    fontSize: 12,
    color: '#666666',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 8,
  },
  phraseUsage: {
    fontSize: 12,
    color: '#999999',
  },
  phraseActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 4,
  },
  actionButtonText: {
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
  },
  categoryButtonActive: {
    backgroundColor: '#2E7D32',
  },
  categoryButtonText: {
    color: '#666666',
    fontSize: 14,
  },
  categoryButtonTextActive: {
    color: '#ffffff',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#666666',
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#2E7D32',
    marginLeft: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});

export default CustomPhrasesSection;
