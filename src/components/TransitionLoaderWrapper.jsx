'use client';

import TransitionLoader from "@/components/TransitionLoader";
import { useTransition } from '@/hooks/useTransition';

export default function TransitionLoaderWrapper() {
  const { isTransitioning, endTransition } = useTransition();
  
  return (
    <TransitionLoader 
      isVisible={isTransitioning} 
      onComplete={endTransition}
    />
  );
}
