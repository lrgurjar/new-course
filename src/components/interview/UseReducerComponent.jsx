import React, { useReducer, useState } from 'react'

const initialState = {
    count: 0, step: 1
};
function counterReducer(state, action) {
    switch (action.type) {
        case "increment":
            return { ...state, count: state.count + state.step };
        case "decrement":
            return { ...state, count: state.count - state.step };
        case "setStep":
            return { ...state, step: Number(action.payload) };
        case 'reset':
            return initialState;
        default:
            throw new Error("Unknown action type");
    }
}

export default function UseReducerComponent() {
    const [state, dispatch] = useReducer(counterReducer, initialState);
    return (
        <div>UseReducerComponent
            <h3>Counter with useReducer</h3>
            {state.count}
            <input
                type="number"
                value={state.step}
                onChange={(e) =>
                    dispatch({ type: "setStep", payload: e.target.value })
                }
            />
            <button onClick={() => dispatch({ type: "decrement" })}>decrement</button>
            <button onClick={() => dispatch({ type: "increment" })}>increment</button>
            <button onClick={() => dispatch({ type: "reset" })}>reset</button>
        </div>
    )
}


