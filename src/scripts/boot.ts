import { initSmoothScroll } from './smooth-scroll';
import { initCursor } from './cursor';
import { initReveal, initHeaderScrollState, initGreeting } from './animations';
import { playIntro } from './intro';
import { initHeroBackground, destroyHeroBackground } from './hero-bg';

function bootAll() {
  initSmoothScroll();
  initCursor();
  initReveal();
  initHeaderScrollState();
  initGreeting();
  initHeroBackground();
  // Intro runs last so Lenis exists to be paused/resumed
  playIntro();
}

// Run on initial load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootAll);
} else {
  bootAll();
}

// Re-run on Swup page changes
document.addEventListener('swup:contentReplaced', () => {
  initReveal();
  initHeaderScrollState();
  initGreeting();
  initCursor();
  destroyHeroBackground();
  initHeroBackground();
});
