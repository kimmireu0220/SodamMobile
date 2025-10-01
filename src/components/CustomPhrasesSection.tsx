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
import storageService from '../services/StorageService';
import { CustomPhrase } from '../types/data';

const CustomPhrasesSection: React.FC = () => {
  const [phrases, setPhrases] = useState<CustomPhrase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingPhrase, setEditingPhrase] = useState<CustomPhrase | null>(null);
  const [newPhrase, setNewPhrase] = useState('');

  useEffect(() => {
    loadPhrases();
  }, []);

  const loadPhrases = async () => {
    try {
      const savedPhrases = await storageService.get<CustomPhrase[]>('CUSTOM_PHRASES');
      if (savedPhrases && savedPhrases.length > 0) {
        setPhrases(savedPhrases);
      } else {
        // 첫 실행 시 기본 상용구 생성 (6개)
        const defaultPhrases: CustomPhrase[] = [
          {
            id: '1',
            text: '안녕하세요',
            category: '인사',
            isFavorite: true,
            usageCount: 0,
            createdAt: new Date().toISOString()
          },
          {
            id: '2',
            text: '감사합니다',
            category: '인사',
            isFavorite: true,
            usageCount: 0,
            createdAt: new Date().toISOString()
          },
          {
            id: '3',
            text: '죄송합니다',
            category: '인사',
            isFavorite: false,
            usageCount: 0,
            createdAt: new Date().toISOString()
          },
          {
            id: '4',
            text: '괜찮습니다',
            category: '응답',
            isFavorite: false,
            usageCount: 0,
            createdAt: new Date().toISOString()
          },
          {
            id: '5',
            text: '네',
            category: '응답',
            isFavorite: false,
            usageCount: 0,
            createdAt: new Date().toISOString()
          },
          {
            id: '6',
            text: '아니요',
            category: '응답',
            isFavorite: false,
            usageCount: 0,
            createdAt: new Date().toISOString()
          }
        ];
        await storageService.set('CUSTOM_PHRASES', defaultPhrases);
        setPhrases(defaultPhrases);
      }
    } catch (error) {
      console.error('Failed to load custom phrases:', error);
      Alert.alert('오류', '상용구를 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPhrases = phrases.filter(phrase => {
    if (showFavoritesOnly && !phrase.isFavorite) {
      return false;
    }
    return true;
  });

  const sortedPhrases = [...filteredPhrases].sort((a, b) => {
    return b.usageCount - a.usageCount;
  });

  const handleAddPhrase = async () => {
    if (!newPhrase.trim()) {
      Alert.alert('오류', '문구를 입력해주세요.');
      return;
    }

    try {
      const phrase: CustomPhrase = {
        id: Date.now().toString(),
        text: newPhrase.trim(),
        category: '기타',
        isFavorite: false,
        usageCount: 0,
        createdAt: new Date().toISOString()
      };

      const updatedPhrases = [...phrases, phrase];
      await storageService.set('CUSTOM_PHRASES', updatedPhrases);
      setPhrases(updatedPhrases);
      setNewPhrase('');
      setShowModal(false);
      Alert.alert('성공', '상용구가 추가되었습니다.');
    } catch (error) {
      console.error('Failed to add phrase:', error);
      Alert.alert('오류', '상용구 추가에 실패했습니다.');
    }
  };

  const handleEditPhrase = (phrase: CustomPhrase) => {
    setEditingPhrase(phrase);
    setNewPhrase(phrase.text);
    setShowModal(true);
  };

  const handleUpdatePhrase = async () => {
    if (!editingPhrase || !newPhrase.trim()) {
      Alert.alert('오류', '문구를 입력해주세요.');
      return;
    }

    try {
      const updatedPhrases = phrases.map(p => 
        p.id === editingPhrase.id 
          ? { ...p, text: newPhrase.trim() }
          : p
      );

      await storageService.set('CUSTOM_PHRASES', updatedPhrases);
      setPhrases(updatedPhrases);
      setEditingPhrase(null);
      setNewPhrase('');
      setShowModal(false);
      Alert.alert('성공', '상용구가 수정되었습니다.');
    } catch (error) {
      console.error('Failed to update phrase:', error);
      Alert.alert('오류', '상용구 수정에 실패했습니다.');
    }
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
          onPress: async () => {
            try {
              const updatedPhrases = phrases.filter(p => p.id !== id);
              await storageService.set('CUSTOM_PHRASES', updatedPhrases);
              setPhrases(updatedPhrases);
            } catch (error) {
              console.error('Failed to delete phrase:', error);
              Alert.alert('오류', '상용구 삭제에 실패했습니다.');
            }
          }
        }
      ]
    );
  };

  const handleToggleFavorite = async (id: string) => {
    try {
      const updatedPhrases = phrases.map(p => 
        p.id === id ? { ...p, isFavorite: !p.isFavorite } : p
      );
      await storageService.set('CUSTOM_PHRASES', updatedPhrases);
      setPhrases(updatedPhrases);
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
      Alert.alert('오류', '즐겨찾기 변경에 실패했습니다.');
    }
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
      <ScrollView 
        style={styles.list}
        contentContainerStyle={styles.listContent}
      >
        {sortedPhrases.map(phrase => (
          <View key={phrase.id} style={styles.phraseItem}>
            <View style={styles.phraseContent}>
              <Text style={styles.phraseText}>{phrase.text}</Text>
              <View style={styles.phraseMeta}>
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
            
            
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setShowModal(false);
                  setEditingPhrase(null);
                  setNewPhrase('');
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
  listContent: {
    paddingBottom: 100, // 하단 네비게이션 공간 확보
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
