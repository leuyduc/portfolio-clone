import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initCounters() {
  document.querySelectorAll('[data-count]').forEach((el) => {
    const target = Number(el.dataset.count);
    const state = { value: 0 };
    gsap.to(state, {
      value: target,
      duration: 1.4,
      ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      onUpdate: () => {
        el.textContent = Math.round(state.value).toString().padStart(target > 9 ? 2 : 1, '0');
      }
    });
  });
}
