import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { reduceMotion } from './state.js';

gsap.registerPlugin(ScrollTrigger);

function splitIntoWords(el) {
  const words = el.textContent.trim().split(/\s+/);
  el.textContent = '';
  words.forEach((word, index) => {
    const mask = document.createElement('span');
    const inner = document.createElement('span');
    mask.className = 'split-line';
    inner.textContent = word;
    mask.appendChild(inner);
    el.appendChild(mask);
    if (index < words.length - 1) el.appendChild(document.createTextNode(' '));
  });
}

export function splitText() {
  document.querySelectorAll('[data-split]').forEach((el) => splitIntoWords(el));
}

export function initTextReveal() {
  if (reduceMotion) {
    gsap.set(['[data-reveal]', '.split-line > span'], { clearProps: 'all', opacity: 1, y: 0, rotate: 0 });
    return;
  }

  gsap.utils.toArray('[data-split]').forEach((el) => {
    const targets = el.querySelectorAll('.split-line > span');
    gsap.fromTo(targets,
      { yPercent: 112, rotate: 3, autoAlpha: 0.2 },
      {
        yPercent: 0,
        rotate: 0,
        autoAlpha: 1,
        duration: el.classList.contains('display') ? 1.15 : 1.02,
        ease: 'expo.out',
        stagger: el.classList.contains('display') ? 0.018 : 0.022,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true }
      }
    );
  });

  gsap.utils.toArray('[data-reveal]').forEach((el, index) => {
    gsap.fromTo(el,
      { autoAlpha: 0, y: 44, rotate: index % 3 === 0 ? 0.8 : 0 },
      {
        autoAlpha: 1,
        y: 0,
        rotate: 0,
        duration: 0.95,
        ease: 'expo.out',
        delay: (index % 4) * 0.035,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true }
      }
    );
  });
}
