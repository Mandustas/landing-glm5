// ============================================
// NEXUS GAMES - Holographic Cards Effect
// ============================================

class HolographicCard {
  constructor(element) {
    this.element = element;
    this.bounds = null;
    this.mouse = { x: 0, y: 0 };
    this.center = { x: 0, y: 0 };
    
    this.init();
  }
  
  init() {
    this.bindEvents();
  }
  
  bindEvents() {
    this.element.addEventListener('mouseenter', () => this.onEnter());
    this.element.addEventListener('mousemove', (e) => this.onMove(e));
    this.element.addEventListener('mouseleave', () => this.onLeave());
    
    // Touch support
    this.element.addEventListener('touchstart', () => this.onEnter());
    this.element.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        this.onMove(e.touches[0]);
      }
    });
    this.element.addEventListener('touchend', () => this.onLeave());
  }
  
  onEnter() {
    this.bounds = this.element.getBoundingClientRect();
    this.center = {
      x: this.bounds.left + this.bounds.width / 2,
      y: this.bounds.top + this.bounds.height / 2
    };
    
    this.element.style.transition = 'none';
    this.element.classList.add('holographic-active');
  }
  
  onMove(e) {
    if (!this.bounds) return;
    
    this.mouse = {
      x: e.clientX,
      y: e.clientY
    };
    
    // Calculate rotation
    const rotateX = (this.mouse.y - this.center.y) / this.bounds.height * 20;
    const rotateY = (this.center.x - this.mouse.x) / this.bounds.width * 20;
    
    // Calculate gradient position
    const gradientX = ((this.mouse.x - this.bounds.left) / this.bounds.width) * 100;
    const gradientY = ((this.mouse.y - this.bounds.top) / this.bounds.height) * 100;
    
    // Apply transforms
    this.element.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale3d(1.02, 1.02, 1.02)
    `;
    
    // Update CSS variables for gradient
    this.element.style.setProperty('--mouse-x', `${gradientX}%`);
    this.element.style.setProperty('--mouse-y', `${gradientY}%`);
    
    // Holographic shine effect
    this.element.style.setProperty('--shine-opacity', '1');
  }
  
  onLeave() {
    this.element.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
    this.element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    this.element.style.setProperty('--shine-opacity', '0');
    this.element.classList.remove('holographic-active');
    
    this.bounds = null;
  }
}

// Holographic shine overlay
class HolographicShine {
  constructor(element) {
    this.element = element;
    this.overlay = null;
    
    this.init();
  }
  
  init() {
    // Create shine overlay
    this.overlay = document.createElement('div');
    this.overlay.className = 'holo-shine';
    this.overlay.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      background: linear-gradient(
        105deg,
        transparent 40%,
        rgba(0, 240, 255, 0.1) 45%,
        rgba(123, 44, 191, 0.2) 50%,
        rgba(0, 240, 255, 0.1) 55%,
        transparent 60%
      );
      background-size: 200% 200%;
      opacity: 0;
      transition: opacity 0.3s ease;
      border-radius: inherit;
      z-index: 1;
    `;
    
    // Make parent relative
    if (getComputedStyle(this.element).position === 'static') {
      this.element.style.position = 'relative';
    }
    
    this.element.appendChild(this.overlay);
    
    // Bind events
    this.element.addEventListener('mouseenter', () => {
      this.overlay.style.opacity = '1';
      this.animateShine();
    });
    
    this.element.addEventListener('mouseleave', () => {
      this.overlay.style.opacity = '0';
      this.stopShine();
    });
  }
  
  animateShine() {
    let position = 0;
    this.shineAnimation = setInterval(() => {
      position += 0.5;
      this.overlay.style.backgroundPosition = `${position}% ${position}%`;
    }, 16);
  }
  
  stopShine() {
    if (this.shineAnimation) {
      clearInterval(this.shineAnimation);
    }
  }
}

// 3D Tilt Effect for cards
class TiltEffect {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      maxTilt: options.maxTilt || 15,
      perspective: options.perspective || 1000,
      speed: options.speed || 300,
      glare: options.glare || true,
      maxGlare: options.maxGlare || 0.3,
      ...options
    };
    
    this.init();
  }
  
  init() {
    // Add glare element
    if (this.options.glare) {
      this.addGlare();
    }
    
    this.bindEvents();
  }
  
  addGlare() {
    this.glareElement = document.createElement('div');
    this.glareElement.className = 'tilt-glare';
    this.glareElement.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      background: linear-gradient(
        135deg,
        transparent 0%,
        rgba(255, 255, 255, 0.1) 50%,
        transparent 100%
      );
      opacity: 0;
      transition: opacity ${this.options.speed}ms ease;
      border-radius: inherit;
      z-index: 2;
    `;
    
    this.element.appendChild(this.glareElement);
  }
  
  bindEvents() {
    this.element.addEventListener('mouseenter', (e) => this.onEnter(e));
    this.element.addEventListener('mousemove', (e) => this.onMove(e));
    this.element.addEventListener('mouseleave', () => this.onLeave());
  }
  
  onEnter(e) {
    this.updateBounds();
    this.element.style.transition = 'none';
    if (this.glareElement) {
      this.glareElement.style.opacity = '1';
    }
  }
  
  onMove(e) {
    if (!this.bounds) this.updateBounds();
    
    const mouseX = e.clientX - this.bounds.left;
    const mouseY = e.clientY - this.bounds.top;
    
    const centerX = this.bounds.width / 2;
    const centerY = this.bounds.height / 2;
    
    const percentX = (mouseX - centerX) / centerX;
    const percentY = (mouseY - centerY) / centerY;
    
    const tiltX = -percentY * this.options.maxTilt;
    const tiltY = percentX * this.options.maxTilt;
    
    this.element.style.transform = `
      perspective(${this.options.perspective}px)
      rotateX(${tiltX}deg)
      rotateY(${tiltY}deg)
      scale3d(1.02, 1.02, 1.02)
    `;
    
    // Update glare position
    if (this.glareElement) {
      const glareAngle = Math.atan2(percentY, percentX) * (180 / Math.PI) + 90;
      const glareOpacity = Math.min(Math.sqrt(percentX * percentX + percentY * percentY) * this.options.maxGlare, this.options.maxGlare);
      
      this.glareElement.style.background = `linear-gradient(${glareAngle}deg, transparent 0%, rgba(255, 255, 255, ${glareOpacity}) 50%, transparent 100%)`;
    }
  }
  
  onLeave() {
    this.element.style.transition = `transform ${this.options.speed}ms ease`;
    this.element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    
    if (this.glareElement) {
      this.glareElement.style.opacity = '0';
    }
    
    this.bounds = null;
  }
  
  updateBounds() {
    this.bounds = this.element.getBoundingClientRect();
  }
}

// Initialize holographic cards
export function initHolographicCards() {
  const cards = document.querySelectorAll('.holographic');
  
  cards.forEach(card => {
    new HolographicCard(card);
    new HolographicShine(card);
  });
  
  // Initialize tilt effect on project cards
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    new TiltEffect(card, {
      maxTilt: 10,
      glare: true,
      maxGlare: 0.15
    });
  });
}

// Export classes
export { HolographicCard, HolographicShine, TiltEffect };