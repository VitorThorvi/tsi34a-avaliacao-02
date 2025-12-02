import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Todo } from './TodoList';

type TodoItemProps = {
  item: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ item, onToggle, onDelete }: TodoItemProps) {
  return (
    <View style={styles.todoItem} testID={`todo-item-${item.id}`}>
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => onToggle(item.id)}
        testID={`toggle-${item.id}`}
        accessibilityLabel={`${item.completed ? 'Mark as incomplete' : 'Mark as complete'}`}
      >
        <Text style={styles.checkboxText}>{item.completed ? '✓' : '○'}</Text>
      </TouchableOpacity>
      <Text
        style={[styles.todoText, item.completed && styles.todoTextCompleted]}
        testID={`todo-text-${item.id}`}
      >
        {item.text}
      </Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(item.id)}
        testID={`delete-${item.id}`}
        accessibilityLabel="Delete task"
      >
        <Text style={styles.deleteButtonText}>×</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxText: {
    fontSize: 20,
    color: '#007AFF',
  },
  todoText: {
    flex: 1,
    fontSize: 16,
  },
  todoTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  deleteButton: {
    padding: 5,
  },
  deleteButtonText: {
    fontSize: 24,
    color: '#FF3B30',
    fontWeight: 'bold',
  },
});
