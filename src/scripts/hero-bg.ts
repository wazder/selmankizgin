import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let triggers: ScrollTrigger[] = [];
let mouseHandler: ((e: MouseEvent) => void) | null = null;
let tickerFn: (() => void) | null = null;

export function initHeroBackground() {
  const bg = document.querySelector<HTMLElement>('[data-hero-bg]');
  const bgLayer = document.querySelector<HTMLElement>('.hero-bg__layer--bg');
  const charLayer = document.querySelector<HTMLElement>('[data-hero-bg-char]');
  if (!bg) return;

  triggers.forEach(t => t.kill());
  triggers = [];
  if (mouseHandler) {
    window.removeEventListener('mousemove', mouseHandler);
    mouseHandler = null;
  }
  if (tickerFn) {
    gsap.ticker.remove(tickerFn);
    tickerFn = null;
  }

  const projectsSection = document.querySelector<HTMLElement>('.projects-section');
  const endElement = projectsSection || document.body;

  const introSection = document.querySelector<HTMLElement>('.intro');
  const fadeTrigger = introSection || endElement;

  // Scroll zoom — bg subtly, char more strongly toward the character's head
  if (bgLayer) {
    const bgScale = gsap.to(bgLayer, {
      scale: 1.25,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        endTrigger: endElement,
        end: 'top center',
        scrub: 0.6,
      },
    });
    triggers.push(bgScale.scrollTrigger!);
  }

  if (charLayer) {
    const charScale = gsap.to(charLayer, {
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
    triggers.push(charScale.scrollTrigger!);
  }

  // Fade hero-bg out as the intro section comes into view so text stays readable
  const fadeTween = gsap.to(bg, {
    opacity: 0,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: fadeTrigger,
      start: 'top 90%',
      end: 'top 30%',
      scrub: true,
    },
  });
  triggers.push(fadeTween.scrollTrigger!);

  // Mouse parallax on char
  if (charLayer) {
    const maxShiftX = 12;
    const maxShiftY = 9;
    const state = { x: 0, y: 0, tx: 0, ty: 0 };
    mouseHandler = (e: MouseEvent) => {
      state.tx = (e.clientX / window.innerWidth - 0.5) * maxShiftX * -2;
      state.ty = (e.clientY / window.innerHeight - 0.5) * maxShiftY * -2;
    };
    window.addEventListener('mousemove', mouseHandler, { passive: true });

    tickerFn = () => {
      state.x += (state.tx - state.x) * 0.08;
      state.y += (state.ty - state.y) * 0.08;
      gsap.set(charLayer, { x: state.x, y: state.y });
    };
    gsap.ticker.add(tickerFn);
  }
}

export function destroyHeroBackground() {
  triggers.forEach(t => t.kill());
  triggers = [];
  if (mouseHandler) {
    window.removeEventListener('mousemove', mouseHandler);
    mouseHandler = null;
  }
  if (tickerFn) {
    gsap.ticker.remove(tickerFn);
    tickerFn = null;
  }
}
