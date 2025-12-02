import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import TodoList, { Todo } from '../src/components/TodoList';

describe('TodoList Component', () => {
  const mockTodos: Todo[] = [
    { id: '1', text: 'Buy groceries', completed: false },
    { id: '2', text: 'Walk the dog', completed: true },
    { id: '3', text: 'Read a book', completed: false },
  ];

  it('renders empty state when no todos are provided', () => {
    render(<TodoList />);
    
    const emptyMessage = screen.getByTestId('empty-message');
    expect(emptyMessage).toHaveTextContent('No tasks yet. Add one above!');
    
    const counter = screen.getByTestId('todo-counter');
    expect(counter).toHaveTextContent('0/0 completed');
  });

  it('renders initial todos correctly', () => {
    render(<TodoList initialTodos={mockTodos} />);
    
    expect(screen.getByTestId('todo-text-1')).toHaveTextContent('Buy groceries');
    expect(screen.getByTestId('todo-text-2')).toHaveTextContent('Walk the dog');
    expect(screen.getByTestId('todo-text-3')).toHaveTextContent('Read a book');
    
    const counter = screen.getByTestId('todo-counter');
    expect(counter).toHaveTextContent('1/3 completed');
  });

  it('adds a new todo when input is filled and add button is pressed', () => {
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    fireEvent.changeText(input, 'New task');
    fireEvent.press(addButton);
    
    // Should find the new task text somewhere in the rendered output
    expect(screen.getByText('New task')).toBeTruthy();
    
    // Counter should update
    const counter = screen.getByTestId('todo-counter');
    expect(counter).toHaveTextContent('0/1 completed');
    
    // Input should be cleared
    expect(input.props.value).toBe('');
  });

  it('does not add todo when input is empty', () => {
    render(<TodoList />);
    
    const addButton = screen.getByTestId('add-button');
    
    fireEvent.press(addButton);
    
    // Should still show empty message
    const emptyMessage = screen.getByTestId('empty-message');
    expect(emptyMessage).toBeTruthy();
  });

  it('does not add todo when input contains only whitespace', () => {
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    fireEvent.changeText(input, '   ');
    fireEvent.press(addButton);
    
    // Should still show empty message
    const emptyMessage = screen.getByTestId('empty-message');
    expect(emptyMessage).toBeTruthy();
  });

  it('toggles todo completion status when checkbox is pressed', () => {
    render(<TodoList initialTodos={mockTodos} />);
    
    const counter = screen.getByTestId('todo-counter');
    expect(counter).toHaveTextContent('1/3 completed');
    
    // Toggle first todo (incomplete -> complete)
    const toggleButton1 = screen.getByTestId('toggle-1');
    fireEvent.press(toggleButton1);
    
    expect(counter).toHaveTextContent('2/3 completed');
    
    // Toggle second todo (complete -> incomplete)
    const toggleButton2 = screen.getByTestId('toggle-2');
    fireEvent.press(toggleButton2);
    
    expect(counter).toHaveTextContent('1/3 completed');
  });

  it('removes todo when delete button is pressed', () => {
    render(<TodoList initialTodos={mockTodos} />);
    
    const counter = screen.getByTestId('todo-counter');
    expect(counter).toHaveTextContent('1/3 completed');
    
    // Delete the first todo
    const deleteButton = screen.getByTestId('delete-1');
    fireEvent.press(deleteButton);
    
    // First todo should be gone
    expect(screen.queryByTestId('todo-item-1')).toBeNull();
    
    // Counter should update
    expect(counter).toHaveTextContent('1/2 completed');
  });

  it('calls onTodosChange callback when todos are modified', () => {
    const mockOnTodosChange = jest.fn();
    render(<TodoList initialTodos={mockTodos} onTodosChange={mockOnTodosChange} />);
    
    // Toggle a todo
    const toggleButton = screen.getByTestId('toggle-1');
    fireEvent.press(toggleButton);
    
    expect(mockOnTodosChange).toHaveBeenCalledTimes(1);
    expect(mockOnTodosChange).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ id: '1', completed: true }),
      ])
    );
  });

  it('calls onTodosChange when a todo is deleted', () => {
    const mockOnTodosChange = jest.fn();
    render(<TodoList initialTodos={mockTodos} onTodosChange={mockOnTodosChange} />);
    
    // Delete a todo
    const deleteButton = screen.getByTestId('delete-1');
    fireEvent.press(deleteButton);
    
    expect(mockOnTodosChange).toHaveBeenCalledWith(
      expect.not.arrayContaining([
        expect.objectContaining({ id: '1' }),
      ])
    );
  });

  it('trims whitespace from new todo text', () => {
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-button');
    
    fireEvent.changeText(input, '  Task with spaces  ');
    fireEvent.press(addButton);
    
    // Should find the trimmed task text
    expect(screen.getByText('Task with spaces')).toBeTruthy();
  });
});
