import { gsap } from 'gsap';

export function initCursor() {
  const cursor = document.querySelector('.cursor');
  if (!cursor || window.matchMedia('(pointer: coarse)').matches) return;

  gsap.set(cursor, {
    xPercent: -50,
    yPercent: -50,
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  });

  const moveX = gsap.quickTo(cursor, 'x', { duration: 0.08, ease: 'power3.out' });
  const moveY = gsap.quickTo(cursor, 'y', { duration: 0.08, ease: 'power3.out' });

  window.addEventListener('mousemove', (event) => {
    moveX(event.clientX);
    moveY(event.clientY);
  });

  document.querySelectorAll('.magnetic').forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('is-big'));
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('is-big');
      gsap.to(el, { x: 0, y: 0, duration: 0.45, ease: 'expo.out' });
    });
    el.addEventListener('mousemove', (event) => {
      const rect = el.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      gsap.to(el, { x: x * 0.14, y: y * 0.22, duration: 0.35, ease: 'expo.out' });
    });
  });

  document.querySelectorAll('.work-card').forEach((card) => {
    card.addEventListener('mouseenter', () => cursor.classList.add('is-card'));
    card.addEventListener('mouseleave', () => cursor.classList.remove('is-card'));
  });
}
