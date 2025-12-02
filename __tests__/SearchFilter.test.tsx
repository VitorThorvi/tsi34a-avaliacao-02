import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import SearchFilter, { Item } from '../src/components/SearchFilter';

describe('SearchFilter Component', () => {
  const mockItems: Item[] = [
    { id: '1', name: 'Apple', category: 'Fruit' },
    { id: '2', name: 'Banana', category: 'Fruit' },
    { id: '3', name: 'Carrot', category: 'Vegetable' },
    { id: '4', name: 'Broccoli', category: 'Vegetable' },
    { id: '5', name: 'Chicken', category: 'Meat' },
  ];

  it('renders all items when no filters are applied', () => {
    render(<SearchFilter items={mockItems} />);
    
    expect(screen.getByTestId('item-1')).toBeTruthy();
    expect(screen.getByTestId('item-2')).toBeTruthy();
    expect(screen.getByTestId('item-3')).toBeTruthy();
    expect(screen.getByTestId('item-4')).toBeTruthy();
    expect(screen.getByTestId('item-5')).toBeTruthy();
    
    const resultsCount = screen.getByTestId('results-count');
    expect(resultsCount).toHaveTextContent('5 results found');
  });

  it('filters items by search query (case insensitive)', () => {
    render(<SearchFilter items={mockItems} />);
    
    const searchInput = screen.getByTestId('search-input');
    fireEvent.changeText(searchInput, 'apple');
    
    expect(screen.getByTestId('item-1')).toBeTruthy();
    expect(screen.queryByTestId('item-2')).toBeNull();
    expect(screen.queryByTestId('item-3')).toBeNull();
    
    const resultsCount = screen.getByTestId('results-count');
    expect(resultsCount).toHaveTextContent('1 result found');
  });

  it('filters items by partial search query', () => {
    render(<SearchFilter items={mockItems} />);
    
    const searchInput = screen.getByTestId('search-input');
    fireEvent.changeText(searchInput, 'an');
    
    // Should match "Banana"
    expect(screen.getByTestId('item-2')).toBeTruthy();
    expect(screen.queryByTestId('item-1')).toBeNull();
    
    const resultsCount = screen.getByTestId('results-count');
    expect(resultsCount).toHaveTextContent('1 result found');
  });

  it('filters items by category', () => {
    render(<SearchFilter items={mockItems} />);
    
    const fruitCategory = screen.getByTestId('category-Fruit');
    fireEvent.press(fruitCategory);
    
    expect(screen.getByTestId('item-1')).toBeTruthy();
    expect(screen.getByTestId('item-2')).toBeTruthy();
    expect(screen.queryByTestId('item-3')).toBeNull();
    expect(screen.queryByTestId('item-4')).toBeNull();
    expect(screen.queryByTestId('item-5')).toBeNull();
    
    const resultsCount = screen.getByTestId('results-count');
    expect(resultsCount).toHaveTextContent('2 results found');
  });

  it('combines search query and category filter', () => {
    render(<SearchFilter items={mockItems} />);
    
    const searchInput = screen.getByTestId('search-input');
    const vegetableCategory = screen.getByTestId('category-Vegetable');
    
    fireEvent.changeText(searchInput, 'c');
    fireEvent.press(vegetableCategory);
    
    // Should only show Carrot (matches 'c' and is a Vegetable)
    // Broccoli contains 'c' too but only Carrot starts with 'c'
    expect(screen.getByTestId('item-3')).toBeTruthy(); // Carrot
    expect(screen.getByTestId('item-4')).toBeTruthy(); // Broccoli (contains 'c')
    expect(screen.queryByTestId('item-1')).toBeNull();
    expect(screen.queryByTestId('item-5')).toBeNull(); // Chicken contains 'c' but is Meat
    
    const resultsCount = screen.getByTestId('results-count');
    expect(resultsCount).toHaveTextContent('2 results found');
  });

  it('shows no results message when no items match', () => {
    render(<SearchFilter items={mockItems} />);
    
    const searchInput = screen.getByTestId('search-input');
    fireEvent.changeText(searchInput, 'xyz');
    
    const noResults = screen.getByTestId('no-results');
    expect(noResults).toHaveTextContent('No items match your search criteria');
    
    const resultsCount = screen.getByTestId('results-count');
    expect(resultsCount).toHaveTextContent('0 results found');
  });

  it('clears all filters when clear button is pressed', () => {
    render(<SearchFilter items={mockItems} />);
    
    const searchInput = screen.getByTestId('search-input');
    const fruitCategory = screen.getByTestId('category-Fruit');
    
    // Apply filters
    fireEvent.changeText(searchInput, 'apple');
    fireEvent.press(fruitCategory);
    
    // Verify filters are applied
    expect(screen.getByTestId('results-count')).toHaveTextContent('1 result found');
    
    // Clear filters
    const clearButton = screen.getByTestId('clear-filters');
    fireEvent.press(clearButton);
    
    // All items should be visible again
    expect(screen.getByTestId('results-count')).toHaveTextContent('5 results found');
    expect(searchInput.props.value).toBe('');
  });

  it('shows clear button only when filters are applied', () => {
    render(<SearchFilter items={mockItems} />);
    
    // No clear button initially
    expect(screen.queryByTestId('clear-filters')).toBeNull();
    
    // Apply search filter
    const searchInput = screen.getByTestId('search-input');
    fireEvent.changeText(searchInput, 'a');
    
    // Clear button should appear
    expect(screen.getByTestId('clear-filters')).toBeTruthy();
  });

  it('calls onItemSelect callback when item is pressed', () => {
    const mockOnItemSelect = jest.fn();
    render(<SearchFilter items={mockItems} onItemSelect={mockOnItemSelect} />);
    
    const item = screen.getByTestId('item-1');
    fireEvent.press(item);
    
    expect(mockOnItemSelect).toHaveBeenCalledTimes(1);
    expect(mockOnItemSelect).toHaveBeenCalledWith(mockItems[0]);
  });

  it('renders category buttons for all unique categories', () => {
    render(<SearchFilter items={mockItems} />);
    
    expect(screen.getByTestId('category-all')).toBeTruthy();
    expect(screen.getByTestId('category-Fruit')).toBeTruthy();
    expect(screen.getByTestId('category-Vegetable')).toBeTruthy();
    expect(screen.getByTestId('category-Meat')).toBeTruthy();
  });

  it('uses custom placeholder text', () => {
    render(<SearchFilter items={mockItems} placeholder="Find food..." />);
    
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput.props.placeholder).toBe('Find food...');
  });

  it('switches between categories correctly', () => {
    render(<SearchFilter items={mockItems} />);
    
    // Select Fruit category
    fireEvent.press(screen.getByTestId('category-Fruit'));
    expect(screen.getByTestId('results-count')).toHaveTextContent('2 results found');
    
    // Switch to Vegetable category
    fireEvent.press(screen.getByTestId('category-Vegetable'));
    expect(screen.getByTestId('results-count')).toHaveTextContent('2 results found');
    
    // Switch to Meat category
    fireEvent.press(screen.getByTestId('category-Meat'));
    expect(screen.getByTestId('results-count')).toHaveTextContent('1 result found');
    
    // Switch back to All
    fireEvent.press(screen.getByTestId('category-all'));
    expect(screen.getByTestId('results-count')).toHaveTextContent('5 results found');
  });
});
