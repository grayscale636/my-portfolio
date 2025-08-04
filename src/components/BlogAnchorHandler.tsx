"use client";

import { useEffect } from 'react';

export function BlogAnchorHandler() {
  useEffect(() => {
    // Wait for DOM to be ready
    const setupAnchorHandling = () => {
      // Handle all anchor links and heading clicks
      const handleAnchorClicks = () => {
        // Find all anchor links that start with # and heading elements with IDs
        const elements = document.querySelectorAll('a[href^="#"], h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]');
        
        elements.forEach(element => {
          if (!element.hasAttribute('data-anchor-handled')) {
            element.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
              
              let targetId: string | null = null;
              
              // Get target ID from href or element's own ID
              if (element.tagName === 'A') {
                const href = element.getAttribute('href');
                if (href && href.startsWith('#')) {
                  targetId = href.substring(1);
                }
              } else {
                targetId = element.getAttribute('id');
              }
              
              if (targetId) {
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                  // Smooth scroll to target
                  targetElement.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                  
                  // Update URL without causing navigation
                  if (window.history && window.history.pushState) {
                    const newUrl = `${window.location.pathname}${window.location.search}#${targetId}`;
                    window.history.pushState({ id: targetId }, '', newUrl);
                  }
                }
              }
            });
            element.setAttribute('data-anchor-handled', 'true');
          }
        });
      };

      // Initial setup
      handleAnchorClicks();
      
      // Handle dynamically loaded content
      const observer = new MutationObserver(() => {
        // Small delay to ensure DOM updates are complete
        setTimeout(handleAnchorClicks, 100);
      });
      
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['id', 'href']
      });

      // Handle back/forward buttons
      const handlePopState = (event: PopStateEvent) => {
        if (event.state && event.state.id) {
          const targetElement = document.getElementById(event.state.id);
          if (targetElement) {
            targetElement.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }
        } else if (window.location.hash) {
          const targetId = window.location.hash.substring(1);
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      };

      window.addEventListener('popstate', handlePopState);

      // Handle initial hash in URL
      if (window.location.hash) {
        setTimeout(() => {
          const targetId = window.location.hash.substring(1);
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }
        }, 500);
      }

      return () => {
        observer.disconnect();
        window.removeEventListener('popstate', handlePopState);
      };
    };

    // Setup after a small delay to ensure all components are mounted
    const timeout = setTimeout(setupAnchorHandling, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return null;
}
