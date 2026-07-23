import { useState } from "react";

function LiftingParent{
    const [value, setValue] = useState("");
    return (
        <div>
            <SiblingA value={value} onChangeValue={setValue} />
            <SiblingB value={value} />
        </div>
    )
}

function SiblingA({ value, onChangeValue }) {
    return (
        <input
            value={value}
            onChange={(e) => onChangeValue(e.target.value)}
        />
    );
}

function SiblingB({ value }) {
    return <p>Current value: {value}</p>;
}