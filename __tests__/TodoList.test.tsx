
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

    expect(screen.getByText('New task')).toBeTruthy();

    const counter = screen.getByTestId('todo-counter');
    expect(counter).toHaveTextContent('0/1 completed');

    expect(input.props.value).toBe('');
  });

  it('does not add todo when input is empty', () => {
    render(<TodoList />);

    const addButton = screen.getByTestId('add-button');

    fireEvent.press(addButton);

    const emptyMessage = screen.getByTestId('empty-message');
    expect(emptyMessage).toBeTruthy();
  });



  it('removes todo when delete button is pressed', () => {
    render(<TodoList initialTodos={mockTodos} />);

    const counter = screen.getByTestId('todo-counter');
    expect(counter).toHaveTextContent('1/3 completed');

    const deleteButton = screen.getByTestId('delete-1');
    fireEvent.press(deleteButton);

    expect(screen.queryByTestId('todo-item-1')).toBeNull();

    expect(counter).toHaveTextContent('1/2 completed');
  });



});