// ============================================
// NEXUS GAMES - GSAP Animations
// ============================================

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// ============================================
// Scroll Animations
// ============================================
export function initAnimations() {
  // Hero animations
  initHeroAnimations();
  
  // Section animations
  initSectionAnimations();
  
  // Parallax effects
  initParallaxEffects();
  
  // Stagger animations
  initStaggerAnimations();
}

// ============================================
// Hero Animations
// ============================================
function initHeroAnimations() {
  const heroTimeline = gsap.timeline({ delay: 2.5 });
  
  heroTimeline
    .from('.hero-badge', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out'
    })
    .from('.hero-title .title-line', {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out'
    }, '-=0.4')
    .from('.hero-subtitle', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.6')
    .from('.hero-cta .btn', {
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power3.out'
    }, '-=0.4')
    .from('.hero-stats .stat-item', {
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out'
    }, '-=0.3')
    .from('.scroll-indicator', {
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.2');
}

// ============================================
// Section Animations
// ============================================
function initSectionAnimations() {
  // About section
  gsap.from('.about-content', {
    scrollTrigger: {
      trigger: '#about',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    x: -50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  });
  
  gsap.from('.about-visual', {
    scrollTrigger: {
      trigger: '#about',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    x: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  });
  
  // Portfolio section
  gsap.from('.portfolio-filter', {
    scrollTrigger: {
      trigger: '#portfolio',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  });
  
  // Tech section
  gsap.from('.tech-category', {
    scrollTrigger: {
      trigger: '#tech',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out'
  });
  
  // Careers section
  gsap.from('.careers-intro', {
    scrollTrigger: {
      trigger: '#careers',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    x: -30,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  });
  
  gsap.from('.vacancy-card', {
    scrollTrigger: {
      trigger: '.vacancies-list',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.15,
    ease: 'power3.out'
  });
  
  // Contact section
  gsap.from('.contact-info', {
    scrollTrigger: {
      trigger: '#contact',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    x: -30,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  });
  
  gsap.from('.contact-form', {
    scrollTrigger: {
      trigger: '#contact',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    x: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  });
}

// ============================================
// Parallax Effects
// ============================================
function initParallaxEffects() {
  // Hero background parallax
  gsap.to('.grid-overlay', {
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    },
    y: 100,
    ease: 'none'
  });
  
  gsap.to('.hex-pattern', {
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    },
    y: 150,
    ease: 'none'
  });
  
  // Section headers parallax
  document.querySelectorAll('.section-header').forEach(header => {
    gsap.from(header.querySelector('.section-tag'), {
      scrollTrigger: {
        trigger: header,
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      },
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out'
    });
    
    gsap.from(header.querySelector('.section-title'), {
      scrollTrigger: {
        trigger: header,
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: 0.1,
      ease: 'power3.out'
    });
  });
}

// ============================================
// Stagger Animations
// ============================================
function initStaggerAnimations() {
  // Stats grid
  gsap.from('.stat-box', {
    scrollTrigger: {
      trigger: '.stats-grid',
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    },
    scale: 0.8,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'back.out(1.5)'
  });
  
  // Tech items
  document.querySelectorAll('.tech-items').forEach(items => {
    gsap.from(items.querySelectorAll('.tech-item'), {
      scrollTrigger: {
        trigger: items,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.05,
      ease: 'power3.out'
    });
  });
  
  // Perks
  gsap.from('.perk-item', {
    scrollTrigger: {
      trigger: '.careers-perks',
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    },
    y: 20,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: 'power3.out'
  });
  
  // Social links
  gsap.from('.social-link', {
    scrollTrigger: {
      trigger: '.social-links',
      start: 'top 90%',
      toggleActions: 'play none none reverse'
    },
    scale: 0,
    opacity: 0,
    duration: 0.4,
    stagger: 0.1,
    ease: 'back.out(1.7)'
  });
}

// ============================================
// Button Hover Effects
// ============================================
export function initButtonEffects() {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
}

// ============================================
// Smooth Scroll
// ============================================
export function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      
      if (target) {
        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: target,
            offsetY: 80
          },
          ease: 'power3.inOut'
        });
      }
    });
  });
}

// ============================================
// Text Reveal Animation
// ============================================
export function createTextReveal(element) {
  const text = element.textContent;
  element.innerHTML = '';
  
  text.split('').forEach((char, i) => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.opacity = '0';
    span.style.display = 'inline-block';
    element.appendChild(span);
  });
  
  gsap.to(element.querySelectorAll('span'), {
    opacity: 1,
    duration: 0.05,
    stagger: 0.03,
    ease: 'power2.out'
  });
}

// ============================================
// Magnetic Effect
// ============================================
export function createMagneticEffect(element, strength = 0.3) {
  element.addEventListener('mousemove', (e) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(element, {
      x: x * strength,
      y: y * strength,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
  
  element.addEventListener('mouseleave', () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)'
    });
  });
}