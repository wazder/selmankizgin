import { gsap } from 'gsap';

const SESSION_KEY = 'intro-played-v1';
const isDev = import.meta.env?.DEV === true;

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

function greetingText() {
  const h = new Date().getHours();
  if (h < 6) return 'Still up';
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}

export function playIntro() {
  // Intro only plays on home route
  const isHome = document.body.dataset.home === 'true';
  if (!isHome) {
    document.documentElement.classList.add('is-intro-done');
    runHeroReveal(true);
    return;
  }

  const loader = document.querySelector<HTMLElement>('[data-loader]');
  if (!loader) return runHeroReveal(false);

  // In dev: always play. In prod: once per session. ?intro=1 forces replay.
  const forceReplay = new URLSearchParams(location.search).has('intro');
  const alreadyPlayed = !isDev && !forceReplay && sessionStorage.getItem(SESSION_KEY) === '1';
  if (alreadyPlayed) {
    document.documentElement.classList.add('is-intro-done');
    runHeroReveal(true);
    return;
  }

  const greetingEl = loader.querySelector<HTMLElement>('[data-loader-greeting]');
  if (greetingEl) greetingEl.textContent = greetingText();

  const lenis = window.__lenis;
  lenis?.stop();
  document.body.style.overflow = 'hidden';

  const dotsEl = loader.querySelector<HTMLElement>('.loader__dots');
  const nameInners = loader.querySelectorAll<HTMLElement>('.loader__name-inner');
  const halfTop = loader.querySelector<HTMLElement>('.loader__half--top');
  const halfBottom = loader.querySelector<HTMLElement>('.loader__half--bottom');
  const seam = loader.querySelector<HTMLElement>('.loader__seam');
  const progressFill = loader.querySelector<HTMLElement>('.loader__progress-fill');

  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' },
    onComplete: () => {
      document.documentElement.classList.add('is-intro-done');
      document.body.style.overflow = '';
      lenis?.start();
      sessionStorage.setItem(SESSION_KEY, '1');
      loader.remove();
    },
  });

  // 1. Text reveals from masks
  tl.to(greetingEl, { y: 0, duration: 0.55, ease: 'power4.out' }, 0.05)
    .to(dotsEl, { opacity: 1, duration: 0.2 }, '-=0.25')
    .to(nameInners, {
      y: '0%',
      duration: 0.7,
      stagger: 0.06,
      ease: 'expo.out',
    }, 0.1);

  // 2. Progress bar grows center → edges (this IS the loading indicator)
  tl.to(progressFill, {
    left: '0%',
    right: '0%',
    duration: 1.0,
    ease: 'power2.inOut',
  }, '-=0.4');

  // 3. Seam flicks in along the split line
  tl.to(seam, { opacity: 1, duration: 0.12 }, '-=0.1')
    .to(seam, { scaleX: 1, duration: 0.3, ease: 'expo.out' }, '<');

  // 4. Two halves split apart (the progress bar splits with them, giving the illusion it "cuts" the page)
  tl.to(halfTop, { yPercent: -101, duration: 0.75, ease: 'expo.inOut' }, '+=0.02')
    .to(halfBottom, { yPercent: 101, duration: 0.75, ease: 'expo.inOut' }, '<')
    .to([seam, progressFill], { opacity: 0, duration: 0.25, ease: 'power2.out' }, '<+0.08');

  // 5. Hero reveal overlaps the split
  tl.add(() => runHeroReveal(false), '-=0.55');
}

function runHeroReveal(instant: boolean) {
  const headlineMain = document.querySelector<HTMLElement>('.hero__headline-main');
  const headlineAccent = document.querySelector<HTMLElement>('.hero__headline .accent');
  const name = document.querySelector<HTMLElement>('.hero__name');
  const introLine = document.querySelector<HTMLElement>('.hero__intro-line');
  const services = document.querySelectorAll<HTMLElement>('.hero__services > li');
  const scopeCta = document.querySelector<HTMLElement>('.hero__scope-cta');
  const scrollHint = document.querySelector<HTMLElement>('.hero__scroll-hint');
  const header = document.querySelector<HTMLElement>('.header');

  // If no hero on the page (sub-routes), just reveal the header and exit.
  if (!headlineMain) {
    if (header) {
      gsap.set(header, { autoAlpha: 0, y: -20 });
      gsap.to(header, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: instant ? 0 : 0.2 });
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
