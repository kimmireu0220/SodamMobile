/**
 * 스페이싱 시스템 정의
 * 일관된 간격 사용을 위한 전역 스페이싱
 */

export const Spacing = {
  // Base spacing unit (4px)
  base: 4,
  
  // Spacing scale
  xs: 4,    // 4px
  sm: 8,    // 8px
  md: 12,   // 12px
  lg: 16,   // 16px
  xl: 20,   // 20px
  '2xl': 24, // 24px
  '3xl': 32, // 32px
  '4xl': 40, // 40px
  '5xl': 48, // 48px
  '6xl': 64, // 64px
  '7xl': 80, // 80px
  '8xl': 96, // 96px
  
  // Semantic spacing
  padding: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
    '3xl': 32,
  },
  
  margin: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
    '3xl': 32,
  },
  
  gap: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
  },
  
  // Border radius
  radius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 20,
    full: 9999,
  },
  
  // Border width
  borderWidth: {
    none: 0,
    thin: 0.5,
    base: 1,
    thick: 2,
    thicker: 3,
  },
} as const;

export type SpacingKey = keyof typeof Spacing;
export type PaddingKey = keyof typeof Spacing.padding;
export type MarginKey = keyof typeof Spacing.margin;
export type GapKey = keyof typeof Spacing.gap;
export type RadiusKey = keyof typeof Spacing.radius;
export type BorderWidthKey = keyof typeof Spacing.borderWidth;

export default Spacing;
