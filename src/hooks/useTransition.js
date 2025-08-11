'use client';

import { createContext, useContext, useState } from 'react';

const TransitionContext = createContext();

export function TransitionProvider({ children }) {
    const [isTransitioning, setIsTransitioning] = useState(false);

    const startTransition = () => {
        setIsTransitioning(true);
    };

    const endTransition = () => {
        setIsTransitioning(false);
    };

    return (
        <TransitionContext.Provider value={{ 
            isTransitioning, 
            startTransition, 
            endTransition 
        }}>
            {children}
        </TransitionContext.Provider>
    );
}

export function useTransition() {
    const context = useContext(TransitionContext);
    if (!context) {
        throw new Error('useTransition must be used within a TransitionProvider');
    }
    return context;
}
