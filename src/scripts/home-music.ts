import {
  VIDEO_ID,
  START_AT,
  HOME_DEFAULT_VOLUME,
  ensureYT,
  attachGestureUnmute,
} from './music-shared';

let player: any = null;
let savePositionInterval: number | null = null;
let titleSet = false;

interface WidgetEls {
  root: HTMLElement;
  toggle: HTMLButtonElement | null;
  title: HTMLElement | null;
  slider: HTMLInputElement | null;
}

function getWidget(): WidgetEls | null {
  const root = document.querySelector<HTMLElement>('[data-music-widget]');
  if (!root) return null;
  return {
    root,
    toggle: root.querySelector<HTMLButtonElement>('[data-music-toggle]'),
    title: root.querySelector<HTMLElement>('[data-music-title]'),
    slider: root.querySelector<HTMLInputElement>('[data-music-volume]'),
  };
}

function readVolume(): number {
  try {
    const v = sessionStorage.getItem('music_volume');
    if (v !== null) {
      const n = Number(v);
      if (Number.isFinite(n)) return Math.max(0, Math.min(100, n));
    }
  } catch {}
  return HOME_DEFAULT_VOLUME;
}

function writeVolume(v: number) {
  try { sessionStorage.setItem('music_volume', String(v)); } catch {}
}

function readPosition(): number {
  try {
    const v = sessionStorage.getItem('music_position');
    if (v !== null) {
      const n = Number(v);
      if (Number.isFinite(n) && n > 0) return Math.floor(n);
    }
  } catch {}
  return START_AT;
}

function writePosition(t: number) {
  try { sessionStorage.setItem('music_position', String(Math.floor(t))); } catch {}
}

function setMutedState(muted: boolean) {
  const w = getWidget();
  if (!w) return;
  w.root.dataset.muted = muted ? 'true' : 'false';
}

function setPlayingState(playing: boolean) {
  const w = getWidget();
  if (!w) return;
  w.root.dataset.playing = playing ? 'true' : 'false';
}

function syncTitle() {
  if (titleSet || !player) return;
  const w = getWidget();
  if (!w?.title) return;
  try {
    const data = player.getVideoData?.();
    if (data?.title) {
      w.title.textContent = data.title;
      titleSet = true;
    }
  } catch {}
}

function wireWidget() {
  const w = getWidget();
  if (!w) return;
  w.root.dataset.ready = 'true';

  const initialVol = readVolume();
  if (w.slider) {
    w.slider.value = String(initialVol);
    w.slider.addEventListener('input', () => {
      const v = Number(w.slider!.value);
      writeVolume(v);
      try { player?.setVolume?.(v); } catch {}
      if (v === 0) {
        try { player?.mute?.(); } catch {}
        setMutedState(true);
      } else {
        try { player?.unMute?.(); } catch {}
        setMutedState(false);
      }
    });
  }

  if (w.toggle) {
    w.toggle.addEventListener('click', () => {
      if (!player) return;
      const isMuted = w.root.dataset.muted === 'true';
      if (isMuted) {
        try { player.unMute?.(); } catch {}
        const restore = readVolume() || HOME_DEFAULT_VOLUME;
        try { player.setVolume?.(restore); } catch {}
        if (w.slider) w.slider.value = String(restore);
        setMutedState(false);
      } else {
        try { player.mute?.(); } catch {}
        setMutedState(true);
      }
    });
  }
}

export function initHomeMusic() {
  if (player) return;
  if (document.getElementById('home-music-player')) return;

  wireWidget();

  const startTime = readPosition();
  const targetVolume = readVolume();

  const container = document.createElement('div');
  container.id = 'home-music-player';
  container.setAttribute('aria-hidden', 'true');
  container.style.cssText =
    'position:fixed;left:-9999px;top:-9999px;width:200px;height:200px;pointer-events:none;opacity:0;';
  document.body.appendChild(container);

  ensureYT().then((YT) => {
    player = new YT.Player('home-music-player', {
      height: '200',
      width: '200',
      videoId: VIDEO_ID,
      playerVars: {
        autoplay: 1,
        mute: 1,
        controls: 0,
        start: startTime,
        playsinline: 1,
        modestbranding: 1,
        rel: 0,
        disablekb: 1,
        fs: 0,
        iv_load_policy: 3,
        origin: window.location.origin,
        enablejsapi: 1,
      },
      events: {
        onReady(e: any) {
          try { e.target.playVideo(); } catch {}
          window.setTimeout(() => {
            try { e.target.unMute(); } catch {}
            try { e.target.setVolume(targetVolume); } catch {}
            try { e.target.playVideo(); } catch {}
            syncTitle();
          }, 60);
          attachGestureUnmute(e.target, () => readVolume());

          if (savePositionInterval) clearInterval(savePositionInterval);
          savePositionInterval = window.setInterval(() => {
            try {
              const t = e.target.getCurrentTime?.();
              if (typeof t === 'number') writePosition(t);
            } catch {}
          }, 1000);
        },
        onStateChange(e: any) {
          if (e.data === YT.PlayerState.PLAYING) {
            setPlayingState(true);
            syncTitle();
            try {
              if (e.target.isMuted?.()) {
                e.target.unMute();
                e.target.setVolume(readVolume());
              }
            } catch {}
            setMutedState(readVolume() === 0);
          } else if (e.data === YT.PlayerState.PAUSED) {
            setPlayingState(false);
          } else if (e.data === YT.PlayerState.ENDED) {
            setPlayingState(false);
          }
        },
        onError() {
          if (savePositionInterval) {
            clearInterval(savePositionInterval);
            savePositionInterval = null;
          }
        },
      },
    });
  });
}
