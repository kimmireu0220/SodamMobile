/**
 * Header 컴포넌트 테스트
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import Header from '../../components/Header';

describe('Header', () => {
  it('renders correctly', () => {
    render(<Header />);
    expect(screen.getByTestId('header')).toBeTruthy();
  });

  it('displays logo image', () => {
    render(<Header />);
    expect(screen.getByTestId('logo-image')).toBeTruthy();
  });

  it('logo button has correct accessibility label', () => {
    render(<Header />);
    const logoButton = screen.getByTestId('logo-button');
    expect(logoButton.props.accessibilityLabel).toBe('홈으로 이동');
  });

  it('logo button has correct accessibility role', () => {
    render(<Header />);
    const logoButton = screen.getByTestId('logo-button');
    expect(logoButton.props.accessibilityRole).toBe('button');
  });

  it('calls onLogoClick when logo is pressed', () => {
    const onLogoClick = jest.fn();
    render(<Header onLogoClick={onLogoClick} />);
    
    const logoButton = screen.getByTestId('logo-button');
    fireEvent.press(logoButton);
    
    expect(onLogoClick).toHaveBeenCalledTimes(1);
  });

  it('does not crash when onLogoClick is not provided', () => {
    render(<Header />);
    
    const logoButton = screen.getByTestId('logo-button');
    fireEvent.press(logoButton);
    
    // Should not throw error
    expect(logoButton).toBeTruthy();
  });
});
