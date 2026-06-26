# Portfolio Clone Plan

This document tracks the end-to-end plan for the DAS-inspired portfolio/studio clone. The project is a study clone for layout, animation, responsive behavior, and interaction research. It must not copy the original site's logo, brand assets, proprietary images, or copy.

## Phase 0 - Goal And Scope

- Build a public portfolio/studio landing page inspired by editorial design-school websites.
- Keep the project safe for learning by replacing all original branding, images, and text.
- Produce a site that can be deployed, tested, and versioned clearly.
- Keep the code modular so Lucky can read and study each animation/workflow.

## Phase 1 - Research The Reference Site

- Open the reference website in a real browser workflow.
- Review the visible sections: loader, header, hero, showreel, profile, strengths, programs, works, outcomes, and contact/footer.
- Inspect implementation patterns and motion stack.
- Record the important interaction patterns:
  - Text reveal
  - Loader/progress transition
  - Smooth scroll
  - Horizontal pinned carousel
  - Marquee
  - Custom cursor and hover states
  - Mobile responsive fallback

## Phase 2 - Safe Clone Direction

- Clone the structure and feel, not the copyrighted identity.
- Do not copy the DAS logo, brand name, imagery, exact written content, or proprietary assets.
- Use placeholder portfolio/studio content.
- Use a warm editorial visual system: cream background, strong typography, orange accent, large whitespace, and abstract media cards.

## Phase 3 - Project Setup

- Project root: `/root/das-portfolio-clone`
- Stack:
  - Vite
  - HTML
  - CSS
  - GSAP
  - ScrollTrigger
  - Lenis
- Main files:
  - `index.html`
  - `src/main.js`
  - `src/styles.css`
  - `src/animations/`
- Useful commands:

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Phase 4 - Static Layout

- Build the page section-by-section:
  - Loader
  - Header/navigation
  - Hero
  - Showreel
  - Profile
  - Strengths/horizontal section
  - Programs
  - Works
  - Outcomes gallery
  - Contact/footer
- Make desktop layout first, then test tablet and mobile.
- Required mobile test widths: `390px`, `360px`, and `320px`.

## Phase 5 - Motion System

- Loader with progress and failsafe to avoid black-screen states.
- Word-based text reveal that preserves Vietnamese diacritics.
- Lenis smooth scroll synced with ScrollTrigger.
- Hero glyph field and abstract glass scene.
- Pinned horizontal carousel with active panel state and snap settling.
- Marquee affected by scroll direction.
- Custom cursor and magnetic hover states on desktop.
- Lightweight hover cards using `requestAnimationFrame`.

## Phase 6 - Browser-In-The-Loop QA

When Lucky says `/browser`, `test like Antigravity`, or `don't guess`, use a browser-first workflow:

- Open the public/local page in browser automation.
- Test desktop and mobile viewports.
- Check console errors and page errors.
- Check `scrollY`, scroll height, loader state, and horizontal overflow.
- Capture screenshots at important scroll positions.
- Inspect screenshots visually like a normal user, not only through metrics.
- Verify hover/scroll states and mobile clipping.

Recommended viewports:

```text
1366x768
390x844
360x800
320x740
```

## Phase 7 - Known Fixes And Lessons

- Black screen: add loader/shutter failsafes.
- Vietnamese text clipping: avoid character splitting; use safer word splitting.
- Mobile outcomes overlap: use column layout and disable heavy transforms.
- Mobile showreel overflow: reduce large text and add wrapping safeguards.
- Cursor offset: use fixed positioning plus GSAP `xPercent/yPercent` centering.
- Horizontal carousel starts too early: delay trigger depth, not only scroll speed.
- Horizontal carousel stops between cards: add ScrollTrigger snap.
- Refresh should start at top: set `history.scrollRestoration = 'manual'`, call `window.scrollTo(0, 0)`, and reset Lenis immediately.
- Lag: reduce scrub-heavy animations, avoid expensive clip/filter effects, and remove unnecessary parallax.

## Phase 8 - Performance Pass

- Measure scroll responsiveness, approximate FPS, long tasks, and console errors.
- Reduce active scrub animations where possible.
- Disable or reduce desktop-only effects on touch/mobile.
- Avoid heavy `filter`, `clip-path`, blur, and excessive `will-change` during scroll.
- Keep horizontal pinned section readable and responsive.
- Respect `prefers-reduced-motion`.

## Phase 9 - Production Build And Deploy

- Build production files:

```bash
npm run build
```

- Deploy output from `dist/` to the Nginx web root:

```text
/var/www/clone.liuduc.site
```

- Validate Nginx:

```bash
nginx -t
```

- Test production URL:

```text
http://clone.liuduc.site
```

## Phase 10 - GitHub Source Control

- GitHub repo:

```text
https://github.com/leuyduc/portfolio-clone
```

- Branch:

```text
main
```

- Normal workflow:

```bash
git status
git add .
git commit -m "Describe the change"
git push
```

## Phase 11 - Next Polish Batches

1. Works/Outcomes polish
   - Add richer media cards.
   - Improve hover previews.
   - Check all mobile gallery states.

2. Showreel polish
   - Add a stronger player mock.
   - Improve play button and overlay interaction.

3. Page transition polish
   - Refine loader and shutter transitions.
   - Add multi-page transitions if the site expands.

4. Mobile polish
   - Review screenshots section-by-section.
   - Reduce awkward whitespace.
   - Tune mobile typography and card spacing.

5. Performance hardening
   - Reduce long tasks.
   - Disable heavy interactions on low-power/mobile devices.
   - Re-check ScrollTrigger and Lenis behavior.

6. Content replacement
   - Replace placeholder copy with real brand/project content.
   - Replace abstract assets with original assets.
   - Update contact email and social links.

## Definition Of Done

The project is considered complete when:

- Public URL works.
- Source code is pushed to GitHub.
- Desktop layout has no obvious visual bugs.
- Mobile widths `320/360/390` have no horizontal overflow.
- Refresh always returns to the top of the page.
- Console has no errors.
- Scroll feels smooth enough in normal use.
- Horizontal carousel does not hide the active card's main text.
- The site does not copy protected assets or brand identity from the reference.
- A new developer can run it with:

```bash
npm install
npm run dev
```
