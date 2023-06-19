import React, { useEffect, useRef, useState } from 'react'
import { TouchableOpacity, View, Button, Text, StyleSheet } from 'react-native'
import { Todo, useTodosStore } from '../store/todosStore'
import { Swipeable, TextInput, RectButton } from 'react-native-gesture-handler'

interface ListItemProps {
  todoItem: Todo
}

export const ListItem = ({ todoItem }: ListItemProps) => {
  const { id, completed, title } = todoItem
  const { checkTodo, removeTodo } = useTodosStore()
  const [isEditable, setIsEditable] = useState(false)
  const inputRef = useRef<TextInput>(null)

  const handleSwipeLeftOpen = () => {
    setIsEditable(true)
    setTimeout(() => inputRef.current?.focus())
  }

  const handleSwipeRightOpen = () => {
    removeTodo(id)
  }

  return (
    <Swipeable
      renderRightActions={() => (
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor: 'red',
            },
          ]}
        >
          <Text style={styles.iconText}>✖</Text>
        </View>
      )}
      renderLeftActions={() => (
        <View style={[styles.iconContainer, { backgroundColor: 'orange' }]}>
          <RectButton>
            <Text>✏</Text>
          </RectButton>
        </View>
      )}
      onSwipeableOpen={(direction) =>
        direction === 'right' ? handleSwipeRightOpen() : handleSwipeLeftOpen()
      }
      overshootFriction={8}
    >
      <TouchableOpacity
        onPress={() => {
          checkTodo(id)
        }}
        activeOpacity={0.6}
      >
        <View
          style={[
            styles.listItem,
            { backgroundColor: completed ? 'darkmagenta' : 'magenta' },
          ]}
          pointerEvents="none"
        >
          <TextInput
            style={[
              styles.itemText,
              {
                textDecorationLine: completed ? 'line-through' : 'none',
              },
            ]}
            value={title}
            ref={inputRef}
            editable={isEditable}
          />
        </View>
      </TouchableOpacity>
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  itemText: {
    color: 'white',
    flex: 1,
  },
  iconContainer: {
    backgroundColor: 'red',
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 28,
    color: 'white',
    lineHeight: 28,
  },
})
