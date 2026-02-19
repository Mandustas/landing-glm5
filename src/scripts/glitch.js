// ============================================
// NEXUS GAMES - Glitch Text Effect
// ============================================

class GlitchEffect {
  constructor(element) {
    this.element = element;
    this.text = element.dataset.text || element.textContent;
    this.isHovering = false;
    this.glitchInterval = null;
    
    this.init();
  }
  
  init() {
    // Create wrapper for glitch layers
    this.element.style.position = 'relative';
    
    // Bind events
    this.element.addEventListener('mouseenter', () => this.startGlitch());
    this.element.addEventListener('mouseleave', () => this.stopGlitch());
    
    // Random glitch effect
    this.randomGlitch();
  }
  
  startGlitch() {
    this.isHovering = true;
    this.glitchInterval = setInterval(() => {
      this.applyGlitch();
    }, 50);
  }
  
  stopGlitch() {
    this.isHovering = false;
    if (this.glitchInterval) {
      clearInterval(this.glitchInterval);
      this.glitchInterval = null;
    }
  }
  
  applyGlitch() {
    const glitchChars = '!<>-_\\/[]{}—=+*^?#________';
    const iterations = Math.floor(Math.random() * 3) + 1;
    
    let newText = this.text;
    
    for (let i = 0; i < iterations; i++) {
      const randomIndex = Math.floor(Math.random() * newText.length);
      const randomChar = glitchChars[Math.floor(Math.random() * glitchChars.length)];
      newText = newText.substring(0, randomIndex) + randomChar + newText.substring(randomIndex + 1);
    }
    
    // Apply temporary glitch
    const originalText = this.element.textContent;
    this.element.setAttribute('data-glitching', 'true');
    
    setTimeout(() => {
      if (!this.isHovering) return;
      this.element.removeAttribute('data-glitching');
    }, 50);
  }
  
  randomGlitch() {
    // Random glitch every 5-15 seconds
    const randomDelay = Math.random() * 10000 + 5000;
    
    setTimeout(() => {
      if (!this.isHovering) {
        this.applyGlitch();
      }
      this.randomGlitch();
    }, randomDelay);
  }
}

// Advanced Glitch with CSS animations
class AdvancedGlitchEffect {
  constructor(element) {
    this.element = element;
    this.init();
  }
  
  init() {
    // Add glitch layers
    this.createGlitchLayers();
    
    // Mouse interaction
    this.element.addEventListener('mouseenter', () => {
      this.element.classList.add('glitch-active');
    });
    
    this.element.addEventListener('mouseleave', () => {
      this.element.classList.remove('glitch-active');
    });
  }
  
  createGlitchLayers() {
    // The CSS handles the pseudo-elements
    // This class just adds interactivity
  }
}

// Scanline effect
class ScanlineEffect {
  constructor(container) {
    this.container = container;
    this.init();
  }
  
  init() {
    // Create scanline overlay
    const scanline = document.createElement('div');
    scanline.className = 'scanline-overlay';
    scanline.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      background: repeating-linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.1) 0px,
        rgba(0, 0, 0, 0.1) 1px,
        transparent 1px,
        transparent 2px
      );
      opacity: 0.3;
      z-index: 10;
    `;
    
    this.container.appendChild(scanline);
  }
}

// Initialize glitch effects
export function initGlitchEffect() {
  // Initialize all glitch text elements
  const glitchElements = document.querySelectorAll('.glitch-text');
  
  glitchElements.forEach(element => {
    new AdvancedGlitchEffect(element);
  });
  
  // Add scanline effect to hero section (optional)
  // const hero = document.querySelector('.hero');
  // if (hero) {
  //   new ScanlineEffect(hero);
  // }
}

// Export classes for external use
export { GlitchEffect, AdvancedGlitchEffect, ScanlineEffect };