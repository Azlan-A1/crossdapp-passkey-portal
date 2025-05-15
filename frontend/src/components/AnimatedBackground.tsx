'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const AnimatedBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [satellites, setSatellites] = useState<Array<{ x: number; y: number }>>([]);
  const [stars, setStars] = useState<Array<{ x: number; y: number; opacity: number }>>([]);

  useEffect(() => {
    // Initialize dimensions
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // Initialize satellites
    setSatellites(
      Array(5).fill(null).map(() => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      }))
    );

    // Initialize stars
    setStars(
      Array(50).fill(null).map(() => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        opacity: Math.random() * 0.5 + 0.5,
      }))
    );

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900" />

      {/* Animated Orbits */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20 + i * 10,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: `${(i + 1) * 200}px`,
              height: `${(i + 1) * 200}px`,
              border: '1px solid rgba(139, 92, 246, 0.1)',
              borderRadius: '50%',
            }}
          />
        </motion.div>
      ))}

      {/* Floating Satellites */}
      {satellites.map((satellite, i) => (
        <motion.div
          key={`satellite-${i}`}
          className="absolute"
          initial={satellite}
          animate={{
            x: [
              Math.random() * dimensions.width,
              Math.random() * dimensions.width,
              Math.random() * dimensions.width,
            ],
            y: [
              Math.random() * dimensions.height,
              Math.random() * dimensions.height,
              Math.random() * dimensions.height,
            ],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="w-2 h-2 bg-purple-500 rounded-full blur-[1px]" />
        </motion.div>
      ))}

      {/* Interactive Gradient Overlay */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(139, 92, 246, 0.15), transparent 50%)`,
        }}
      />

      {/* Stars */}
      {stars.map((star, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full"
          initial={star}
          animate={{
            opacity: [
              Math.random() * 0.5 + 0.5,
              Math.random() * 0.5 + 0.5,
              Math.random() * 0.5 + 0.5,
            ],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground; 