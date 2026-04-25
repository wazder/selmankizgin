import { gsap } from 'gsap';

function splitWords(el: HTMLElement) {
  const raw = el.textContent?.trim() ?? '';
  el.textContent = '';
  const frag = document.createDocumentFragment();
  raw.split(/(\s+)/).forEach(token => {
    if (!token) return;
    if (/\s+/.test(token)) {
      frag.appendChild(document.createTextNode(' '));
      return;
    }
    const outer = document.createElement('span');
    outer.className = 'word-outer';
    outer.style.display = 'inline-block';
    outer.style.overflow = 'hidden';
    outer.style.verticalAlign = 'top';

    const inner = document.createElement('span');
    inner.className = 'word-inner';
    inner.style.display = 'inline-block';
    inner.style.transform = 'translate3d(0, 110%, 0)';
    inner.style.willChange = 'transform';
    inner.textContent = token;

    outer.appendChild(inner);
    frag.appendChild(outer);
  });
  el.appendChild(frag);
  return el.querySelectorAll<HTMLElement>('.word-inner');
}

export function playIntro() {
  document.documentElement.classList.add('is-intro-done');
  runHeroReveal();
}

function runHeroReveal() {
  const headlineMain = document.querySelector<HTMLElement>('.hero__headline-main');
  const headlineAccent = document.querySelector<HTMLElement>('.hero__headline .accent');
  const name = document.querySelector<HTMLElement>('.hero__name');
  const introLine = document.querySelector<HTMLElement>('.hero__intro-line');
  const services = document.querySelectorAll<HTMLElement>('.hero__services > li');
  const scopeCta = document.querySelector<HTMLElement>('.hero__scope-cta');
  const scrollHint = document.querySelector<HTMLElement>('.hero__scroll-hint');
  const header = document.querySelector<HTMLElement>('.header');

  if (!headlineMain) {
    if (header) {
      gsap.set(header, { autoAlpha: 0, y: -20 });
      gsap.to(header, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' });
    }
    return;
  }

  const headlineMainWords = splitWords(headlineMain);
  const headlineAccentWords = headlineAccent ? splitWords(headlineAccent) : [];
  const nameWords = name ? splitWords(name) : [];

  if (introLine) gsap.set(introLine, { autoAlpha: 0, y: 20 });
  if (services.length) gsap.set(services, { autoAlpha: 0, y: 20 });
  if (scopeCta) gsap.set(scopeCta, { autoAlpha: 0, y: 20 });
  if (scrollHint) gsap.set(scrollHint, { autoAlpha: 0, y: 20 });
  if (header) gsap.set(header, { autoAlpha: 0, y: -20 });

  const tl = gsap.timeline();

  tl.to(headlineMainWords, { y: '0%', duration: 1, stagger: 0.08, ease: 'expo.out' }, 0);

  if (headlineAccentWords.length) {
    tl.to(headlineAccentWords, { y: '0%', duration: 1.1, stagger: 0.1, ease: 'expo.out' }, 0.15);
  }
  if (nameWords.length) {
    tl.to(nameWords, { y: '0%', duration: 0.9, stagger: 0.06, ease: 'expo.out' }, 0.2);
  }
  if (introLine) {
    tl.to(introLine, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.1);
  }
  if (header) {
    tl.to(header, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.3);
  }
  if (services.length) {
    tl.to(services, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out' }, 0.4);
  }
  const tailTargets: HTMLElement[] = [];
  if (scopeCta) tailTargets.push(scopeCta);
  if (scrollHint) tailTargets.push(scrollHint);
  if (tailTargets.length) {
    tl.to(tailTargets, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }, 0.7);
  }
}
