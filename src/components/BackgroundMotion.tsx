import { useEffect, useRef } from 'react';

export default function BackgroundMotion() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Subtle drifting glowing tech dust / particles
    let t = 0;
    const orbs = Array.from({ length: 32 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.0 + 0.8,
      speedX: (Math.random() - 0.5) * 0.35,
      speedY: (Math.random() - 0.5) * 0.35,
      opacity: Math.random() * 0.45 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.008,
    }));

    const render = () => {
      t += 1;
      ctx.clearRect(0, 0, width, height);

      // Drifting green energy cyber particles (waves completely removed)
      orbs.forEach((orb) => {
        orb.x += orb.speedX;
        orb.y += orb.speedY;

        if (orb.x < -10) orb.x = width + 10;
        if (orb.x > width + 10) orb.x = -10;
        if (orb.y < -10) orb.y = height + 10;
        if (orb.y > height + 10) orb.y = -10;

        const currentOpacity =
          orb.opacity * (0.6 + 0.4 * Math.sin(t * orb.pulseSpeed));

        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 223, 130, ${currentOpacity.toFixed(3)})`;
        ctx.shadowColor = 'rgba(0, 223, 130, 0.5)';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="site-background-motion-canvas"
      aria-hidden="true"
    />
  );
}
