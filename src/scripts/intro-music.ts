import { VIDEO_ID, START_AT, INTRO_VOLUME, ensureYT, attachGestureUnmute } from './music-shared';

let player: any = null;
let detachUnmute: (() => void) | null = null;

export function initIntroMusic() {
  if (player) return;
  if (document.getElementById('intro-music-player')) return;

  const container = document.createElement('div');
  container.id = 'intro-music-player';
  container.setAttribute('aria-hidden', 'true');
  container.style.cssText =
    'position:fixed;left:-9999px;top:-9999px;width:200px;height:200px;pointer-events:none;opacity:0;';
  document.body.appendChild(container);

  ensureYT().then((YT) => {
    player = new YT.Player('intro-music-player', {
      height: '200',
      width: '200',
      videoId: VIDEO_ID,
      playerVars: {
        autoplay: 1,
        mute: 1,
        controls: 0,
        start: START_AT,
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
          try { e.target.unMute(); } catch {}
          try { e.target.setVolume(INTRO_VOLUME); } catch {}
          try { e.target.playVideo(); } catch {}
          detachUnmute = attachGestureUnmute(e.target, () => INTRO_VOLUME);
        },
        onStateChange(e: any) {
          if (e.data === YT.PlayerState.PLAYING) {
            try {
              if (e.target.isMuted?.()) {
                e.target.unMute();
                e.target.setVolume(INTRO_VOLUME);
              }
            } catch {}
          }
        },
      },
    });
  });
}

export async function handoffIntroMusic(fadeMs = 350): Promise<void> {
  // Save state so the next page (Base.astro) can resume.
  let currentTime = START_AT;
  try {
    const t = player?.getCurrentTime?.();
    if (typeof t === 'number' && t > 0) currentTime = t;
  } catch {}
  try {
    sessionStorage.setItem('music_active', '1');
    sessionStorage.setItem('music_position', String(currentTime));
  } catch {}

  if (!player) return;

  let startVol = INTRO_VOLUME;
  try {
    const v = player.getVolume?.();
    if (typeof v === 'number') startVol = v;
  } catch {}

  await new Promise<void>((resolve) => {
    const startTime = performance.now();
    const tick = () => {
      const elapsed = performance.now() - startTime;
      const t = Math.min(1, elapsed / fadeMs);
      const vol = startVol * (1 - t);
      try { player.setVolume?.(Math.max(0, Math.round(vol))); } catch {}
      if (t < 1) requestAnimationFrame(tick);
      else resolve();
    };
    requestAnimationFrame(tick);
  });

  try { player.stopVideo?.(); } catch {}
  try { player.destroy?.(); } catch {}
  player = null;
  detachUnmute?.();
  detachUnmute = null;
  document.getElementById('intro-music-player')?.remove();
}

export function destroyIntroMusic() {
  if (!player) return;
  try { player.stopVideo?.(); } catch {}
  try { player.destroy?.(); } catch {}
  player = null;
  detachUnmute?.();
  detachUnmute = null;
  document.getElementById('intro-music-player')?.remove();
  try {
    sessionStorage.removeItem('music_active');
    sessionStorage.removeItem('music_position');
  } catch {}
}
