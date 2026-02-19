// ============================================
// NEXUS GAMES - Particle Flow Background
// ============================================

class Particle {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    
    this.x = options.x || Math.random() * canvas.width;
    this.y = options.y || Math.random() * canvas.height;
    this.size = options.size || Math.random() * 2 + 0.5;
    this.speedX = options.speedX || (Math.random() - 0.5) * 0.5;
    this.speedY = options.speedY || (Math.random() - 0.5) * 0.5;
    this.opacity = options.opacity || Math.random() * 0.5 + 0.2;
    this.color = options.color || this.getRandomColor();
    
    // For mouse interaction
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = Math.random() * 30 + 1;
  }
  
  getRandomColor() {
    const colors = [
      'rgba(0, 240, 255, ',  // Cyan
      'rgba(123, 44, 191, ', // Purple
      'rgba(157, 78, 221, ', // Light Purple
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  
  update(mouse) {
    // Mouse interaction
    if (mouse.x !== null && mouse.y !== null) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 150;
      
      if (distance < maxDistance) {
        const force = (maxDistance - distance) / maxDistance;
        const angle = Math.atan2(dy, dx);
        
        this.x -= Math.cos(angle) * force * 2;
        this.y -= Math.sin(angle) * force * 2;
      }
    }
    
    // Return to base position
    const returnSpeed = 0.02;
    this.x += (this.baseX - this.x) * returnSpeed;
    this.y += (this.baseY - this.y) * returnSpeed;
    
    // Add base movement
    this.baseX += this.speedX;
    this.baseY += this.speedY;
    
    // Wrap around edges
    if (this.baseX < 0) this.baseX = this.canvas.width;
    if (this.baseX > this.canvas.width) this.baseX = 0;
    if (this.baseY < 0) this.baseY = this.canvas.height;
    if (this.baseY > this.canvas.height) this.baseY = 0;
  }
  
  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.fillStyle = this.color + this.opacity + ')';
    this.ctx.fill();
  }
}

class ParticleSystem {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: null, y: null };
    this.animationId = null;
    
    this.init();
  }
  
  init() {
    this.resize();
    this.createParticles();
    this.bindEvents();
    this.animate();
  }
  
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    
    // Adjust particle count based on screen size
    const particleCount = Math.min(
      Math.floor((this.canvas.width * this.canvas.height) / 15000),
      150
    );
    
    // Recreate particles on resize
    if (this.particles.length > 0) {
      this.particles = [];
      for (let i = 0; i < particleCount; i++) {
        this.particles.push(new Particle(this.canvas));
      }
    }
  }
  
  createParticles() {
    const particleCount = Math.min(
      Math.floor((this.canvas.width * this.canvas.height) / 15000),
      150
    );
    
    for (let i = 0; i < particleCount; i++) {
      this.particles.push(new Particle(this.canvas));
    }
  }
  
  bindEvents() {
    // Mouse move
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
    
    // Mouse leave
    window.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
    
    // Resize
    window.addEventListener('resize', () => {
      this.resize();
    });
    
    // Touch support
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        this.mouse.x = e.touches[0].clientX;
        this.mouse.y = e.touches[0].clientY;
      }
    });
    
    window.addEventListener('touchend', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
  }
  
  connectParticles() {
    const maxDistance = 120;
    
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance) {
          const opacity = (1 - distance / maxDistance) * 0.15;
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(0, 240, 255, ${opacity})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    }
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Update and draw particles
    this.particles.forEach(particle => {
      particle.update(this.mouse);
      particle.draw();
    });
    
    // Draw connections
    this.connectParticles();
    
    this.animationId = requestAnimationFrame(() => this.animate());
  }
  
  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

// Initialize
let particleSystem = null;

export function initParticles() {
  particleSystem = new ParticleSystem('particle-canvas');
}

export function destroyParticles() {
  if (particleSystem) {
    particleSystem.destroy();
  }
}