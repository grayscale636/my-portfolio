"use client";

import { useEffect } from 'react';

export function GlobalHydrationHandler() {
  useEffect(() => {
    // Override the error console to suppress hydration warnings
    const originalError = console.error;
    const originalWarn = console.warn;

    console.error = (...args) => {
      const message = args[0]?.toString() || '';
      
      // Suppress these specific hydration errors
      if (
        message.includes('bis_') ||
        message.includes('Hydration failed') ||
        message.includes('server rendered HTML') ||
        message.includes('client properties') ||
        message.includes('browser extension') ||
        message.includes('data-bis-') ||
        message.includes('bis_use') ||
        message.includes('bis_skin_checked')
      ) {
        return; // Silent suppression
      }
      
      originalError.apply(console, args);
    };

    console.warn = (...args) => {
      const message = args[0]?.toString() || '';
      
      if (
        message.includes('bis_') ||
        message.includes('hydration') ||
        message.includes('browser extension') ||
        message.includes('data-bis-')
      ) {
        return; // Silent suppression
      }
      
      originalWarn.apply(console, args);
    };

    // Clean up browser extension attributes
    const cleanupExtensions = () => {
      try {
        const selectors = [
          '[bis_skin_checked]',
          '[data-bitwarden-watching]',
          '[bis_use]',
          '[data-bis-config]',
          'script[src*="chrome-extension"]',
          'script[src*="moz-extension"]'
        ];
        
        selectors.forEach(selector => {
          try {
            const elements = document.querySelectorAll(selector);
            elements.forEach((el) => {
              if (el.tagName === 'SCRIPT' && (el as HTMLScriptElement).src && (el as HTMLScriptElement).src.includes('extension')) {
                el.remove();
              } else {
                ['bis_skin_checked', 'data-bitwarden-watching', 'bis_use', 'data-bis-config'].forEach(attr => {
                  el.removeAttribute(attr);
                });
              }
            });
          } catch(e) {}
        });
      } catch (e) {
        // Silent fail
      }
    };

    // Fix heading link clicks by preventing hydration errors on interactions
    const fixHeadingLinks = () => {
      try {
        const headingLinks = document.querySelectorAll('[data-heading-link], .heading-link');
        headingLinks.forEach(link => {
          if (!link.hasAttribute('data-fixed')) {
            link.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
              
              // Get the target heading ID
              const href = link.getAttribute('href') || link.closest('a')?.getAttribute('href');
              if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                  targetElement.scrollIntoView({ behavior: 'smooth' });
                  // Update URL without causing navigation
                  if (window.history && window.history.pushState) {
                    window.history.pushState(null, '', href);
                  }
                }
              }
            });
            link.setAttribute('data-fixed', 'true');
          }
        });
      } catch(e) {}
    };

    // Initial cleanup
    cleanupExtensions();
    fixHeadingLinks();
    
    // Periodic cleanup and fixes
    const interval = setInterval(() => {
      cleanupExtensions();
      fixHeadingLinks();
    }, 500);

    // Observer for new elements
    const observer = new MutationObserver(() => {
      cleanupExtensions();
      fixHeadingLinks();
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['bis_skin_checked', 'data-bitwarden-watching', 'bis_use', 'data-bis-config']
    });

    // Cleanup on unmount
    return () => {
      clearInterval(interval);
      observer.disconnect();
      console.error = originalError;
      console.warn = originalWarn;
    };
  }, []);

  return null;
}
