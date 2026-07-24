import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    list: [],
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
};

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        // Fetch
        fetchTodosRequest(state) {
            state.status = 'loading';
            state.error = null;
        },
        fetchTodosSuccess(state, action) {
            state.status = 'succeeded';
            state.list = action.payload;
        },
        fetchTodosFailure(state, action) {
            state.status = 'failed';
            state.error = action.payload || 'Failed to load todos';
        },

        // Add
        addTodoRequest(state) {
            state.status = 'loading';
            state.error = null;
        },
        addTodoSuccess(state, action) {
            state.status = 'succeeded';
            state.list.push(action.payload);
        },
        addTodoFailure(state, action) {
            state.status = 'failed';
            state.error = action.payload || 'Failed to add todo';
        },

        // Edit
        editTodoRequest(state) {
            state.status = 'loading';
            state.error = null;
        },
        editTodoSuccess(state, action) {
            state.status = 'succeeded';
            const { id, text } = action.payload;
            const item = state.list.find((t) => t.id === id);
            if (item) item.text = text;
        },
        editTodoFailure(state, action) {
            state.status = 'failed';
            state.error = action.payload || 'Failed to edit todo';
        },

        // Toggle
        toggleTodoRequest(state) {
            state.status = 'loading';
            state.error = null;
        },
        toggleTodoSuccess(state, action) {
            state.status = 'succeeded';
            const { id, completed } = action.payload;
            const item = state.list.find((t) => t.id === id);
            if (item) item.completed = completed;
        },
        toggleTodoFailure(state, action) {
            state.status = 'failed';
            state.error = action.payload || 'Failed to toggle todo';
        },

        // Remove
        removeTodoRequest(state) {
            state.status = 'loading';
            state.error = null;
        },
        removeTodoSuccess(state, action) {
            state.status = 'succeeded';
            state.list = state.list.filter((t) => t.id !== action.payload);
        },
        removeTodoFailure(state, action) {
            state.status = 'failed';
            state.error = action.payload || 'Failed to remove todo';
        },

        // Clear Completed
        clearCompletedRequest(state) {
            state.status = 'loading';
            state.error = null;
        },
        clearCompletedSuccess(state, action) {
            state.status = 'succeeded';
            const removedIds = new Set(action.payload);
            state.list = state.list.filter((t) => !removedIds.has(t.id));
        },
        clearCompletedFailure(state, action) {
            state.status = 'failed';
            state.error = action.payload || 'Failed to clear completed todos';
        },
    },
});

export const {
    fetchTodosRequest,
    fetchTodosSuccess,
    fetchTodosFailure,
    addTodoRequest,
    addTodoSuccess,
    addTodoFailure,
    editTodoRequest,
    editTodoSuccess,
    editTodoFailure,
    toggleTodoRequest,
    toggleTodoSuccess,
    toggleTodoFailure,
    removeTodoRequest,
    removeTodoSuccess,
    removeTodoFailure,
    clearCompletedRequest,
    clearCompletedSuccess,
    clearCompletedFailure,
} = todoSlice.actions;

export default todoSlice.reducer;