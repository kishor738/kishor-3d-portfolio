import { useEffect, useRef } from "react";

export default function LinkedParticles({ theme = "dark" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    let animationFrame;

    const mouse = {
      x: null,
      y: null,
    };

    const particleCount = width < 768 ? 18 : 32;

    const particles = [];

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;

        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 0.002 + 0.001;

        this.radius = Math.random() * 2 + 1;

        this.opacity = Math.random() * 0.4 + 0.2;
      }

      update() {
        this.angle += this.speed;

        this.x += Math.cos(this.angle) * 0.15;
        this.y += Math.sin(this.angle) * 0.15;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;

        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;

          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 180) {
            this.x -= dx * 0.0008;
            this.y -= dy * 0.0008;
          }
        }
      }

      draw() {
        ctx.beginPath();

        ctx.arc(
          this.x,
          this.y,
          this.radius,
          0,
          Math.PI * 2
        );

        ctx.fillStyle =
          theme === "light"
            ? `rgba(59,130,246,${this.opacity})`
            : `rgba(255,255,255,${this.opacity})`;

        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function drawConnections() {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;

          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            const opacity =
              (1 - distance / 120) * 0.06;

            ctx.beginPath();

            ctx.moveTo(
              particles[a].x,
              particles[a].y
            );

            ctx.lineTo(
              particles[b].x,
              particles[b].y
            );

            ctx.strokeStyle =
              theme === "light"
                ? `rgba(59,130,246,${opacity})`
                : `rgba(255,255,255,${opacity})`;

            ctx.lineWidth = 0.4;

            ctx.stroke();
          }
        }
      }
    }

    function drawMouseEffect() {
      if (
        mouse.x === null ||
        mouse.y === null
      )
        return;

      const gradient =
        ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          250
        );

      gradient.addColorStop(
        0,
        theme === "light"
          ? "rgba(59,130,246,.05)"
          : "rgba(139,92,246,.08)"
      );

      gradient.addColorStop(
        1,
        "transparent"
      );

      ctx.fillStyle = gradient;

      ctx.beginPath();

      ctx.arc(
        mouse.x,
        mouse.y,
        250,
        0,
        Math.PI * 2
      );

      ctx.fill();

      particles.forEach((particle) => {
        const dx = particle.x - mouse.x;
        const dy = particle.y - mouse.y;

        const distance = Math.sqrt(
          dx * dx + dy * dy
        );

        if (distance < 90) {
          const opacity =
            (1 - distance / 90) * 0.12;

          ctx.beginPath();

          ctx.moveTo(
            mouse.x,
            mouse.y
          );

          ctx.lineTo(
            particle.x,
            particle.y
          );

          ctx.strokeStyle =
            theme === "light"
              ? `rgba(59,130,246,${opacity})`
              : `rgba(168,85,247,${opacity})`;

          ctx.lineWidth = 0.5;

          ctx.stroke();
        }
      });
    }

    function animate() {
      ctx.clearRect(
        0,
        0,
        width,
        height
      );

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      drawConnections();
      drawMouseEffect();

      animationFrame =
        requestAnimationFrame(
          animate
        );
    }

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width;
      canvas.height = height;
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    window.addEventListener(
      "mouseleave",
      handleMouseLeave
    );

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      cancelAnimationFrame(
        animationFrame
      );

      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      window.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );

      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: -40,
        opacity: 0.5,
      }}
    />
  );
}
