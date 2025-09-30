/**
 * Header 컴포넌트 테스트
 */
import React from 'react';
import { render, screen } from '@testing-library/react-native';
import Header from '../../components/Header';

describe('Header', () => {
  it('renders correctly', () => {
    render(<Header />);
    expect(screen.getByTestId('header')).toBeTruthy();
  });

  it('displays app title', () => {
    render(<Header />);
    expect(screen.getByText('소담')).toBeTruthy();
  });

  it('has correct accessibility label', () => {
    render(<Header />);
    const header = screen.getByTestId('header');
    expect(header.props.accessibilityLabel).toBe('앱 헤더');
  });

  it('has correct accessibility role', () => {
    render(<Header />);
    const header = screen.getByTestId('header');
    expect(header.props.accessibilityRole).toBe('header');
  });
});
