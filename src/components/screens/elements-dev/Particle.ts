class Particle {
  gravity = 0.05;
  friction = 0.99;
  x: number;
  y: number;
  radius: number;
  color: string;
  velocity: { x: number; y: number };
  opacity: number;

  constructor(
    x: number,
    y: number,
    radius: number,
    color: string,
    velocity: { x: number; y: number }
  ) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = {
      x: velocity.x,
      y: velocity.y,
    };
    this.opacity = 1;
  }

  draw(c: CanvasRenderingContext2D) {
    c.save();
    c.globalAlpha = this.opacity;
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
    c.restore();
  }

  update(c: CanvasRenderingContext2D) {
    this.draw(c);
    this.velocity.x *= this.friction;
    this.velocity.y *= this.friction;
    this.velocity.y += this.gravity;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.opacity -= 0.001;
  }
}

export default Particle;
