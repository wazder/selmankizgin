export function initReveal() {
  const els = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
  );
  els.forEach(el => io.observe(el));
}

export function initHeaderScrollState() {
  const header = document.querySelector<HTMLElement>('.header');
  if (!header) return;
  const update = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 80);
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
}

export function initGreeting() {
  const el = document.querySelector<HTMLElement>('[data-greeting]');
  if (!el) return;
  el.textContent = 'Gerçek dünyaya hoş geldin.';
}
