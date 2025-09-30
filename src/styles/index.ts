/**
 * 전역 스타일 시스템 인덱스
 * 모든 스타일 관련 export를 중앙화
 */

// Core style systems
export { default as Colors } from './colors';
export { default as Typography, TextStyles } from './typography';
export { default as Spacing } from './spacing';
export { default as Shadows, getShadowStyle } from './shadows';

// Re-export types
export type { ColorKey, GrayColorKey } from './colors';
export type { TextStyleKey } from './typography';
export type { SpacingKey, PaddingKey, MarginKey, GapKey, RadiusKey, BorderWidthKey } from './spacing';
export type { ShadowKey } from './shadows';

// Common style combinations
import { StyleSheet } from 'react-native';
import Colors from './colors';
import Typography from './typography';
import Spacing from './spacing';
import { getShadowStyle } from './shadows';

export const CommonStyles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  
  safeContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  
  contentContainer: {
    flex: 1,
    padding: Spacing.lg,
  },
  
  // Card styles
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Spacing.radius.lg,
    padding: Spacing.lg,
    ...getShadowStyle('md'),
  },
  
  cardElevated: {
    backgroundColor: Colors.surface,
    borderRadius: Spacing.radius.lg,
    padding: Spacing.lg,
    ...getShadowStyle('lg'),
  },
  
  // Button styles
  button: {
    backgroundColor: Colors.primary,
    borderRadius: Spacing.radius.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...getShadowStyle('sm'),
  },
  
  buttonSecondary: {
    backgroundColor: Colors.secondary,
    borderRadius: Spacing.radius.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...getShadowStyle('sm'),
  },
  
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: Spacing.borderWidth.base,
    borderColor: Colors.primary,
    borderRadius: Spacing.radius.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Text styles
  buttonText: {
    ...Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textInverse,
  },
  
  buttonTextSecondary: {
    ...Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.textInverse,
  },
  
  buttonTextOutline: {
    ...Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.primary,
  },
  
  // Input styles
  input: {
    borderWidth: Spacing.borderWidth.base,
    borderColor: Colors.border,
    borderRadius: Spacing.radius.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
    backgroundColor: Colors.surface,
  },
  
  inputFocused: {
    borderColor: Colors.primary,
    ...getShadowStyle('sm'),
  },
  
  inputError: {
    borderColor: Colors.error,
  },
  
  // Layout styles
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  column: {
    flexDirection: 'column',
  },
  
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  // Spacing utilities
  marginTop: {
    marginTop: Spacing.lg,
  },
  
  marginBottom: {
    marginBottom: Spacing.lg,
  },
  
  marginHorizontal: {
    marginHorizontal: Spacing.lg,
  },
  
  marginVertical: {
    marginVertical: Spacing.lg,
  },
  
  paddingTop: {
    paddingTop: Spacing.lg,
  },
  
  paddingBottom: {
    paddingBottom: Spacing.lg,
  },
  
  paddingHorizontal: {
    paddingHorizontal: Spacing.lg,
  },
  
  paddingVertical: {
    paddingVertical: Spacing.lg,
  },
});

export default {
  Colors,
  Typography,
  Spacing,
  CommonStyles,
};
