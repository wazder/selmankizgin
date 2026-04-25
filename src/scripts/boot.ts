import { initSmoothScroll } from './smooth-scroll';
import { initCursor } from './cursor';
import { initReveal, initHeaderScrollState, initGreeting } from './animations';
import { playIntro } from './intro';
import { initHomeMusic } from './home-music';
import { initHeroBackground, destroyHeroBackground } from './hero-bg';

function bootAll() {
  initSmoothScroll();
  initCursor();
  initReveal();
  initHeaderScrollState();
  initGreeting();
  initHeroBackground();
  initHomeMusic();
  // Intro runs last so Lenis exists to be paused/resumed
  playIntro();
}

// Run on initial load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootAll);
} else {
  bootAll();
}

function reboot() {
  initReveal();
  initHeaderScrollState();
  initGreeting();
  initCursor();
  destroyHeroBackground();
  initHeroBackground();
}

// Swup v4: hook into content:replace via global instance
function wireSwupHooks() {
  const swup = (window as any).swup;
  if (!swup?.hooks) return false;
  swup.hooks.on('content:replace', () => reboot());
  swup.hooks.on('page:view', () => reboot());
  return true;
}

if (!wireSwupHooks()) {
  const iv = window.setInterval(() => {
    if (wireSwupHooks()) window.clearInterval(iv);
  }, 50);
  window.setTimeout(() => window.clearInterval(iv), 5000);
}

// Legacy event fallback
document.addEventListener('swup:contentReplaced', reboot);
