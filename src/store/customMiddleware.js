export const loggerAndModifierMiddleware = (store) => (next) => (action) => {
    // 1. Log incoming action
    console.log('Middleware Intercepted Action:', action);
    console.log('Current State Before Update:', store.getState());

    // 2. Conditionally modify action payloads
    if (action.type === 'todo/addTodo') {
        action.payload = {
            ...action.payload,
            text: `${action.payload.text} (Verified By Middleware)`,
        };
    }

    // 3. Send action to the next middleware or reducer
    const result = next(action);

    // 4. Log state after update
    console.log('Next State After Update:', store.getState());

    return result;
};
