import React, { useEffect, useRef } from 'react';

export const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Create subtle floating particles (dust / golden embers)
    const particleCount = Math.min(Math.floor((width * height) / 22000), 55);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.6,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -Math.random() * 0.35 - 0.1, // gently float upward
      alpha: Math.random() * 0.45 + 0.15,
      fadeSpeed: (Math.random() * 0.006 + 0.003) * (Math.random() > 0.5 ? 1 : -1),
      hue: Math.random() > 0.4 ? 43 : 215, // warm gold (43) or subtle midnight blue (215)
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around bounds softly
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Twinkle effect
        p.alpha += p.fadeSpeed;
        if (p.alpha > 0.65 || p.alpha < 0.12) {
          p.fadeSpeed = -p.fadeSpeed;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        if (p.hue === 43) {
          ctx.fillStyle = `rgba(251, 191, 36, ${Math.max(0, p.alpha)})`; // golden ember
        } else {
          ctx.fillStyle = `rgba(186, 230, 253, ${Math.max(0, p.alpha * 0.8)})`; // soft moonbeam
        }
        ctx.shadowBlur = p.radius * 4;
        ctx.shadowColor = p.hue === 43 ? 'rgba(245, 158, 11, 0.4)' : 'rgba(147, 197, 253, 0.3)';
        ctx.fill();
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
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.85 }}
    />
  );
};
