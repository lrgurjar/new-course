import React from "react";
import { List } from "react-window";

function Row({ index, style }) {
    return <div style={style}>Item {index}</div>;
}

export default function Virtualization() {
    return (
        <List
            rowComponent={Row}
            rowCount={10000}
            rowHeight={30}
            rowProps={{}}
            style={{ height: 400, width: 300 }}
        />
    );
}
//rowComponent rowProps rowHeight style rowComponent