/**
 * KSLConverterService 테스트
 */
import kslConverterService from '../../services/KSLConverterService';

describe('KSLConverterService', () => {
  describe('기본 변환 테스트', () => {
    it('사전에 있는 단어를 변환해야 함', () => {
      const result = kslConverterService.convert('안녕하세요');
      
      expect(result.originalText).toBe('안녕하세요');
      expect(result.kslGloss).toBe('안녕');
      expect(result.confidence).toBeGreaterThan(0);
    });

    it('여러 단어를 변환해야 함', () => {
      const result = kslConverterService.convert('안녕하세요 반갑습니다');
      
      expect(result.originalText).toBe('안녕하세요 반갑습니다');
      expect(result.kslGloss).toBe('안녕 반갑다');
      expect(result.confidence).toBe(1.0); // 모두 사전에 있음
    });

    it('조사를 제거하고 변환해야 함', () => {
      const result = kslConverterService.convert('밥을 먹어요');
      
      expect(result.kslGloss).toBe('밥 먹다');
    });

    it('구두점을 제거해야 함', () => {
      const result = kslConverterService.convert('안녕하세요, 반갑습니다!');
      
      expect(result.kslGloss).toBe('안녕 반갑다');
    });

    it('빈 문자열을 처리해야 함', () => {
      const result = kslConverterService.convert('');
      
      expect(result.kslGloss).toBe('');
      expect(result.confidence).toBe(0);
    });
  });

  describe('존댓말 변환 테스트', () => {
    it('합니다를 반말로 변환해야 함', () => {
      const result = kslConverterService.convert('감사합니다');
      
      expect(result.kslGloss).toBe('감사');
    });

    it('-어요를 변환해야 함', () => {
      const result = kslConverterService.convert('먹어요');
      
      expect(result.kslGloss).toBe('먹다');
    });
  });

  describe('신뢰도 계산 테스트', () => {
    it('모든 단어가 사전에 있으면 신뢰도 1.0', () => {
      const result = kslConverterService.convert('안녕하세요 감사합니다');
      
      expect(result.confidence).toBe(1.0);
    });

    it('일부 단어만 사전에 있으면 신뢰도가 낮아야 함', () => {
      const result = kslConverterService.convert('안녕하세요 알수없는단어');
      
      expect(result.confidence).toBeLessThan(1.0);
      expect(result.confidence).toBeGreaterThan(0);
    });
  });

  describe('사전 관리', () => {
    it('사전에 단어를 추가할 수 있어야 함', () => {
      const testWord = '테스트단어';
      const testKSL = '테스트';
      
      kslConverterService.addToDictionary(testWord, testKSL);
      
      expect(kslConverterService.isInDictionary(testWord)).toBe(true);
      
      const result = kslConverterService.convert(testWord);
      expect(result.kslGloss).toBe(testKSL);
    });

    it('사전 크기를 반환해야 함', () => {
      const size = kslConverterService.getDictionarySize();
      
      expect(size).toBeGreaterThan(0);
    });
  });
});

