import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import { loggerAndModifierMiddleware } from './customMiddleware';
import { loadState, saveState } from './localStorage';

const preloadedState = loadState();

export const store = configureStore({
    reducer: {
        todos: todoReducer,
    },
    preloadedState,
    // Concatenate custom middleware to the standard RTK default array
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(loggerAndModifierMiddleware),
});

store.subscribe(() => {
    saveState({
        todos: store.getState().todos,
    });
});