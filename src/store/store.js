import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { loggerAndModifierMiddleware } from './customMiddleware';
import todoReducer from './todoSlice';
import { rootSaga } from './todoSaga';

// import { loadState, saveState } from './localStorage';

// const preloadedState = loadState();
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        todos: todoReducer,
    },
    // preloadedState,
    // Concatenate custom middleware to the standard RTK default array
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware).concat(loggerAndModifierMiddleware),
});

// store.subscribe(() => {
//     saveState({
//         todos: store.getState().todos,
//     });
// });
sagaMiddleware.run(rootSaga);