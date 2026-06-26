import { gsap } from 'gsap';

export function initHoverCards() {
  document.querySelectorAll('.work-card').forEach((card) => {
    const visual = card.querySelector('.work-card__visual');
    const title = card.querySelector('h3');

    let moveTicking = false;
    let lastEvent = null;
    card.addEventListener('pointermove', (event) => {
      if (window.matchMedia('(pointer: coarse)').matches) return;
      lastEvent = event;
      if (moveTicking) return;
      moveTicking = true;
      requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const px = (lastEvent.clientX - rect.left) / rect.width;
        const py = (lastEvent.clientY - rect.top) / rect.height;
        card.style.setProperty('--spot-x', `${lastEvent.clientX - rect.left}px`);
        card.style.setProperty('--spot-y', `${lastEvent.clientY - rect.top}px`);
        gsap.to(visual, { rotateX: (py - 0.5) * -5, rotateY: (px - 0.5) * 6, duration: 0.4, ease: 'expo.out', overwrite: true });
        gsap.to(title, { x: (px - 0.5) * 8, duration: 0.4, ease: 'expo.out', overwrite: true });
        moveTicking = false;
      });
    });

    card.addEventListener('pointerenter', () => card.classList.add('is-hovered'));
    card.addEventListener('pointerleave', () => {
      card.classList.remove('is-hovered');
      gsap.to(visual, { rotateX: 0, rotateY: 0, duration: 0.7, ease: 'elastic.out(1, .5)' });
      gsap.to(title, { x: 0, duration: 0.6, ease: 'expo.out' });
    });
  });

  document.querySelectorAll('.shot').forEach((shot) => {
    shot.addEventListener('pointermove', (event) => {
      const rect = shot.getBoundingClientRect();
      shot.style.setProperty('--mx', `${((event.clientX - rect.left) / rect.width) * 100}%`);
      shot.style.setProperty('--my', `${((event.clientY - rect.top) / rect.height) * 100}%`);
    });
  });
}
