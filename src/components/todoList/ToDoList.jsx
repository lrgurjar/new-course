import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    fetchTodosRequest,
    addTodoRequest,
    editTodoRequest,
    toggleTodoRequest,
    removeTodoRequest,
    clearCompletedRequest,
} from '../../store/todoSlice';


function ToDoList() {
    const dispatch = useDispatch();
    const { list: todoList, status, error } = useSelector((state) => state.todos);

    const [input, setInput] = useState('');
    const [editId, setEditId] = useState(null);
    const [editText, setEditText] = useState('');

    useEffect(() => {
        dispatch(fetchTodosRequest());
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        dispatch(addTodoRequest(input));
        setInput('');
    };

    const handleRemove = (id) => {
        dispatch(removeTodoRequest(id));
    };

    const handleEditClick = (todo) => {
        setEditId(todo.id);
        setEditText(todo.text);
    };

    const handleUpdate = (id) => {
        if (!editText.trim()) return;
        dispatch(editTodoRequest({ id, text: editText }));
        setEditId(null);
        setEditText('');
    };

    const handleCancelEdit = () => {
        setEditId(null);
        setEditText('');
    };

    const handleToggle = (todo) => {
        dispatch(toggleTodoRequest({ id: todo.id, completed: todo.completed }));
    };

    const handleClearCompleted = () => {
        dispatch(clearCompletedRequest());
    };

    const completedCount = todoList.filter((t) => t.completed).length;
    const isLoading = status === 'loading';

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h1>Redux Toolkit + Redux-Saga (JSONPlaceholder)</h1>

            <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter a task..."
                    disabled={isLoading}
                />
                <button type="submit" style={{ marginLeft: '10px' }} disabled={isLoading}>
                    Add Todo
                </button>
            </form>

            <div style={{ marginBottom: '20px' }}>
                <button onClick={handleClearCompleted} disabled={completedCount === 0 || isLoading}>
                    Clear Completed
                </button>
                <span style={{ marginLeft: '10px' }}>Completed: {completedCount}</span>
            </div>

            {isLoading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <ul style={{ paddingLeft: '20px' }}>
                {todoList.map((todo) => (
                    <li key={todo.id} style={{ marginBottom: '10px' }}>
                        {editId === todo.id ? (
                            <>
                                <input
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                />
                                <button
                                    onClick={() => handleUpdate(todo.id)}
                                    style={{ marginLeft: '10px' }}
                                >
                                    Save
                                </button>
                                <button
                                    onClick={handleCancelEdit}
                                    style={{ marginLeft: '10px' }}
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <span
                                    style={{
                                        textDecoration: todo.completed ? 'line-through' : 'none',
                                        marginRight: '10px',
                                    }}
                                >
                                    {todo.text}
                                </span>

                                <button onClick={() => handleToggle(todo)}>
                                    {todo.completed ? 'Undo' : 'Complete'}
                                </button>

                                <button
                                    onClick={() => handleEditClick(todo)}
                                    style={{ marginLeft: '10px' }}
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => handleRemove(todo.id)}
                                    style={{ marginLeft: '10px' }}
                                >
                                    Remove
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ToDoList;