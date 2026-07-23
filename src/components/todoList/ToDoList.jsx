import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    addTodo,
    removeTodo,
    editTodo,
    toggleTodo,
    clearCompleted,
} from '../../store/todoSlice';

function TodoList() {
    const [input, setInput] = useState('');
    const [editId, setEditId] = useState(null);
    const [editText, setEditText] = useState('');

    const dispatch = useDispatch();
    const todoList = useSelector((state) => state.todos.list);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        dispatch(
            addTodo({
                id: Date.now(),
                text: input,
                completed: false,
            })
        );

        setInput('');
    };

    const handleRemove = (id) => {
        dispatch(removeTodo(id));
    };

    const handleEditClick = (todo) => {
        setEditId(todo.id);
        setEditText(todo.text);
    };

    const handleUpdate = (id) => {
        if (!editText.trim()) return;

        dispatch(editTodo({ id, text: editText }));
        setEditId(null);
        setEditText('');
    };

    const handleCancelEdit = () => {
        setEditId(null);
        setEditText('');
    };

    const handleToggle = (id) => {
        dispatch(toggleTodo(id));
    };

    const handleClearCompleted = () => {
        dispatch(clearCompleted());
    };

    const completedCount = todoList.filter((todo) => todo.completed).length;

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h1>Redux Toolkit App with Middleware</h1>

            <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter a task..."
                />
                <button type="submit" style={{ marginLeft: '10px' }}>
                    Add Todo
                </button>
            </form>

            <div style={{ marginBottom: '20px' }}>
                <button onClick={handleClearCompleted} disabled={completedCount === 0}>
                    Clear Completed
                </button>
                <span style={{ marginLeft: '10px' }}>
                    Completed: {completedCount}
                </span>
            </div>

            <h3>Tasks Array:</h3>

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

                                <button onClick={() => handleToggle(todo.id)}>
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

export default TodoList;