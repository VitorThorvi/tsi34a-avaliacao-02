import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface CounterProps {
  initialValue?: number;
  step?: number;
  minValue?: number;
  maxValue?: number;
  onValueChange?: (value: number) => void;
}

export default function Counter({
  initialValue = 0,
  step = 1,
  minValue = -Infinity,
  maxValue = Infinity,
  onValueChange,
}: CounterProps) {
  const [count, setCount] = useState(initialValue);

  const increment = () => {
    const newValue = Math.min(count + step, maxValue);
    setCount(newValue);
    onValueChange?.(newValue);
  };

  const decrement = () => {
    const newValue = Math.max(count - step, minValue);
    setCount(newValue);
    onValueChange?.(newValue);
  };

  const reset = () => {
    setCount(initialValue);
    onValueChange?.(initialValue);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Counter</Text>
      <View style={styles.counterRow}>
        <TouchableOpacity
          style={[styles.button, count <= minValue && styles.buttonDisabled]}
          onPress={decrement}
          testID="decrement-button"
          disabled={count <= minValue}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.countText} testID="count-value">
          {count}
        </Text>
        <TouchableOpacity
          style={[styles.button, count >= maxValue && styles.buttonDisabled]}
          onPress={increment}
          testID="increment-button"
          disabled={count >= maxValue}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.resetButton} onPress={reset} testID="reset-button">
        <Text style={styles.resetButtonText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    margin: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  countText: {
    fontSize: 48,
    fontWeight: 'bold',
    marginHorizontal: 30,
    minWidth: 80,
    textAlign: 'center',
  },
  resetButton: {
    marginTop: 20,
    backgroundColor: '#FF3B30',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
