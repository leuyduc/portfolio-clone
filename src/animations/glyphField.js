import { gsap } from 'gsap';
import { reduceMotion } from './state.js';

const GLYPHS = ['A', 'D', 'S', '*', '>', '$'];

export function initGlyphField() {
  const field = document.querySelector('[data-glyph-field]');
  if (!field) return;

  const total = window.innerWidth < 700 ? 72 : 168;
  const frag = document.createDocumentFragment();
  for (let i = 0; i < total; i += 1) {
    const span = document.createElement('span');
    span.textContent = GLYPHS[i % GLYPHS.length];
    span.style.setProperty('--d', `${(i % 18) * 0.025}s`);
    frag.appendChild(span);
  }
  field.appendChild(frag);

  if (reduceMotion || window.matchMedia('(pointer: coarse)').matches) return;

  field.addEventListener('pointermove', (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement) || target.tagName !== 'SPAN') return;
    gsap.fromTo(target,
      { color: '#d54b25', scale: 1.7, rotate: -8 },
      { color: '#11110f', scale: 1, rotate: 0, duration: 0.65, ease: 'expo.out', overwrite: true }
    );
  });
}
