import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
    name: 'todo',
    initialState: { list: [] },
    reducers: {
        addTodo: (state, action) => {
            state.list.push(action.payload);
        },
        removeTodo: (state, action) => {
            state.list = state.list.filter((todo) => todo.id !== action.payload);
        },
        editTodo: (state, action) => {
            const { id, text } = action.payload;
            const todo = state.list.find((todo) => todo.id === id);

            if (todo) {
                todo.text = text;
            }
        },
        toggleTodo: (state, action) => {
            const todo = state.list.find((todo) => todo.id === action.payload);

            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        clearCompleted: (state) => {
            state.list = state.list.filter((todo) => !todo.completed);
        },
    },
});

export const {
    addTodo,
    removeTodo,
    editTodo,
    toggleTodo,
    clearCompleted,
} = todoSlice.actions;

export default todoSlice.reducer;