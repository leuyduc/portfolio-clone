import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { reduceMotion } from './state.js';

gsap.registerPlugin(ScrollTrigger);

export function initMarquee() {
  const track = document.querySelector('.ticker__track');
  if (!track || reduceMotion) return;

  const base = gsap.to(track, { xPercent: -50, duration: 24, ease: 'none', repeat: -1 });
  const proxy = { skew: 0 };
  let lastScroll = window.scrollY;

  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: () => {
      const delta = window.scrollY - lastScroll;
      const direction = delta >= 0 ? 1 : -1;
      const velocity = Math.min(Math.abs(delta) / 20, 4);
      base.timeScale(direction * (1 + velocity));
      gsap.to(base, { timeScale: direction, duration: 0.8, ease: 'power3.out' });
      gsap.to(proxy, {
        skew: direction * Math.min(velocity * 3, 10),
        duration: 0.2,
        overwrite: true,
        onUpdate: () => gsap.set(track, { skewX: proxy.skew, transformOrigin: '50% 50%' }),
        onComplete: () => gsap.to(proxy, {
          skew: 0,
          duration: 0.55,
          ease: 'elastic.out(1, .5)',
          onUpdate: () => gsap.set(track, { skewX: proxy.skew })
        })
      });
      lastScroll = window.scrollY;
    }
  });
}
