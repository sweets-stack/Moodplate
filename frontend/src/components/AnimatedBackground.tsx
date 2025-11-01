// frontend/src/components/AnimatedBackground.tsx

import React, { useEffect, useState, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';

const AnimatedBackground: React.FC = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  // Removed 'time' state as it's no longer used for styling or rendering.
  // const [time, setTime] = useState(0); 
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = scrollHeight > 0 ? Math.min(scrollTop / scrollHeight, 1) : 0;
      setScrollPosition(scrollFraction);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    // Removed animationFrameId and animate function related to 'time' state
    // let animationFrameId: number;
    // const animate = () => {
    //   setTime(prev => prev + 0.005);
    //   animationFrameId = requestAnimationFrame(animate);
    // };
    // animationFrameId = requestAnimationFrame(animate);

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      // Ensure any potential animation frame is cancelled, though it's removed now.
      // cancelAnimationFrame(animationFrameId);
    };
  }, []); // Empty dependency array as there are no external dependencies for these effects

  const getBackgroundStyle = useCallback(() => {
    if (theme === 'light') {
      const baseHue = 152;
      const baseSaturation = 94;
      
      const startLightness = 100;
      const endLightness = 30;
      const lightness = startLightness - (startLightness - endLightness) * scrollPosition;
      
      const startSaturation = 0;
      const saturation = startSaturation + (baseSaturation - startSaturation) * scrollPosition;

      const lightVar1 = 15 * scrollPosition;
      const lightVar2 = -10 * scrollPosition;
      const satVar1 = 20 * scrollPosition;
      
      const baseBackgroundColor = `hsl(0, 0%, ${100 - 70 * scrollPosition}%)`;

      return {
        backgroundImage: `
          radial-gradient(
            circle at ${mousePosition.x}% ${mousePosition.y}%,
            hsl(${baseHue + 10}, ${saturation + satVar1}%, ${lightness + lightVar1}%) 0%,
            hsl(${baseHue}, ${saturation}%, ${lightness}%) 40%,
            hsl(${baseHue - 10}, ${saturation}%, ${lightness + lightVar2}%) 100%
          )
        `,
        backgroundColor: baseBackgroundColor,
        backgroundBlendMode: 'overlay',
        transition: 'background-image 0.3s linear, background-color 0.3s linear',
      };
    } else {
      return {
        backgroundColor: '#000000',
        transition: 'background-color 0.8s ease-out',
      };
    }
  }, [scrollPosition, mousePosition, theme]);

  return (
    <div
      className="fixed inset-0 w-full h-full -z-10"
      style={getBackgroundStyle()}
    />
  );
};

export default AnimatedBackground;