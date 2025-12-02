import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import TodoInput from '../src/components/TodoInput';

describe('TodoInput Component', () => {
  const mockOnAddTodo = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders input field and add button', () => {
    render(<TodoInput onAddTodo={mockOnAddTodo} />);

    expect(screen.getByTestId('todo-input')).toBeTruthy();
    expect(screen.getByTestId('add-button')).toBeTruthy();
  });

  it('renders with default placeholder text', () => {
    render(<TodoInput onAddTodo={mockOnAddTodo} />);

    const input = screen.getByTestId('todo-input');
    expect(input.props.placeholder).toBe('Add a new task...');
  });


  it('updates input value when text is entered', () => {
    render(<TodoInput onAddTodo={mockOnAddTodo} />);

    const input = screen.getByTestId('todo-input');
    fireEvent.changeText(input, 'New task');

    expect(input.props.value).toBe('New task');
  });

  it('renders add button with correct text', () => {
    render(<TodoInput onAddTodo={mockOnAddTodo} />);

    const addButton = screen.getByTestId('add-button');
    expect(addButton).toHaveTextContent('Add');
  });
});
