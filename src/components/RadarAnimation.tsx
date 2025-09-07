import { useEffect, useRef } from "react";

interface RadarAnimationProps {
  size?: number;
  className?: string;
}

export const RadarAnimation = ({ size = 300, className = "" }: RadarAnimationProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2 - 20;
    let angle = 0;
    
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, size, size);
      
      // Draw radar circles
      ctx.strokeStyle = 'rgba(0, 255, 0, 0.3)';
      ctx.lineWidth = 1;
      for (let i = 1; i <= 4; i++) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, (radius / 4) * i, 0, Math.PI * 2);
        ctx.stroke();
      }
      
      // Draw crosshairs
      ctx.beginPath();
      ctx.moveTo(centerX, 20);
      ctx.lineTo(centerX, size - 20);
      ctx.moveTo(20, centerY);
      ctx.lineTo(size - 20, centerY);
      ctx.stroke();
      
      // Draw sweep line
      const sweepX = centerX + Math.cos(angle) * radius;
      const sweepY = centerY + Math.sin(angle) * radius;
      
      // Create gradient for sweep
      const gradient = ctx.createLinearGradient(centerX, centerY, sweepX, sweepY);
      gradient.addColorStop(0, 'rgba(0, 255, 0, 0.8)');
      gradient.addColorStop(0.7, 'rgba(0, 255, 0, 0.4)');
      gradient.addColorStop(1, 'rgba(0, 255, 0, 0)');
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(sweepX, sweepY);
      ctx.stroke();
      
      // Add some random detection dots
      if (Math.random() < 0.1) {
        ctx.fillStyle = 'rgba(0, 255, 0, 0.8)';
        const dotX = centerX + (Math.random() - 0.5) * radius * 1.5;
        const dotY = centerY + (Math.random() - 0.5) * radius * 1.5;
        ctx.beginPath();
        ctx.arc(dotX, dotY, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      
      angle += 0.02;
      requestAnimationFrame(animate);
    };
    
    animate();
  }, [size]);
  
  return (
    <canvas 
      ref={canvasRef}
      width={size}
      height={size}
      className={`${className}`}
    />
  );
};