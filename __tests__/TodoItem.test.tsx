import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import TodoItem from '../src/components/TodoItem';
import { Todo } from '../src/components/TodoList';

describe('TodoItem Component', () => {
  const incompleteTodo: Todo = {
    id: '1',
    text: 'Test task',
    completed: false,
  };

  const completedTodo: Todo = {
    id: '2',
    text: 'Completed task',
    completed: true,
  };

  const mockOnToggle = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });



  it('renders completed todo with checkmark', () => {
    render(
      <TodoItem
        item={completedTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );

    const checkbox = screen.getByTestId('toggle-2');
    expect(checkbox).toHaveTextContent('✓');
  });

  it('applies strikethrough ', () => {
    const { getByTestId } = render(
      <TodoItem
        item={completedTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );

    const todoText = getByTestId('todo-text-2');
    // Check that the completed text has the strikethrough style applied
    const styles = todoText.props.style;
    const flatStyles = Array.isArray(styles) ? Object.assign({}, ...styles.filter(Boolean)) : styles;
    expect(flatStyles.textDecorationLine).toBe('line-through');
  });
});
