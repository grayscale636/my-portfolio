"use client";

import { ReactNode, Component, ReactElement } from "react";

interface HydrationSafeWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface HydrationErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class HydrationErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  HydrationErrorBoundaryState
> {
  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): HydrationErrorBoundaryState {
    // Only handle hydration errors or browser extension errors
    if (error.message.includes('hydration') || 
        error.message.includes('bis_skin_checked') ||
        error.message.includes('server HTML') ||
        error.message.includes('client properties')) {
      return { hasError: true, error };
    }
    // Re-throw other errors
    throw error;
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // Silent handling for hydration errors caused by browser extensions
    if (error.message.includes('bis_skin_checked')) {
      console.warn('Browser extension interference detected - suppressing hydration warning');
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }

    return this.props.children;
  }
}

export function HydrationSafeWrapper({ children, fallback }: HydrationSafeWrapperProps): ReactElement {
  return (
    <HydrationErrorBoundary fallback={fallback}>
      <div suppressHydrationWarning>
        {children}
      </div>
    </HydrationErrorBoundary>
  );
}
