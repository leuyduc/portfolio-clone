import './styles.css';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initSmoothScroll } from './animations/smoothScroll.js';
import { initLoader } from './animations/loader.js';
import { splitText, initTextReveal } from './animations/textReveal.js';
import { initScrollTimelines, initHeaderScroll } from './animations/scrollTimelines.js';
import { initHoverCards } from './animations/hoverCards.js';
import { initCursor } from './animations/cursor.js';
import { initMarquee } from './animations/marquee.js';
import { initMobileMenu } from './animations/mobileMenu.js';
import { initCounters } from './animations/counters.js';
import { initGlyphField } from './animations/glyphField.js';

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

function resetScrollToTop(lenis) {
  window.scrollTo(0, 0);
  lenis?.scrollTo?.(0, { immediate: true, force: true });
}

resetScrollToTop();
window.addEventListener('beforeunload', () => resetScrollToTop());

function updateClock() {
  const clock = document.querySelector('[data-clock]');
  if (!clock) return;
  const now = new Date();
  clock.textContent = now.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Ho_Chi_Minh'
  });
}

splitText();
const lenis = initSmoothScroll();
resetScrollToTop(lenis);
initLoader();
initTextReveal();
initScrollTimelines();
initHeaderScroll();
initHoverCards();
initCursor();
initMarquee();
initMobileMenu();
initCounters();
initGlyphField();
updateClock();
setInterval(updateClock, 30000);

window.addEventListener('pageshow', () => {
  window.scrollTo(0, 0);
  resetScrollToTop(lenis);
});

window.addEventListener('load', () => {
  window.scrollTo(0, 0);
  resetScrollToTop(lenis);
  ScrollTrigger.refresh();
  lenis?.resize?.();
});
