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

  const heroSection = document.querySelector<HTMLElement>('.hero');
  const introSection = document.querySelector<HTMLElement>('.intro');
  const zoomTrigger = heroSection || document.body;
  const fadeTrigger = introSection || zoomTrigger;

  // Scroll zoom — bg subtly, char strongly into the character's head, completed within the hero viewport
  if (bgLayer) {
    const bgScale = gsap.to(bgLayer, {
      scale: 1.4,
      ease: 'none',
      scrollTrigger: {
        trigger: zoomTrigger,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.6,
      },
    });
    triggers.push(bgScale.scrollTrigger!);
  }

  if (charLayer) {
    const charScale = gsap.to(charLayer, {
      scale: 2.4,
      ease: 'none',
      scrollTrigger: {
        trigger: zoomTrigger,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.6,
      },
    });
    triggers.push(charScale.scrollTrigger!);
  }

  // Fade hero-bg out only after the zoom has played, as intro fully takes over
  const fadeTween = gsap.to(bg, {
    opacity: 0,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: fadeTrigger,
      start: 'top 30%',
      end: 'top top',
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
