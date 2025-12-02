import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Counter from './src/components/Counter';
import TodoList from './src/components/TodoList';
import SearchFilter, { Item } from './src/components/SearchFilter';

const sampleItems: Item[] = [
  { id: '1', name: 'Apple', category: 'Fruit' },
  { id: '2', name: 'Banana', category: 'Fruit' },
  { id: '3', name: 'Orange', category: 'Fruit' },
  { id: '4', name: 'Carrot', category: 'Vegetable' },
  { id: '5', name: 'Broccoli', category: 'Vegetable' },
  { id: '6', name: 'Spinach', category: 'Vegetable' },
  { id: '7', name: 'Chicken', category: 'Meat' },
  { id: '8', name: 'Beef', category: 'Meat' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'counter' | 'todo' | 'search'>('counter');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.header}>React Native Components Demo</Text>
      
      <View style={styles.tabContainer}>
        {/*<Text*/}
        {/*  style={[styles.tab, activeTab === 'counter' && styles.activeTab]}*/}
        {/*  onPress={() => setActiveTab('counter')}*/}
        {/*>*/}
        {/*  Counter*/}
        {/*</Text>*/}
        <Text
          style={[styles.tab, activeTab === 'todo' && styles.activeTab]}
          onPress={() => setActiveTab('todo')}
        >
          Todo List
        </Text>
        {/*<Text*/}
        {/*  style={[styles.tab, activeTab === 'search' && styles.activeTab]}*/}
        {/*  onPress={() => setActiveTab('search')}*/}
        {/*>*/}
        {/*  Search*/}
        {/*</Text>*/}
      </View>

      <View style={styles.content}>
        {activeTab === 'counter' && (
          <Counter
            initialValue={0}
            step={1}
            minValue={0}
            maxValue={100}
          />
        )}
        {activeTab === 'todo' && <TodoList />}
        {activeTab === 'search' && (
          <SearchFilter
            items={sampleItems}
            placeholder="Search for food..."
            onItemSelect={(item) => console.log('Selected:', item.name)}
          />
        )}
      </View>
    </SafeAreaView>
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
    backgroundColor: '#007AFF',
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
    color: '#007AFF',
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  content: {
    flex: 1,
  },
});
