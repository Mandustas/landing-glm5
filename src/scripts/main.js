// ============================================
// NEXUS GAMES - Main JavaScript
// ============================================

import { initParticles } from './particles.js';
import { initGlitchEffect } from './glitch.js';
import { initHolographicCards } from './holographic.js';
import { initAnimations } from './animations.js';
import { initLoading } from './loading.js';

// ============================================
// DOM Ready
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Initialize loading screen
  initLoading();
  
  // Initialize all modules
  initParticles();
  initGlitchEffect();
  initHolographicCards();
  initAnimations();
  
  // Initialize navigation
  initNavigation();
  
  // Initialize form
  initContactForm();
  
  // Initialize portfolio filter
  initPortfolioFilter();
  
  // Initialize counters
  initCounters();
});

// ============================================
// Navigation
// ============================================
function initNavigation() {
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Mobile menu toggle
  navToggle?.addEventListener('click', () => {
    nav.classList.toggle('open');
    document.body.classList.toggle('nav-open');
  });
  
  // Close menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      document.body.classList.remove('nav-open');
    });
  });
  
  // Scroll behavior
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class
    if (currentScroll > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ============================================
// Portfolio Filter
// ============================================
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filter = btn.dataset.filter;
      
      // Filter projects
      projectCards.forEach(card => {
        const categories = card.dataset.category.split(' ');
        
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.5s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// ============================================
// Counter Animation
// ============================================
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  
  const animateCounter = (counter) => {
    const target = parseInt(counter.dataset.target);
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();
    
    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(start + (target - start) * easeOutQuart);
      
      counter.textContent = current;
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };
    
    requestAnimationFrame(updateCounter);
  };
  
  // Intersection Observer for counters
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => observer.observe(counter));
}

// ============================================
// Contact Form
// ============================================
function initContactForm() {
  const form = document.getElementById('contact-form');
  
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = form.querySelector('.btn-submit');
    const originalText = submitBtn.querySelector('.btn-text').textContent;
    
    // Show loading state
    submitBtn.querySelector('.btn-text').textContent = 'Отправка...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Show success
    submitBtn.querySelector('.btn-text').textContent = 'Отправлено ✓';
    submitBtn.style.background = 'linear-gradient(135deg, #27ca40, #1a8a2d)';
    
    // Reset form
    setTimeout(() => {
      form.reset();
      submitBtn.querySelector('.btn-text').textContent = originalText;
      submitBtn.style.background = '';
      submitBtn.disabled = false;
    }, 3000);
  });
  
  // Input animations
  const inputs = document.querySelectorAll('.form-input');
  
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
      if (!input.value) {
        input.parentElement.classList.remove('focused');
      }
    });
  });
}

// ============================================
// Utility Functions
// ============================================
export function lerp(start, end, factor) {
  return start + (end - start) * factor;
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function mapRange(value, inMin, inMax, outMin, outMax) {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

export function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Add CSS animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);