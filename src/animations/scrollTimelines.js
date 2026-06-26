import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { reduceMotion } from './state.js';

gsap.registerPlugin(ScrollTrigger);

export function initScrollTimelines() {
  if (reduceMotion) return;

  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => document.documentElement.style.setProperty('--scroll-progress', self.progress.toFixed(4))
  });

  const heroTl = gsap.timeline({
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.8 }
  });
  heroTl
    .to('.display', { y: -105, scale: 0.965, transformOrigin: 'left top', ease: 'none' }, 0)
    .to('.hero__kicker', { y: -32, autoAlpha: 0.15, ease: 'none' }, 0)
    .to('.hero__bottom', { y: -60, autoAlpha: 0, ease: 'none' }, 0)
    .to('.hero__orb', { y: 150, rotate: 180, scale: 0.78, ease: 'none' }, 0);

  gsap.utils.toArray('[data-shutter-section]').forEach((section) => {
    const shutter = document.createElement('div');
    shutter.className = 'section-shutter';
    section.prepend(shutter);
    gsap.fromTo(shutter,
      { scaleY: 1 },
      {
        scaleY: 0,
        transformOrigin: 'top',
        ease: 'expo.out',
        scrollTrigger: { trigger: section, start: 'top 78%', end: 'top 38%', scrub: 0.7 }
      }
    );
  });

  gsap.utils.toArray('.pillar').forEach((pillar, index) => {
    gsap.fromTo(pillar,
      { yPercent: 18, autoAlpha: 0, clipPath: 'inset(22% 0% 0% 0%)' },
      {
        yPercent: 0,
        autoAlpha: 1,
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 0.9,
        delay: index * 0.06,
        ease: 'expo.out',
        scrollTrigger: { trigger: pillar, start: 'top 86%', once: true }
      }
    );
  });

  const isSmallScreen = window.innerWidth < 900;

  if (!isSmallScreen) {
    gsap.utils.toArray('[data-parallax]').forEach((visual) => {
      gsap.fromTo(visual, { '--py': '-56px', '--scale': 1.055 }, {
        '--py': '56px',
        '--scale': 1.015,
        ease: 'none',
        scrollTrigger: { trigger: visual, start: 'top bottom', end: 'bottom top', scrub: 0.45 }
      });
    });
  }

  gsap.utils.toArray('.work-card').forEach((card) => {
    gsap.fromTo(card,
      { y: 44, autoAlpha: 0.72 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.9,
        ease: 'expo.out',
        scrollTrigger: { trigger: card, start: 'top 84%', once: true }
      }
    );
  });

  gsap.utils.toArray('.shot').forEach((shot, index) => {
    gsap.fromTo(shot,
      { y: 42, rotate: index % 2 ? -0.8 : 0.8, autoAlpha: 0.72 },
      {
        y: 0,
        rotate: 0,
        autoAlpha: 1,
        duration: 0.8,
        ease: 'expo.out',
        scrollTrigger: { trigger: shot, start: 'top 88%', once: true }
      }
    );
  });

  initHorizontalScroll();
}

function initHorizontalScroll() {
  const wrap = document.querySelector('[data-horizontal-scroll-wrap]');
  const track = document.querySelector('[data-horizontal-track]');
  if (!wrap || !track || window.innerWidth < 900) return;

  const panels = gsap.utils.toArray('[data-horizontal-panel]', wrap);
  const intro = wrap.querySelector('.horizontal__intro');
  const horizontalStart = 'top -28%';
  const holdDistance = 360;
  const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + (intro?.offsetWidth || 0) * 0.42 + 96);
  const travelDistance = () => distance() * 1.08;

  gsap.set(panels, { autoAlpha: 0.72, scale: 0.96 });

  if (intro) {
    gsap.to(intro, {
      x: -44,
      autoAlpha: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: wrap,
        start: horizontalStart,
        end: () => `+=${holdDistance * 0.82}`,
        scrub: 0.55
      }
    });
  }

  const snapToPanel = (progress) => {
    const total = holdDistance + travelDistance();
    const holdProgress = holdDistance / total;
    if (progress <= holdProgress) return 0;

    const localProgress = (progress - holdProgress) / (1 - holdProgress);
    const snappedPanel = Math.round(localProgress * (panels.length - 1)) / (panels.length - 1);
    return holdProgress + snappedPanel * (1 - holdProgress);
  };

  const horizontalTween = gsap.timeline({
    scrollTrigger: {
      trigger: wrap,
      start: horizontalStart,
      end: () => `+=${holdDistance + travelDistance()}`,
      scrub: 0.45,
      snap: {
        snapTo: snapToPanel,
        duration: { min: 0.14, max: 0.32 },
        delay: 0.06,
        ease: 'power1.out'
      },
      pin: '.horizontal__sticky',
      invalidateOnRefresh: true
    }
  });

  // Start pinning deeper in the section; only add a short reading hold before normal carousel travel.
  horizontalTween
    .to(track, { x: 0, duration: holdDistance, ease: 'none' })
    .to(track, { x: () => -distance(), duration: () => travelDistance(), ease: 'none' });

  panels.forEach((panel) => {
    ScrollTrigger.create({
      trigger: panel,
      containerAnimation: horizontalTween,
      start: 'left 72%',
      end: 'right 32%',
      onToggle: (self) => panel.classList.toggle('is-active', self.isActive)
    });
    gsap.to(panel, {
      autoAlpha: 1,
      scale: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: panel,
        containerAnimation: horizontalTween,
        start: 'left 84%',
        end: 'center 52%',
        scrub: true
      }
    });
  });
}

export function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header || reduceMotion) return;
  let lastY = window.scrollY;

  ScrollTrigger.create({
    start: 80,
    end: 'max',
    onUpdate: () => {
      const current = window.scrollY;
      const goingDown = current > lastY;
      document.body.dataset.scrollingStarted = current > 12 ? 'true' : 'false';
      document.body.dataset.scrollingDirection = goingDown ? 'down' : 'up';
      gsap.to(header, { y: goingDown && current > 240 ? -82 : 0, duration: 0.45, ease: 'expo.out' });
      lastY = current;
    }
  });
}
