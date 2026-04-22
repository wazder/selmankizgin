type CursorState = { x: number; y: number; tx: number; ty: number };

let state: CursorState = { x: 0, y: 0, tx: 0, ty: 0 };
let el: HTMLElement | null = null;
let rafId: number | null = null;

function render() {
  state.x += (state.tx - state.x) * 0.2;
  state.y += (state.ty - state.y) * 0.2;
  if (el) el.style.transform = `translate3d(${state.x - el.offsetWidth / 2}px, ${state.y - el.offsetHeight / 2}px, 0)`;
  rafId = requestAnimationFrame(render);
}

function bindHovers() {
  document.querySelectorAll<HTMLElement>('[data-cursor]').forEach(node => {
    const variant = node.getAttribute('data-cursor') || '';
    node.addEventListener('mouseenter', () => {
      el?.classList.add(variant);
      const text = node.getAttribute('data-cursor-text');
      if (text && el) el.textContent = text;
    });
    node.addEventListener('mouseleave', () => {
      el?.classList.remove(variant);
      if (el) el.textContent = '';
    });
  });
}

export function initCursor() {
  if (matchMedia('(hover: none)').matches) return;
  if (!el) {
    el = document.createElement('div');
    el.className = 'mf-cursor';
    el.style.opacity = '0';
    document.body.appendChild(el);
    let firstMove = true;
    window.addEventListener('mousemove', e => {
      state.tx = e.clientX;
      state.ty = e.clientY;
      if (firstMove && el) {
        state.x = e.clientX;
        state.y = e.clientY;
        el.style.opacity = '1';
        firstMove = false;
      }
    });
    render();
  }
  bindHovers();
}

export function destroyCursor() {
  if (rafId) cancelAnimationFrame(rafId);
  rafId = null;
  el?.remove();
  el = null;
}
