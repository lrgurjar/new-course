import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
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
} from './todoSlice';

const BASE_URL = 'https://jsonplaceholder.typicode.com/todos';

const mapApiTodo = (t) => ({
    id: t.id,
    text: t.title,
    completed: Boolean(t.completed),
});


function* fetchTodosWorker() {
    try {
        const { data } = yield call(axios.get, `${BASE_URL}?_limit=10`);
        const mapped = data.map(mapApiTodo);
        yield put(fetchTodosSuccess(mapped));
    }
    catch (err) {
        yield put(fetchTodosFailure(err.message || 'Failed to fetch todos'));
    }
}

function* addTodoWorker(action) {
    try {
        const text = action.payload;
        const payload = { userId: 1, title: text, completed: false };
        const { data } = yield call(axios.post, BASE_URL, payload);
        let newTodo = mapApiTodo(data);

        const existing = yield select((state) => state.todos.list);
        const ids = new Set(existing.map((t) => t.id));
        if (!newTodo.id || ids.has(newTodo.id)) {
            newTodo = { ...newTodo, id: Date.now() };
        }

        yield put(addTodoSuccess(newTodo));
    } catch (err) {
        yield put(addTodoFailure(err.message || 'Failed to add todo'));
    }
}


function* editTodoWorker(action) {
    try {
        const { id, text } = action.payload;
        const { data } = yield call(axios.patch, `${BASE_URL}/${id}`, { title: text });
        const updatedText = data?.title ?? text;
        yield put(editTodoSuccess({ id, text: updatedText }));
    } catch (err) {
        yield put(editTodoFailure(err.message || 'Failed to edit todo'));
    }
}

function* toggleTodoWorker(action) {
    try {
        const { id, completed } = action.payload;
        const { data } = yield call(axios.patch, `${BASE_URL}/${id}`, { completed: !completed });
        const updatedCompleted = typeof data?.completed === 'boolean' ? data.completed : !completed;
        yield put(toggleTodoSuccess({ id, completed: updatedCompleted }));
    } catch (err) {
        yield put(toggleTodoFailure(err.message || 'Failed to toggle todo'));
    }
}

function* removeTodoWorker(action) {
    try {
        const id = action.payload;
        yield call(axios.delete, `${BASE_URL}/${id}`);
        yield put(removeTodoSuccess(id));
    } catch (err) {
        yield put(removeTodoFailure(err.message || 'Failed to remove todo'));
    }
}

function* clearCompletedWorker() {
    try {
        const todos = yield select((state) => state.todos.list);
        const completed = todos.filter((t) => t.completed);
        yield all(completed.map((t) => call(axios.delete, `${BASE_URL}/${t.id}`)));
        const removedIds = completed.map((t) => t.id);
        yield put(clearCompletedSuccess(removedIds));
    } catch (err) {
        yield put(clearCompletedFailure(err.message || 'Failed to clear completed'));
    }
}

// Watchers
function* watchFetchTodos() {
    yield takeLatest(fetchTodosRequest.type, fetchTodosWorker);
}
function* watchAddTodo() {
    yield takeLatest(addTodoRequest.type, addTodoWorker);
}
function* watchEditTodo() {
    yield takeLatest(editTodoRequest.type, editTodoWorker);
}
function* watchToggleTodo() {
    yield takeLatest(toggleTodoRequest.type, toggleTodoWorker);
}
function* watchRemoveTodo() {
    yield takeLatest(removeTodoRequest.type, removeTodoWorker);
}
function* watchClearCompleted() {
    yield takeLatest(clearCompletedRequest.type, clearCompletedWorker);
}

export function* rootSaga() {
    yield all([
        watchFetchTodos(),
        watchAddTodo(),
        watchEditTodo(),
        watchToggleTodo(),
        watchRemoveTodo(),
        watchClearCompleted(),
    ]);
}