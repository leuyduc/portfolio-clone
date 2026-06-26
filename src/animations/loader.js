import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { reduceMotion } from './state.js';

gsap.registerPlugin(CustomEase);
CustomEase.create('dasEase', '0.16,1,0.3,1');

export function initLoader() {
  const loader = document.querySelector('[data-loader]');
  const header = document.querySelector('.site-header');
  const bar = document.querySelector('[data-load-progress]');
  const percent = document.querySelector('[data-load-percent]');
  const heading = document.querySelector('[data-load-heading]');
  const text = document.querySelector('[data-load-text]');
  if (!loader) return;

  function finish() {
    loader.classList.add('is-hidden');
    document.body.classList.add('is-loaded');
    gsap.set(loader, { autoAlpha: 0, pointerEvents: 'none', visibility: 'hidden' });
    gsap.set(header, { y: 0, autoAlpha: 1 });
  }

  const failsafe = window.setTimeout(finish, 2200);

  if (reduceMotion) {
    window.clearTimeout(failsafe);
    finish();
    return;
  }

  const counter = { value: 0 };
  const tl = gsap.timeline({
    defaults: { ease: 'dasEase' },
    onComplete: () => {
      window.clearTimeout(failsafe);
      finish();
    }
  });

  tl.set(header, { y: -14, autoAlpha: 0 })
    .set(loader, { autoAlpha: 1, visibility: 'visible' })
    .fromTo(heading, { yPercent: 105 }, { yPercent: 0, duration: 0.45 })
    .fromTo(text, { yPercent: 90 }, { yPercent: 0, duration: 0.38 }, '-=0.25')
    .to(counter, {
      value: 100,
      duration: 0.62,
      ease: 'power2.out',
      onUpdate: () => {
        const value = Math.round(counter.value).toString().padStart(3, '0');
        if (percent) percent.textContent = `${value}%`;
        if (bar) gsap.set(bar, { scaleX: counter.value / 100 });
      }
    }, '-=0.28')
    .to(loader, { yPercent: -102, duration: 0.72, ease: 'power3.inOut' }, '+=0.08')
    .to(header, { y: 0, autoAlpha: 1, duration: 0.55 }, '-=0.5');
}
