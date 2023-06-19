import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useRef, useState } from 'react'
import {
  FlatList,
  StatusBar as NativeStatusBar,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { ListItem } from './components/ListItem'
import { useTodosStore } from './store/todosStore'

export default function App() {
  console.dir(StatusBar)
  const { todos, fetchTodos, addTodo } = useTodosStore()
  const [text, setText] = useState('')
  const listRef = useRef<FlatList>(null)

  const handleSubmit: TextInputProps['onSubmitEditing'] = ({ nativeEvent }) => {
    if (!text.trim()) return
    addTodo({ id: Date.now(), title: nativeEvent.text, completed: false })
    setText('')
    listRef.current?.scrollToEnd()
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="auto" animated />
      <Text style={styles.h1}>
        {todos.length === 0 ? 'Add' : 'Complete'} your first TODO!
      </Text>
      <FlatList
        data={todos}
        style={{ marginBottom: 8 }}
        renderItem={({ item }) => <ListItem todoItem={item} />}
        ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
        removeClippedSubviews={false}
        ref={listRef}
      />
      <TextInput
        style={styles.input}
        onChangeText={setText}
        onSubmitEditing={handleSubmit}
        value={text}
        placeholder="Enter your TODO here"
        blurOnSubmit={false}
      />
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    paddingTop: NativeStatusBar.currentHeight,
  },
  h1: {
    fontSize: 32,
    fontWeight: '700',
  },
  input: {
    padding: 4,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 4,
  },
})
