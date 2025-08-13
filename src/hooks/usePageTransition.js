'use client';

import { createContext, useContext, useRef } from 'react';

const PageTransitionContext = createContext();

export function PageTransitionProvider({ children }) {
    const transitionLoaderRef = useRef(null);

    const startPageTransition = (callback) => {
        if (transitionLoaderRef.current) {
            // Show the transition loader
            transitionLoaderRef.current.show();
            
            
            setTimeout(() => {
                if (callback) {
                    callback();
                }
            }, 1000);
        }
    };

    return (
        <PageTransitionContext.Provider value={{ 
            transitionLoaderRef, 
            startPageTransition 
        }}>
            {children}
        </PageTransitionContext.Provider>
    );
}

export function usePageTransition() {
    const context = useContext(PageTransitionContext);
    if (!context) {
        throw new Error('usePageTransition must be used within a PageTransitionProvider');
    }
    return context;
}
