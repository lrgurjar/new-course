import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'


const AccordionContext = createContext("");

function useAccordion() {
    const context = useContext(AccordionContext);

    if (!context) {
        throw new Error('Accordion sub-components must be rendered within an <Accordion> provider');
    }
    return context;
}

export function Accordion({ children, defaultIndex = null }) {
    const [activeIndex, setActiveIndex] = useState(defaultIndex);

    //toggle index for 
    const toggleIndex = useCallback((index) => {
        setActiveIndex(prevIndex => prevIndex === index ? null : index);
    }, []);

    const value = useMemo(() => {
        return { activeIndex, toggleIndex }
    }, [activeIndex, toggleIndex])

    return (
        <AccordionContext.Provider value={value}>
            <div className="accordion-wrapper">{children}</div>
        </AccordionContext.Provider>
    );

}

export function AccordionItem({ index, children }) {
    return <div className="accordion-item" data-index={index}>{children}</div>;
}


export function AccordionHeader({ index, children }) {
    const { toggleIndex } = useAccordion();
    return (
        <button className="accordion-header" onClick={() => toggleIndex(index)}>
            {children}
        </button>
    );
}

// Conditional Panel Content
export function AccordionPanel({ index, children }) {
    const { activeIndex } = useAccordion();
    const isOpen = activeIndex === index;

    if (!isOpen) return null;
    return <div className="accordion-panel">{children}</div>;
}

Accordion.Item = AccordionItem;
Accordion.Header = AccordionHeader;
Accordion.Panel = AccordionPanel;

export default Accordion;

