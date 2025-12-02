import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import Counter from '../src/components/Counter';

describe('Counter Component', () => {
  it('renders with default initial value of 0', () => {
    render(<Counter />);
    
    const countValue = screen.getByTestId('count-value');
    expect(countValue).toHaveTextContent('0');
  });

  it('renders with custom initial value', () => {
    render(<Counter initialValue={10} />);
    
    const countValue = screen.getByTestId('count-value');
    expect(countValue).toHaveTextContent('10');
  });

  it('increments count when increment button is pressed', () => {
    render(<Counter />);
    
    const incrementButton = screen.getByTestId('increment-button');
    const countValue = screen.getByTestId('count-value');
    
    fireEvent.press(incrementButton);
    expect(countValue).toHaveTextContent('1');
    
    fireEvent.press(incrementButton);
    expect(countValue).toHaveTextContent('2');
  });

  it('decrements count when decrement button is pressed', () => {
    render(<Counter initialValue={5} />);
    
    const decrementButton = screen.getByTestId('decrement-button');
    const countValue = screen.getByTestId('count-value');
    
    fireEvent.press(decrementButton);
    expect(countValue).toHaveTextContent('4');
    
    fireEvent.press(decrementButton);
    expect(countValue).toHaveTextContent('3');
  });

  it('resets count to initial value when reset button is pressed', () => {
    render(<Counter initialValue={5} />);
    
    const incrementButton = screen.getByTestId('increment-button');
    const resetButton = screen.getByTestId('reset-button');
    const countValue = screen.getByTestId('count-value');
    
    // Increment a few times
    fireEvent.press(incrementButton);
    fireEvent.press(incrementButton);
    fireEvent.press(incrementButton);
    expect(countValue).toHaveTextContent('8');
    
    // Reset
    fireEvent.press(resetButton);
    expect(countValue).toHaveTextContent('5');
  });

  it('increments by custom step value', () => {
    render(<Counter step={5} />);
    
    const incrementButton = screen.getByTestId('increment-button');
    const countValue = screen.getByTestId('count-value');
    
    fireEvent.press(incrementButton);
    expect(countValue).toHaveTextContent('5');
    
    fireEvent.press(incrementButton);
    expect(countValue).toHaveTextContent('10');
  });

  it('respects maxValue boundary', () => {
    render(<Counter initialValue={8} maxValue={10} />);
    
    const incrementButton = screen.getByTestId('increment-button');
    const countValue = screen.getByTestId('count-value');
    
    fireEvent.press(incrementButton);
    expect(countValue).toHaveTextContent('9');
    
    fireEvent.press(incrementButton);
    expect(countValue).toHaveTextContent('10');
    
    // Should not go beyond maxValue
    fireEvent.press(incrementButton);
    expect(countValue).toHaveTextContent('10');
  });

  it('respects minValue boundary', () => {
    render(<Counter initialValue={2} minValue={0} />);
    
    const decrementButton = screen.getByTestId('decrement-button');
    const countValue = screen.getByTestId('count-value');
    
    fireEvent.press(decrementButton);
    expect(countValue).toHaveTextContent('1');
    
    fireEvent.press(decrementButton);
    expect(countValue).toHaveTextContent('0');
    
    // Should not go below minValue
    fireEvent.press(decrementButton);
    expect(countValue).toHaveTextContent('0');
  });

  it('calls onValueChange callback when value changes', () => {
    const mockOnValueChange = jest.fn();
    render(<Counter onValueChange={mockOnValueChange} />);
    
    const incrementButton = screen.getByTestId('increment-button');
    const decrementButton = screen.getByTestId('decrement-button');
    const resetButton = screen.getByTestId('reset-button');
    
    fireEvent.press(incrementButton);
    expect(mockOnValueChange).toHaveBeenCalledWith(1);
    
    fireEvent.press(decrementButton);
    expect(mockOnValueChange).toHaveBeenCalledWith(0);
    
    fireEvent.press(incrementButton);
    fireEvent.press(resetButton);
    expect(mockOnValueChange).toHaveBeenCalledWith(0);
    
    expect(mockOnValueChange).toHaveBeenCalledTimes(4);
  });
});
