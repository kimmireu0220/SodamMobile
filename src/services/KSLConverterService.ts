/**
 * KSL(Korean Sign Language) 변환 서비스
 * 한국어 텍스트를 수화 형태로 변환
 */

export interface KSLConversionResult {
  originalText: string;
  kslGloss: string;
  confidence: number;
  words: KSLWord[];
}

export interface KSLWord {
  original: string;
  ksl: string;
  isInDictionary: boolean;
}

class KSLConverterService {
  // 기본 수화 단어 사전
  private dictionary: Map<string, string> = new Map([
    // 인사말
    ['안녕', '안녕'],
    ['안녕하세요', '안녕'],
    ['반갑습니다', '반갑다'],
    ['반가워요', '반갑다'],
    ['감사합니다', '감사'],
    ['고맙습니다', '감사'],
    ['미안합니다', '미안'],
    ['죄송합니다', '미안'],
    ['괜찮습니다', '괜찮다'],
    ['네', '네'],
    ['아니요', '아니다'],
    
    // 기본 동사
    ['먹다', '먹다'],
    ['먹어요', '먹다'],
    ['먹습니다', '먹다'],
    ['먹었어요', '먹다'],
    ['마시다', '마시다'],
    ['마셔요', '마시다'],
    ['가다', '가다'],
    ['가요', '가다'],
    ['갑니다', '가다'],
    ['오다', '오다'],
    ['와요', '오다'],
    ['옵니다', '오다'],
    ['보다', '보다'],
    ['봐요', '보다'],
    ['자다', '자다'],
    ['자요', '자다'],
    ['하다', '하다'],
    ['해요', '하다'],
    ['합니다', '하다'],
    
    // 기본 명사
    ['밥', '밥'],
    ['식사', '밥'],
    ['물', '물'],
    ['커피', '커피'],
    ['집', '집'],
    ['학교', '학교'],
    ['회사', '회사'],
    ['병원', '병원'],
    ['사람', '사람'],
    ['친구', '친구'],
    ['가족', '가족'],
    ['엄마', '엄마'],
    ['아빠', '아빠'],
    
    // 형용사
    ['좋다', '좋다'],
    ['좋아요', '좋다'],
    ['나쁘다', '나쁘다'],
    ['예쁘다', '예쁘다'],
    ['아프다', '아프다'],
    
    // 기타
    ['지금', '지금'],
    ['오늘', '오늘'],
    ['내일', '내일'],
    ['어제', '어제'],
  ]);

  // 제거할 조사 패턴
  private particlePatterns = [
    /은$/,
    /는$/,
    /이$/,
    /가$/,
    /을$/,
    /를$/,
    /에$/,
    /에서$/,
    /으로$/,
    /로$/,
    /과$/,
    /와$/,
    /도$/,
    /만$/,
  ];

  /**
   * 한국어 텍스트를 수화로 변환
   */
  convert(text: string): KSLConversionResult {
    if (!text || !text.trim()) {
      return {
        originalText: text,
        kslGloss: '',
        confidence: 0,
        words: [],
      };
    }

    const normalizedText = this.normalizeText(text);
    const words = this.tokenize(normalizedText);
    const convertedWords = words.map(word => this.convertWord(word));
    
    // KSL gloss 생성 (공백으로 구분)
    const kslGloss = convertedWords
      .map(w => w.ksl)
      .filter(w => w.length > 0)
      .join(' ');
    
    // 신뢰도 계산 (사전에 있는 단어 비율)
    const inDictionaryCount = convertedWords.filter(w => w.isInDictionary).length;
    const confidence = convertedWords.length > 0 
      ? inDictionaryCount / convertedWords.length 
      : 0;

    return {
      originalText: text,
      kslGloss,
      confidence: Math.round(confidence * 100) / 100, // 소수점 2자리
      words: convertedWords,
    };
  }

  /**
   * 텍스트 정규화 (구두점 제거, 공백 정리)
   */
  private normalizeText(text: string): string {
    return text
      .replace(/[.,!?;:'"]/g, '') // 구두점 제거
      .replace(/\s+/g, ' ') // 연속 공백을 하나로
      .trim();
  }

  /**
   * 텍스트를 단어로 분리
   */
  private tokenize(text: string): string[] {
    return text.split(' ').filter(word => word.length > 0);
  }

  /**
   * 단어 변환
   */
  private convertWord(word: string): KSLWord {
    // 1. 사전에서 직접 찾기
    if (this.dictionary.has(word)) {
      return {
        original: word,
        ksl: this.dictionary.get(word)!,
        isInDictionary: true,
      };
    }

    // 2. 조사 제거 후 찾기
    const withoutParticle = this.removeParticle(word);
    if (withoutParticle !== word && this.dictionary.has(withoutParticle)) {
      return {
        original: word,
        ksl: this.dictionary.get(withoutParticle)!,
        isInDictionary: true,
      };
    }

    // 3. 존댓말을 반말로 변환 후 찾기
    const informal = this.toInformal(word);
    if (informal !== word && this.dictionary.has(informal)) {
      return {
        original: word,
        ksl: this.dictionary.get(informal)!,
        isInDictionary: true,
      };
    }

    // 4. 사전에 없는 경우 원본 그대로 사용
    return {
      original: word,
      ksl: word,
      isInDictionary: false,
    };
  }

  /**
   * 조사 제거
   */
  private removeParticle(word: string): string {
    for (const pattern of this.particlePatterns) {
      const result = word.replace(pattern, '');
      if (result !== word && result.length > 0) {
        return result;
      }
    }
    return word;
  }

  /**
   * 존댓말을 반말로 변환 (기본 패턴)
   */
  private toInformal(word: string): string {
    // 합니다 -> 하다
    if (word.endsWith('합니다')) {
      return word.replace(/합니다$/, '하다');
    }
    // -습니다 -> -다
    if (word.endsWith('습니다')) {
      return word.replace(/습니다$/, '다');
    }
    // -ㅂ니다 -> -다
    if (word.endsWith('ㅂ니다')) {
      return word.replace(/ㅂ니다$/, '다');
    }
    // -어요/-아요 -> -다
    if (word.endsWith('어요') || word.endsWith('아요')) {
      return word.slice(0, -2) + '다';
    }
    // -세요 -> -다
    if (word.endsWith('세요')) {
      return word.slice(0, -2) + '다';
    }
    
    return word;
  }

  /**
   * 새로운 단어를 사전에 추가
   */
  addToDictionary(word: string, kslWord: string): void {
    this.dictionary.set(word, kslWord);
  }

  /**
   * 사전에 있는지 확인
   */
  isInDictionary(word: string): boolean {
    return this.dictionary.has(word);
  }

  /**
   * 사전 크기 반환
   */
  getDictionarySize(): number {
    return this.dictionary.size;
  }
}

// 싱글톤 인스턴스
export const kslConverterService = new KSLConverterService();

export default kslConverterService;

