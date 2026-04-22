import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let triggers: ScrollTrigger[] = [];

export function initHeroBackground() {
  const bg = document.querySelector<HTMLElement>('[data-hero-bg]');
  const layer = document.querySelector<HTMLElement>('[data-hero-bg-layer]');
  if (!bg || !layer) return;

  // Clean prior triggers if re-initialised
  triggers.forEach(t => t.kill());
  triggers = [];

  const projectsSection = document.querySelector<HTMLElement>('.projects-section');
  const endElement = projectsSection || document.querySelector<HTMLElement>('.home__intro-awards') || document.body;

  // Zoom into the right portion of the image as user scrolls toward projects
  const scaleTween = gsap.to(layer, {
    scale: 1.8,
    ease: 'none',
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      endTrigger: endElement,
      end: 'top center',
      scrub: 0.6,
    },
  });
  triggers.push(scaleTween.scrollTrigger!);

  // Fade out just before projects title enters viewport, done by the time it hits top
  const fadeTween = gsap.to(bg, {
    opacity: 0,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: endElement,
      start: 'top 80%',
      end: 'top 30%',
      scrub: true,
    },
  });
  triggers.push(fadeTween.scrollTrigger!);
}

export function destroyHeroBackground() {
  triggers.forEach(t => t.kill());
  triggers = [];
}
