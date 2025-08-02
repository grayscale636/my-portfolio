'use client';

import React, { useState, useEffect } from 'react';

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
  const [isClientMounted, setIsClientMounted] = useState(false);

  useEffect(() => {
    setIsClientMounted(true);
  }, []);

  if (BLOCKED_PAGES[pageName]) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="mb-8">
            <div className="text-6xl mb-6">🚧</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Page Under Maintenance</h1>
            <p className="text-gray-600 text-lg mb-8">This page is temporarily unavailable.</p>
          </div>
          
          <a 
            href="/about" 
            className={`inline-block px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-full focus:outline-none ${
              isClientMounted 
                ? 'hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:ring-4 focus:ring-blue-300' 
                : ''
            }`}
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }
  
  return <>{children}</>;
}
