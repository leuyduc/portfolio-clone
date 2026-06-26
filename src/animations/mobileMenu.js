import { gsap } from 'gsap';

export function initMobileMenu() {
  const menuBtn = document.querySelector('[data-menu-btn]');
  const mobilePanel = document.querySelector('[data-mobile-panel]');
  if (!menuBtn || !mobilePanel) return;

  const links = mobilePanel.querySelectorAll('a');
  const tl = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' } });
  tl.to(mobilePanel, { yPercent: 100, duration: 0 })
    .fromTo(mobilePanel, { yPercent: -105 }, { yPercent: 0, duration: 0.82 })
    .fromTo(links, { autoAlpha: 0, y: 46, rotate: 3 }, { autoAlpha: 1, y: 0, rotate: 0, duration: 0.72, stagger: 0.07 }, '-=0.45');

  function closeMenu() {
    document.body.classList.remove('menu-open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.textContent = 'Menu';
    tl.reverse();
  }

  menuBtn.addEventListener('click', () => {
    const isOpen = menuBtn.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMenu();
      return;
    }
    document.body.classList.add('menu-open');
    menuBtn.setAttribute('aria-expanded', 'true');
    menuBtn.textContent = 'Close';
    tl.play();
  });

  links.forEach((link) => link.addEventListener('click', closeMenu));
}
