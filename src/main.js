import './input.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis Smooth Scrolling
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
});

// Update ScrollTrigger on scroll
lenis.on('scroll', ScrollTrigger.update);

// Feed Lenis' RAF into GSAP's ticker
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

// Disable GSAP lag smoothing to keep animations in sync with Lenis
gsap.ticker.lagSmoothing(0);

// Smooth scroll to anchor links using Lenis
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      lenis.scrollTo(targetElement, {
        offset: 0,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
  });
});

// Hero timeline animation on page load
const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

tl.from('.hero-eyebrow', { y: 20, opacity: 0, duration: 0.6 })
  .from('.hero-title', { y: 30, opacity: 0, duration: 0.8 }, '-=0.4')
  .from('.hero-desc', { y: 20, opacity: 0, duration: 0.7 }, '-=0.5')
  .from('.hero-cta', { y: 15, opacity: 0, duration: 0.6 }, '-=0.4')
  .from('.hero-image', { scale: 0.95, opacity: 0, duration: 1.0 }, '-=0.6');

// Welcome Section Text Trigger
gsap.from('.welcome-text', {
  x: -40,
  opacity: 0,
  duration: 0.8,
  scrollTrigger: {
    trigger: '#welcome',
    start: 'top 80%',
    toggleActions: 'play none none reverse'
  }
});

// Welcome Section Image Grid Stagger
const welcomeImgs = document.querySelectorAll('.welcome-grid div');
gsap.from(welcomeImgs, {
  y: 30,
  opacity: 0,
  duration: 0.6,
  stagger: 0.1,
  scrollTrigger: {
    trigger: '.welcome-grid',
    start: 'top 85%'
  }
});

// Sejarah Section Text Trigger
gsap.from('.sejarah-text', {
  x: -40,
  opacity: 0,
  duration: 0.8,
  scrollTrigger: {
    trigger: '#sejarah',
    start: 'top 80%'
  }
});

// Sejarah Section Image Trigger
gsap.from('.sejarah-image', {
  x: 40,
  opacity: 0,
  duration: 0.8,
  scrollTrigger: {
    trigger: '#sejarah',
    start: 'top 80%'
  }
});

// Get instructor cards
const instrukturCards = document.querySelectorAll('.instruktur-card');

// Interactive Instructor click feedback animation
instrukturCards.forEach((card) => {
  card.addEventListener('click', () => {
    // Play a quick, premium GSAP scale/bounce click feedback animation
    gsap.fromTo(card, 
      { scale: 1 }, 
      { 
        scale: 1.05, 
        duration: 0.3, 
        ease: 'back.out(2)',
        clearProps: 'scale' // clear inline style to let CSS hover handle state
      }
    );
  });
});

// RSVP Section Trigger
gsap.from('.rsvp-container', {
  y: 40,
  opacity: 0,
  duration: 0.8,
  scrollTrigger: {
    trigger: '#rsvp',
    start: 'top 85%'
  }
});
