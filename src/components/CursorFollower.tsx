"use client";

import React, { useEffect, useState } from 'react';

export const CursorFollower: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trails, setTrails] = useState<Array<{ x: number; y: number; id: number; timestamp: number }>>([]);

  useEffect(() => {
    let trailId = 0;

    const updateCursor = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setPosition(newPosition);
      
      // Create smooth trail with more points
      const now = Date.now();
      const newTrail = { 
        x: e.clientX, 
        y: e.clientY, 
        id: trailId++, 
        timestamp: now 
      };
      
      setTrails(prev => {
        const filtered = prev.filter(trail => now - trail.timestamp < 500); // Keep trails for 500ms
        return [...filtered, newTrail].slice(-20); // Keep last 20 points
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => updateCursor(e));
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Trail lines */}
      {trails.map((trail, index) => {
        if (index === 0) return null;
        
        const prevTrail = trails[index - 1];
        const dx = trail.x - prevTrail.x;
        const dy = trail.y - prevTrail.y;
        const length = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;
        
        const opacity = (index / trails.length) * 0.8;
        const width = Math.max(1, length);
        
        return (
          <div
            key={trail.id}
            style={{
              position: 'fixed',
              left: prevTrail.x,
              top: prevTrail.y,
              width: `${width}px`,
              height: '2px',
              background: `linear-gradient(90deg, 
                rgba(255, 215, 0, ${opacity}), 
                rgba(255, 165, 0, ${opacity * 0.7})
              )`,
              transformOrigin: '0 50%',
              transform: `rotate(${angle}deg)`,
              pointerEvents: 'none',
              zIndex: 9998,
              borderRadius: '1px',
              boxShadow: `0 0 4px rgba(255, 215, 0, ${opacity * 0.5})`,
            }}
          />
        );
      })}
    </>
  );
};
