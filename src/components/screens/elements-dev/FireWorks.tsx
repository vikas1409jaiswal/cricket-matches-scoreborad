import React from "react";
import Particle from "./Particle";

interface FireWorksProps {}

export const FireWorks: React.FC<FireWorksProps> = ({}) => {
  const canvas = document.querySelector("canvas") as HTMLCanvasElement;

  const c = canvas?.getContext("2d") as CanvasRenderingContext2D;

  if (c) {
    canvas.width = window?.innerWidth;
    canvas.height = window?.innerHeight;
  }

  const mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  };

  window.addEventListener("resize", () => {
    if (c) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  });

  window.addEventListener("click", (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;

    const particleCount = 400;
    const power = 30;
    let radians = (Math.PI * 2) / particleCount;

    for (let i = 0; i < particleCount; i++) {
      particles.push(
        new Particle(
          mouse.x,
          mouse.y,
          3,
          `hsl(${Math.random() * 360}, 50%, 50%)`,
          {
            x: Math.cos(radians * i) * (Math.random() * power),
            y: Math.sin(radians * i) * (Math.random() * power),
          }
        )
      );
    }
  });

  let particles: Particle[];
  particles = [];

  // Animation Loop
  function animate() {
    requestAnimationFrame(animate);
    if (c) {
      c.fillStyle = "rgba(0,0,0,0.5)";
      c.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        if (particle.opacity > 0) {
          particle.update(c);
        } else {
          particles.splice(i, 1);
        }
      });
    } else {
      console.error("Could not find canvas");
    }
  }

  animate();
  return <canvas id="firework-canvas"></canvas>;
};
