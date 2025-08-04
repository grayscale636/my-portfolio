import '@once-ui-system/core/css/styles.css';
import '@once-ui-system/core/css/tokens.css';
import '@/resources/custom.css'

import classNames from "classnames";

import { Background, Column, Flex, Meta, opacity, SpacingToken } from "@once-ui-system/core";
import { Footer, Header, RouteGuard, Providers, Chatbot, GlobalHydrationHandler } from '@/components';
import { baseURL, effects, fonts, style, dataStyle, home } from '@/resources';

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Flex
      suppressHydrationWarning
      as="html"
      lang="en"
      fillWidth
      className={classNames(
        fonts.heading.variable,
        fonts.body.variable,
        fonts.label.variable,
        fonts.code.variable,
      )}
    >
      <head>
        <script
          suppressHydrationWarning
          id="extension-cleanup"
          dangerouslySetInnerHTML={{
            __html: `
              // Prevent browser extension interference with hydration
              (function() {
                // Override console methods ASAP
                const originalError = console.error;
                const originalWarn = console.warn;
                
                console.error = function(...args) {
                  const message = args[0]?.toString() || '';
                  if (message.includes('bis_') || 
                      message.includes('Hydration failed') ||
                      message.includes('server rendered HTML') ||
                      message.includes('client properties') ||
                      message.includes('browser extension') ||
                      message.includes('data-bis-') ||
                      message.includes('bis_use') ||
                      message.includes('bis_skin_checked')) {
                    return;
                  }
                  originalError.apply(console, args);
                };

                console.warn = function(...args) {
                  const message = args[0]?.toString() || '';
                  if (message.includes('bis_') || 
                      message.includes('hydration') ||
                      message.includes('data-bis-') ||
                      message.includes('browser extension')) {
                    return;
                  }
                  originalWarn.apply(console, args);
                };
                
                // Aggressive cleanup function
                function aggressiveCleanup() {
                  try {
                    // Remove all browser extension attributes
                    const selectors = [
                      '[bis_skin_checked]',
                      '[data-bitwarden-watching]', 
                      '[bis_use]',
                      '[data-bis-config]',
                      'script[src*="chrome-extension"]',
                      'script[src*="moz-extension"]',
                      'script[data-bis-config]'
                    ];
                    
                    selectors.forEach(selector => {
                      try {
                        const elements = document.querySelectorAll(selector);
                        elements.forEach(el => {
                          if (el.tagName === 'SCRIPT' && el.src && el.src.includes('extension')) {
                            el.remove();
                          } else {
                            // Remove extension attributes
                            ['bis_skin_checked', 'data-bitwarden-watching', 'bis_use', 'data-bis-config'].forEach(attr => {
                              el.removeAttribute(attr);
                            });
                          }
                        });
                      } catch(e) {}
                    });
                  } catch (e) {}
                }
                
                // Run cleanup immediately
                aggressiveCleanup();
                
                // Run on DOM ready
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', aggressiveCleanup);
                } else {
                  aggressiveCleanup();
                }
                
                // Frequent cleanup
                setInterval(aggressiveCleanup, 200);
                
                // Watch for mutations
                try {
                  const observer = new MutationObserver(aggressiveCleanup);
                  observer.observe(document.documentElement, {
                    childList: true,
                    subtree: true,
                    attributes: true,
                    attributeFilter: ['bis_skin_checked', 'data-bitwarden-watching', 'bis_use', 'data-bis-config']
                  });
                } catch(e) {}
              })();
            `
          }}
        />
        <script
          suppressHydrationWarning
          id="theme-init"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const root = document.documentElement;
                  const defaultTheme = 'system';
                  
                  // Set defaults from config
                  const config = ${JSON.stringify({
                    brand: style.brand,
                    accent: style.accent,
                    neutral: style.neutral,
                    solid: style.solid,
                    'solid-style': style.solidStyle,
                    border: style.border,
                    surface: style.surface,
                    transition: style.transition,
                    scaling: style.scaling,
                    'viz-style': dataStyle.variant,
                  })};
                  
                  // Apply default values
                  Object.entries(config).forEach(([key, value]) => {
                    root.setAttribute('data-' + key, value);
                  });
                  
                  // Resolve theme
                  const resolveTheme = (themeValue) => {
                    if (!themeValue || themeValue === 'system') {
                      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                    }
                    return themeValue;
                  };
                  
                  // Apply saved theme
                  const savedTheme = localStorage.getItem('data-theme');
                  const resolvedTheme = resolveTheme(savedTheme);
                  root.setAttribute('data-theme', resolvedTheme);
                  
                  // Apply any saved style overrides
                  const styleKeys = Object.keys(config);
                  styleKeys.forEach(key => {
                    const value = localStorage.getItem('data-' + key);
                    if (value) {
                      root.setAttribute('data-' + key, value);
                    }
                  });
                } catch (e) {
                  console.error('Failed to initialize theme:', e);
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `,
          }}
        />
      </head>
      <Providers>
        <GlobalHydrationHandler />
        <Column 
          suppressHydrationWarning
          as="body" 
          background="page" 
          fillWidth 
          style={{minHeight: "100vh"}} 
          margin="0" 
          padding="0" 
          horizontal="center"
        >
          <Background
            position="fixed"
            mask={{
              x: effects.mask.x,
              y: effects.mask.y,
              radius: effects.mask.radius,
              cursor: effects.mask.cursor,
            }}
            gradient={{
              display: effects.gradient.display,
              opacity: effects.gradient.opacity as opacity,
              x: effects.gradient.x,
              y: effects.gradient.y,
              width: effects.gradient.width,
              height: effects.gradient.height,
              tilt: effects.gradient.tilt,
              colorStart: effects.gradient.colorStart,
              colorEnd: effects.gradient.colorEnd,
            }}
            dots={{
              display: effects.dots.display,
              opacity: effects.dots.opacity as opacity,
              size: effects.dots.size as SpacingToken,
              color: effects.dots.color,
            }}
            grid={{
              display: effects.grid.display,
              opacity: effects.grid.opacity as opacity,
              color: effects.grid.color,
              width: effects.grid.width,
              height: effects.grid.height,
            }}
            lines={{
              display: effects.lines.display,
              opacity: effects.lines.opacity as opacity,
              size: effects.lines.size as SpacingToken,
              thickness: effects.lines.thickness,
              angle: effects.lines.angle,
              color: effects.lines.color,
            }}
          />
          <Flex fillWidth minHeight="16"/>
            <Header />
            <Flex
              zIndex={0}
              fillWidth
              padding="l"
              horizontal="center"
              flex={1}
            >
              <Flex horizontal="center" fillWidth minHeight="0">
                <RouteGuard>
                  {children}
                </RouteGuard>
              </Flex>
            </Flex>
            <Footer/>
            <Chatbot />
          </Column>
        </Providers>
      </Flex>
  );
}
