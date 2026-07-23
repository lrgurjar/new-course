import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import "./allStyle.css"

export default function Modal({ isOpen, onClose, title, children }) {
    // Close modal when pressing the Escape key
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    // If the modal state is false, do not render anything
    if (!isOpen) return null;

    // Find the HTML target node
    const modalRoot = document.getElementById('modal-root');
    if (!modalRoot) return null;

    // Render the modal into the 'modal-root' container using a portal
    return createPortal(
        <div className="modal-overlay" onClick={onClose}>
            {/* stopPropagation prevents closing the modal when clicking inside it */}
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{title}</h2>
                    <button className="modal-close-btn" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>,
        modalRoot
    );
}