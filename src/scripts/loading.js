// ============================================
// NEXUS GAMES - Loading Screen
// ============================================

class LoadingScreen {
  constructor() {
    this.loadingScreen = document.getElementById('loading-screen');
    this.loadingProgress = document.querySelector('.loading-progress');
    this.loadingPercent = document.querySelector('.loading-percent');
    this.terminalLines = document.querySelectorAll('.terminal-line');
    
    this.progress = 0;
    this.targetProgress = 100;
    this.isLoaded = false;
    
    this.init();
  }
  
  init() {
    this.animateProgress();
    this.simulateLoading();
  }
  
  simulateLoading() {
    // Simulate loading stages
    const stages = [
      { progress: 20, delay: 400 },
      { progress: 40, delay: 800 },
      { progress: 60, delay: 1200 },
      { progress: 80, delay: 1600 },
      { progress: 95, delay: 2000 },
      { progress: 100, delay: 2400 }
    ];
    
    stages.forEach(stage => {
      setTimeout(() => {
        this.targetProgress = stage.progress;
      }, stage.delay);
    });
  }
  
  animateProgress() {
    const animate = () => {
      if (this.progress < this.targetProgress) {
        this.progress += 1;
        this.updateUI();
      }
      
      if (this.progress >= 100 && !this.isLoaded) {
        this.complete();
      } else {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }
  
  updateUI() {
    if (this.loadingProgress) {
      this.loadingProgress.style.width = `${this.progress}%`;
    }
    
    if (this.loadingPercent) {
      this.loadingPercent.textContent = `${this.progress}%`;
    }
  }
  
  complete() {
    this.isLoaded = true;
    
    // Wait a moment before hiding
    setTimeout(() => {
      this.hideLoading();
    }, 500);
  }
  
  hideLoading() {
    if (this.loadingScreen) {
      this.loadingScreen.classList.add('loaded');
      
      // Remove from DOM after transition
      setTimeout(() => {
        this.loadingScreen.style.display = 'none';
      }, 500);
    }
    
    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('loadingComplete'));
  }
}

// Terminal typing effect
class TerminalTyping {
  constructor(element) {
    this.element = element;
    this.text = element.dataset.text || element.textContent;
    this.element.textContent = '';
    this.init();
  }
  
  init() {
    this.typeText();
  }
  
  typeText() {
    let index = 0;
    
    const type = () => {
      if (index < this.text.length) {
        this.element.textContent += this.text.charAt(index);
        index++;
        setTimeout(type, 30);
      }
    };
    
    type();
  }
}

// Progress bar with glow effect
class GlowingProgress {
  constructor(element) {
    this.element = element;
    this.init();
  }
  
  init() {
    // Add glow effect
    const glow = document.createElement('div');
    glow.className = 'progress-glow';
    glow.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background: linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.5), transparent);
      animation: progressGlow 2s ease-in-out infinite;
    `;
    
    this.element.style.position = 'relative';
    this.element.appendChild(glow);
  }
}

// Initialize loading screen
export function initLoading() {
  const loadingScreen = new LoadingScreen();
  
  // Initialize terminal typing effect on lines
  const terminalLines = document.querySelectorAll('.terminal-line');
  terminalLines.forEach((line, index) => {
    setTimeout(() => {
      line.style.opacity = '1';
    }, index * 400);
  });
  
  // Add CSS for progress glow animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes progressGlow {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(200%); }
    }
  `;
  document.head.appendChild(style);
}

// Export classes
export { LoadingScreen, TerminalTyping, GlowingProgress };