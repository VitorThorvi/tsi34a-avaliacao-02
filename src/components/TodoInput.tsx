import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

type TodoInputProps = {
  onAddTodo: (text: string) => void;
  placeholder?: string;
}

export default function TodoInput({ onAddTodo, placeholder = 'Add a new task...' }: TodoInputProps) {
  const [inputText, setInputText] = useState('');

  const handleAdd = () => {
    if (inputText.trim() === '') return;
    onAddTodo(inputText.trim());
    setInputText('');
  };

  return (
    <View style={styles.inputRow}>
      <TextInput
        style={styles.input}
        value={inputText}
        onChangeText={setInputText}
        placeholder={placeholder}
        testID="todo-input"
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAdd}
        testID="add-button"
      >
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  addButton: {
    backgroundColor: '#9c9c9c',
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 5,
    marginLeft: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
