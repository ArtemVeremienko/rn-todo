import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export interface Todo {
  id: number
  title: string
  completed: boolean
}

interface TodosState {
  todos: Todo[]
  addTodo(newTodo: Todo): void
  removeTodo(id: number): void
  checkTodo(id: number): void
  fetchTodos(): void
}

export const useTodosStore = create(
  devtools<TodosState>((set, get) => ({
    todos: [],
    isLoading: false,
    addTodo: (newTodo) => set(({ todos }) => ({ todos: [...todos, newTodo] })),
    removeTodo: (id) =>
      set(({ todos }) => ({ todos: todos.filter((todo) => todo.id !== id) })),
    checkTodo: (id) =>
      set(({ todos }) => ({
        todos: todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ),
      })),
    fetchTodos: async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/todos?_limit=5'
        )
        const data: Todo[] = await response.json()
        set({ todos: data })
      } catch (error) {
        console.error(error)
      }
    },
  }))
)
