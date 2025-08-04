"use client";

import React, { JSX, useState, useEffect } from "react";
import { Heading, Flex, IconButton, useToast } from "@once-ui-system/core";

import styles from "@/components/HeadingLink.module.scss";

interface HeadingLinkProps {
  id: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const HeadingLink: React.FC<HeadingLinkProps> = ({ id, level, children, style }) => {
  const { addToast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const copyURL = async (id: string) => {
    if (!isClient || typeof window === 'undefined') return;
    
    try {
      const url = `${window.location.origin}${window.location.pathname}#${id}`;
      
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
        addToast({
          variant: "success",
          message: "Link copied to clipboard.",
        });
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = url;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (successful) {
          addToast({
            variant: "success",
            message: "Link copied to clipboard.",
          });
        } else {
          throw new Error('Copy failed');
        }
      }
    } catch (error) {
      addToast({
        variant: "danger",
        message: "Failed to copy link.",
      });
    }
  };

  const handleHeadingClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isClient) {
      // Scroll to the heading
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
        
        // Update URL
        if (window.history && window.history.pushState) {
          const newUrl = `${window.location.pathname}${window.location.search}#${id}`;
          window.history.pushState({ id }, '', newUrl);
        }
      }
    }
  };

  const handleButtonClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isClient) {
      copyURL(id);
    }
  };

  const variantMap = {
    1: "display-strong-xs",
    2: "heading-strong-xl",
    3: "heading-strong-l",
    4: "heading-strong-m",
    5: "heading-strong-s",
    6: "heading-strong-xs",
  } as const;

  const variant = variantMap[level];
  const asTag = `h${level}` as keyof JSX.IntrinsicElements;

  if (!isClient) {
    return (
      <div suppressHydrationWarning>
        <Heading id={id} variant={variant} as={asTag}>
          {children}
        </Heading>
      </div>
    );
  }

  return (
    <Flex
      suppressHydrationWarning
      style={style}
      className={styles.control}
      vertical="center"
      gap="4"
      data-heading-link="true"
    >
      <Heading 
        className={styles.text} 
        id={id} 
        variant={variant} 
        as={asTag}
        onClick={handleHeadingClick}
        style={{ cursor: 'pointer' }}
      >
        {children}
      </Heading>
      <IconButton
        className={styles.visibility}
        size="s"
        icon="openLink"
        variant="ghost"
        tooltip="Copy"
        tooltipPosition="right"
        onClick={handleButtonClick}
      />
    </Flex>
  );
};
