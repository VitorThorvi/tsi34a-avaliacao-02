import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import TodoList from './src/components/TodoList';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.header}>Todo List App</Text>
        
        <View style={styles.content}>
          <TodoList />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
    backgroundColor: 'rgba(0,0,0,0.44)',
    color: '#fff',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
  },
  activeTab: {
    color: 'rgba(0,122,255,0.25)',
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(0,122,255,0.25)',
  },
  content: {
    flex: 1,
  },
});
