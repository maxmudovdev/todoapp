import { useState } from 'react'

import React, { useReducer } from 'react';
import TodoList from './TodoList';

const initialState = {
  todos: [],
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return { todos: [...state.todos, action.payload] };
    case 'TOGGLE_TODO':
      return {
        todos: state.todos.map((todo) =>
          todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    case 'REMOVE_TODO':
      return { todos: state.todos.filter((todo) => todo.id !== action.payload) };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const addTodo = (text) => {
    dispatch({ type: 'ADD_TODO', payload: { id: Date.now(), text, completed: false } });
  };

  return (
    <>
    <div>
   <h2 className="text-5xl font-extrabold dark:text-white">TO DO APP </h2>
      <TodoList todos={state.todos} dispatch={dispatch} />
      <input
        type="text"
        placeholder="Add a new todo"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            addTodo(e.target.value);
            e.target.value = '';
          }
        }}
      />
    </div>
    </>
  );
};

export default App;
