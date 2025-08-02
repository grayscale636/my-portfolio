import React from 'react';

const BLOCKED_PAGES = {
  work: true,    // true = tutup, false = buka
  blog: true,
  gallery: true,
  home: true
};

interface PageGuardProps {
  children: React.ReactNode;
  pageName: 'work' | 'blog' | 'gallery' | 'home';
}

export default function PageGuard({ children, pageName }: PageGuardProps) {
  if (BLOCKED_PAGES[pageName]) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4">Page Under Maintenance</h1>
          <p>This page is temporarily unavailable.</p>
        </div>
      </div>
    );
  }
  
  return <>{children}</>;
}
