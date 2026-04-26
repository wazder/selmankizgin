export const VIDEO_ID = 'vrp1g7kqtW8';
export const START_AT = 537;
export const INTRO_VOLUME = 60;
export const HOME_DEFAULT_VOLUME = 8;

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

export function ensureYT(): Promise<any> {
  return new Promise((resolve) => {
    const w = window as any;
    if (w.YT && w.YT.Player) {
      resolve(w.YT);
      return;
    }
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      try { prev?.(); } catch {}
      resolve((window as any).YT);
    };
    if (!document.querySelector('script[data-yt-api]')) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      tag.dataset.ytApi = '1';
      document.head.appendChild(tag);
    }
  });
}

const GESTURE_EVENTS = [
  'pointerdown',
  'pointermove',
  'pointerover',
  'mousemove',
  'mouseover',
  'mouseenter',
  'keydown',
  'touchstart',
  'wheel',
  'scroll',
] as const;

let earlyGestureSeen = false;

if (typeof window !== 'undefined') {
  const markGesture = () => {
    earlyGestureSeen = true;
  };
  for (const ev of GESTURE_EVENTS) {
    window.addEventListener(ev, markGesture, { capture: true, passive: true });
  }
}

export function attachGestureUnmute(player: any, getTargetVolume: () => number): () => void {
  let unmuted = false;
  const unmuteNow = () => {
    if (unmuted) return;
    unmuted = true;
    try { player.unMute?.(); } catch {}
    try { player.setVolume?.(getTargetVolume()); } catch {}
    try { player.playVideo?.(); } catch {}
    detach();
  };
  const detach = () => {
    for (const ev of GESTURE_EVENTS) {
      window.removeEventListener(ev, unmuteNow, true);
    }
  };
  for (const ev of GESTURE_EVENTS) {
    window.addEventListener(ev, unmuteNow, true);
  }
  // If any gesture already happened before the player was ready, unmute on
  // the next frame so the iframe has time to register.
  if (earlyGestureSeen) {
    requestAnimationFrame(unmuteNow);
  }
  return detach;
}
