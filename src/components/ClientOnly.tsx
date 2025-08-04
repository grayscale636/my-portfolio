"use client";

import React, { ReactNode, useEffect } from 'react';

interface ClientOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const [hasMounted, setHasMounted] = React.useState(false);

  useEffect(() => {
    // Cleanup browser extension attributes on mount
    const cleanupExtensions = () => {
      const elements = document.querySelectorAll('[bis_skin_checked], [data-bitwarden-watching]');
      elements.forEach((el) => {
        el.removeAttribute('bis_skin_checked');
        el.removeAttribute('data-bitwarden-watching');
      });
    };

    cleanupExtensions();
    setHasMounted(true);

    // Periodic cleanup
    const interval = setInterval(cleanupExtensions, 2000);
    return () => clearInterval(interval);
  }, []);

  if (!hasMounted) {
    return <>{fallback}</>;
  }

  return <div suppressHydrationWarning>{children}</div>;
}
