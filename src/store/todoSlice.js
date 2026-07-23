import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com/todos';

const mapApiTodo = (todo) => ({
    id: todo.id,
    text: todo.title,
    completed: Boolean(todo.completed),
});

export const fetchTodos = createAsyncThunk('todo/fetchTodos', async () => {
    const response = await axios.get(`${BASE_URL}?_limit=10`);
    return response.data.map(mapApiTodo);
});

export const addTodoAsync = createAsyncThunk(
    'todo/addTodo',
    async (text, thunkAPI) => {
        const response = await axios.post(BASE_URL, {
            userId: 1,
            title: text,
            completed: false,
        });

        let newTodo = mapApiTodo(response.data);

        const state = thunkAPI.getState();
        const existingIds = new Set(
            (state.todos?.list ?? []).map((todo) => todo.id)
        );

        if (!newTodo.id || existingIds.has(newTodo.id)) {
            newTodo = {
                ...newTodo,
                id: Date.now(),
            };
        }

        return newTodo;
    }
);

export const editTodoAsync = createAsyncThunk(
    'todo/editTodo',
    async ({ id, text }) => {
        const response = await axios.patch(`${BASE_URL}/${id}`, {
            title: text,
        });

        return {
            id,
            text: response.data.title ?? text,
        };
    }
);

export const toggleTodoAsync = createAsyncThunk(
    'todo/toggleTodo',
    async ({ id, completed }) => {
        const response = await axios.patch(`${BASE_URL}/${id}`, {
            completed: !completed,
        });

        return {
            id,
            completed: response.data.completed ?? !completed,
        };
    }
);

export const removeTodoAsync = createAsyncThunk(
    'todo/removeTodo',
    async (id) => {
        await axios.delete(`${BASE_URL}/${id}`);
        return id;
    }
);

export const clearCompletedAsync = createAsyncThunk(
    'todo/clearCompleted',
    async (_, thunkAPI) => {
        const state = thunkAPI.getState();
        const completedTodos = (state.todos?.list ?? []).filter(
            (todo) => todo.completed
        );

        await Promise.all(
            completedTodos.map((todo) => axios.delete(`${BASE_URL}/${todo.id}`))
        );

        return completedTodos.map((todo) => todo.id);
    }
);

const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        list: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            .addCase(addTodoAsync.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            .addCase(addTodoAsync.rejected, (state, action) => {
                state.error = action.error.message;
            })

            .addCase(editTodoAsync.fulfilled, (state, action) => {
                const { id, text } = action.payload;
                const todo = state.list.find((todo) => todo.id === id);
                if (todo) {
                    todo.text = text;
                }
            })
            .addCase(editTodoAsync.rejected, (state, action) => {
                state.error = action.error.message;
            })

            .addCase(toggleTodoAsync.fulfilled, (state, action) => {
                const { id, completed } = action.payload;
                const todo = state.list.find((todo) => todo.id === id);
                if (todo) {
                    todo.completed = completed;
                }
            })
            .addCase(toggleTodoAsync.rejected, (state, action) => {
                state.error = action.error.message;
            })

            .addCase(removeTodoAsync.fulfilled, (state, action) => {
                state.list = state.list.filter((todo) => todo.id !== action.payload);
            })
            .addCase(removeTodoAsync.rejected, (state, action) => {
                state.error = action.error.message;
            })

            .addCase(clearCompletedAsync.fulfilled, (state, action) => {
                const removedIds = new Set(action.payload);
                state.list = state.list.filter((todo) => !removedIds.has(todo.id));
            })
            .addCase(clearCompletedAsync.rejected, (state, action) => {
                state.error = action.error.message;
            });
    },
});

export default todoSlice.reducer;