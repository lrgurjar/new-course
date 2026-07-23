import React, { useState, useCallback, memo, useMemo } from 'react';

const Parent = () => {
    const [count, setCount] = useState(0);
    const handleClick = useCallback(() => {
        console.log("usecallback runs");
        setCount((prev) => prev + 1);
    }, []);

    return <HeavyChild onClick={handleClick} />;
}

const HeavyChild = memo(({ onClick }) => {
    return <button onClick={onClick}>Click Me</button>;
});


const Parent2 = () => {
    const [count, setCount] = useState(0);

    const items = [
        { id: 1, name: "React", active: true },
        { id: 2, name: "Vue", active: false },
        { id: 3, name: "Angular", active: true }
    ];

    const handleSelect = useCallback((id) => {
        console.log("Selected", id);
    }, []);


    const filteredItems = useMemo(() => {
        return items.filter((item) => item.active);
    }, []);

    return (
        <>
            <button onClick={() => setCount(count + 1)}>Count: {count}</button>
            <ChildComp items={filteredItems} onSelect={handleSelect}></ChildComp>
        </>
    )
}
const ChildComp = React.memo(function Child({ items, onSelect }) {
    console.log("Child rendered");

    return (
        <ul>
            {items.map((item) => (
                <li key={item.id}>
                    <button onClick={() => onSelect(item.id)}>{item.name}</button>
                </li>
            ))}
        </ul>
    );
});

export default Parent2;
