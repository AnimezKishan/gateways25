'use client';

import PageTransitionLoader from "@/components/PageTransitionLoader";
import { usePageTransition } from '@/hooks/usePageTransition';

export default function PageTransitionWrapper() {
  const { transitionLoaderRef } = usePageTransition();
  
  return (
    <PageTransitionLoader 
      ref={transitionLoaderRef}
      onComplete={() => {
        console.log('Page transition completed');
      }}
    />
  );
}
