import { useCallback, useMemo, createContext, useContext, useState } from "react";

const TabsContext = createContext();

function useTabsContext() {
    const context = useContext(TabsContext);
    if (!context) {
        throw new Error('Tabs compound sub-components must be used within a <Tabs> parent.');
    }
    return context;
}

//parent wrapper component

export function Tabs({ children, defaultValue }) {
    const [activeTab, setActiveTab] = useState(defaultValue);
    //toggle index for 
    const toggleTab = useCallback((index) => {
        setActiveTab(prevIndex => prevIndex === index ? null : index);
    }, []);

    const value = useMemo(() => {
        return { activeTab, toggleTab }
    }, [activeTab, toggleTab]);

    return (
        <TabsContext.Provider value={value}>
            <div className="tabs-container">{children}</div>
        </TabsContext.Provider>
    );
}
// 3. Tab List Container (Semantic wrapper for accessibility)
function List({ children }) {
    return (
        <div role="tablist" style={{ display: 'flex', gap: '10px', borderBottom: '1px solid #ccc' }}>
            {children}
        </div>
    );
}

// 4. Individual Tab Clicker Component
function Tab({ value, children }) {
    const { activeTab, toggleTab } = useTabsContext();
    const isActive = activeTab === value;

    return (
        <button
            role="tab"
            aria-selected={isActive}
            onClick={() => toggleTab(value)}
            style={{
                padding: '10px 20px',
                cursor: 'pointer',
                border: 'none',
                background: 'none',
                borderBottom: isActive ? '2px solid blue' : '2px solid transparent',
                fontWeight: isActive ? 'bold' : 'normal',
                color: '#ffffff'
            }}
        >
            {children}
        </button>
    );
}

// 5. Individual Content Panel Component
function Panel({ value, children }) {
    const { activeTab } = useTabsContext();

    if (activeTab !== value) return null;

    return (
        <div role="tabpanel" style={{ padding: '20px 0' }}>
            {children}
        </div>
    )
}

Tabs.List = List;
Tabs.Tab = Tab;
Tabs.Panel = Panel;
