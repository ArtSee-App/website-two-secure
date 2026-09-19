/**
 * Frame-synced "streaming text" engine shared by Reviews and StreamText.
 *
 * One requestAnimationFrame loop. Typing and erasing advance a fixed number of
 * characters per *frame* (never per millisecond), so the cadence is perfectly
 * even — a 18 ms timer would land 1 char on some 16.7 ms frames and 2 on others,
 * which reads as stutter. Holds are time-based. Text is written straight to a
 * DOM node: no per-character timers, no Vue re-render per character.
 *
 * phases: 'type' → 'hold' → 'erase' → (next) …
 */
export function createStreamer({ typeMs = 18, eraseMs = 6, gapMs = 400, holdFor, onPhase, onNext, reduceMotion = false }) {
  let node = null;
  let text = '';
  let phase = 'idle';
  let phaseStart = 0;
  let raf = 0;
  let shownChars = 0;
  let frameInPhase = 0;
  // ms-per-char → whole frames per char (typing) / chars per frame (erasing), at ~60 Hz
  const FRAME = 1000 / 60;
  const framesPerChar = Math.max(1, Math.round(typeMs / FRAME));
  const eraseCharsPerFrame = Math.max(1, Math.round(FRAME / eraseMs));

  const setPhase = (p, now) => {
    phase = p;
    phaseStart = now;
    frameInPhase = 0;
    if (onPhase) onPhase(p, p === 'hold' ? holdFor(text) : 0);
  };

  const write = (n) => {
    if (n === shownChars) return;
    shownChars = n;
    node.textContent = text.slice(0, n);
  };

  const frame = (now) => {
    const t = now - phaseStart;
    frameInPhase++;
    if (phase === 'type') {
      const n = Math.min(text.length, Math.floor(frameInPhase / framesPerChar));
      write(n);
      if (n >= text.length) setPhase('hold', now);
    } else if (phase === 'hold') {
      if (t >= holdFor(text)) setPhase(reduceMotion ? 'gap' : 'erase', now);
    } else if (phase === 'erase') {
      const n = Math.max(0, text.length - frameInPhase * eraseCharsPerFrame);
      write(n);
      if (n <= 0) setPhase('gap', now);
    } else if (phase === 'gap') {
      if (t >= gapMs) {
        text = onNext() || '';
        shownChars = -1;
        setPhase(reduceMotion ? 'hold' : 'type', now);
        if (reduceMotion) write(text.length);
      }
    }
    raf = requestAnimationFrame(frame);
  };

  return {
    /** Attach the target text node and the first text; `startHolding` = first text is already fully shown. */
    start(targetNode, firstText, startHolding = true) {
      node = targetNode;
      text = firstText;
      shownChars = -1;
      write(startHolding || reduceMotion ? text.length : 0);
      cancelAnimationFrame(raf);
      const now = performance.now();
      setPhase(startHolding || reduceMotion ? 'hold' : 'type', now);
      raf = requestAnimationFrame(frame);
    },
    stop() {
      cancelAnimationFrame(raf);
      raf = 0;
      phase = 'idle';
    },
    get phase() {
      return phase;
    }
  };
}
