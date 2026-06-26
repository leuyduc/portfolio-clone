# Next Phase Prompts

Use these prompts to continue the portfolio clone in focused browser-in-the-loop phases. Each prompt is written so it can be pasted into an AI coding agent. Replace details as needed before running.

## Global Instructions For Every Phase

```text
You are working in `/root/das-portfolio-clone` on a Vite + HTML + CSS + GSAP + ScrollTrigger + Lenis portfolio clone.

Important constraints:
- Do not copy DAS logo, brand name, original images, exact copy, or proprietary assets.
- Preserve the current stack and modular animation structure.
- Use browser-in-the-loop QA: open the site, scroll like a normal user, capture/inspect screenshots, check console errors, check mobile widths 390/360/320, then patch.
- Do not guess from code only when debugging layout/motion. Use browser automation and visual screenshots.
- Keep source readable for learning. Prefer small focused modules and clear CSS sections.
- After changes: run `npm run build`, deploy `dist/.` to `/var/www/clone.liuduc.site/`, run `nginx -t`, test `http://clone.liuduc.site`, then commit and push.
- Do not commit `node_modules/` or `dist/`.
```

## Phase 11A - Works And Outcomes Polish

```text
Continue the portfolio clone with a focused Works/Outcomes polish phase.

Goal:
Make the Works and Outcomes sections feel closer to a high-end design-school/portfolio site while keeping all content original.

Tasks:
1. Open `http://clone.liuduc.site` in browser automation at desktop 1366x768 and mobile 390/360/320.
2. Scroll to the Works and Outcomes sections and capture screenshots.
3. Identify visual issues like weak hierarchy, awkward spacing, clipping, hover problems, repeated card shapes, or mobile overflow.
4. Improve the Works section:
   - Add richer project card composition.
   - Add clearer labels, project metadata, and short descriptions.
   - Improve hover preview/spotlight without adding heavy lag.
   - Keep cards readable and responsive.
5. Improve the Outcomes gallery:
   - Expand or refine the visual rhythm.
   - Make mobile layout clean and non-overlapping.
   - Avoid expensive scroll animations on mobile.
6. Browser QA again:
   - Desktop screenshot at Works and Outcomes.
   - Mobile 390/360/320 screenshots.
   - Console errors must be 0.
   - Horizontal overflow must be false.
7. Build, deploy, commit, and push.

Expected output:
- Updated source files.
- Browser QA summary with screenshot paths and what changed.
- Git commit pushed to GitHub.
```

## Phase 11B - Showreel Interaction Polish

```text
Continue with the Showreel polish phase.

Goal:
Make the Showreel section feel more intentional and interactive without using copyrighted video/assets.

Tasks:
1. Open the site in browser automation and inspect the current Showreel section at desktop and mobile.
2. Capture screenshots before editing.
3. Improve the Showreel area:
   - Add a stronger media/player mock layout.
   - Add a play button interaction or hover state.
   - Add subtle overlay/scanline/progress detail if it fits the visual direction.
   - Keep all media abstract/original/placeholder.
4. Make sure text does not overflow on 390/360/320 mobile widths.
5. Avoid heavy blur/filter animations during scroll.
6. Browser QA after patch:
   - Desktop Showreel screenshot.
   - Mobile Showreel screenshots.
   - Hover/play interaction check.
   - Console errors 0.
   - Horizontal overflow false.
7. Build, deploy, commit, and push.

Expected output:
- Showreel feels more like a designed feature, not just a placeholder block.
- No mobile overflow.
- No scroll lag regression.
```

## Phase 11C - Hero And Above-The-Fold Polish

```text
Continue with a Hero/above-the-fold polish phase.

Goal:
Make the first screen feel more premium, more intentional, and closer in energy to the reference site while remaining original.

Tasks:
1. Open production in browser automation and capture desktop/mobile hero screenshots.
2. Inspect the header, top strip, hero typography, glyph field, and glass scene.
3. Improve the first viewport:
   - Stronger typographic rhythm.
   - Better hierarchy between eyebrow, headline, and supporting copy.
   - Refine glyph field density and hover behavior.
   - Refine abstract glass/scene card so it does not feel generic.
   - Make header/nav spacing cleaner.
4. Keep performance safe:
   - Do not add large DOM loops or heavy filters.
   - Disable/reduce hover-only effects on touch devices.
5. Browser QA:
   - Desktop 1366x768 screenshot.
   - Mobile 390/360/320 screenshots.
   - Refresh should always return to top.
   - Console errors 0.
   - Horizontal overflow false.
6. Build, deploy, commit, and push.

Expected output:
- Stronger first impression.
- Clean mobile hero.
- No performance regression.
```

## Phase 11D - Mobile-First Polish Pass

```text
Run a full mobile-first polish pass.

Goal:
Make the whole site feel intentionally designed on mobile, not just resized from desktop.

Tasks:
1. Open the site at 390x844, 360x800, and 320x740 in browser automation.
2. Scroll through the entire page at each width.
3. Capture screenshots for every major section:
   - Hero
   - Showreel
   - Profile
   - Strengths
   - Programs
   - Works
   - Outcomes
   - Contact
4. Identify and fix:
   - Text clipping
   - Horizontal overflow
   - Overlapping cards
   - Excessive blank gaps
   - Tiny labels that are hard to read
   - Buttons/links too close to edges
   - Heavy animation that feels laggy on mobile
5. Prefer mobile-specific CSS simplification over complex JS fixes.
6. Browser QA after patch:
   - `document.documentElement.scrollWidth <= innerWidth` must be true for all tested widths.
   - Console errors must be 0.
   - All main sections must be visually readable.
7. Build, deploy, commit, and push.

Expected output:
- Clean mobile experience across 320/360/390.
- Screenshots proving the final state.
```

## Phase 11E - Performance Hardening

```text
Run a performance hardening phase.

Goal:
Reduce perceived lag during normal scrolling and interaction while preserving the site's visual identity.

Tasks:
1. Open production in browser automation.
2. Measure and observe:
   - Approx FPS during scroll.
   - Long tasks.
   - Console errors.
   - Scroll responsiveness through the horizontal pinned section.
   - Mobile scroll behavior.
3. Inspect likely heavy areas:
   - Lenis settings.
   - ScrollTrigger scrub animations.
   - Horizontal pinned carousel.
   - Glyph field hover logic.
   - Custom cursor.
   - Marquee.
   - Hover cards.
4. Patch carefully:
   - Reduce scrub counts or scrub duration where possible.
   - Disable custom cursor on coarse pointer/touch.
   - Avoid heavy `filter`, `clip-path`, large blur, and excessive `will-change`.
   - Pause or simplify animations when offscreen if needed.
   - Respect `prefers-reduced-motion`.
5. Browser QA after patch:
   - Desktop normal scroll feels smoother.
   - Mobile scroll remains stable.
   - Refresh still returns to top.
   - Horizontal carousel still settles on readable cards.
   - Console errors 0.
6. Build, deploy, commit, and push.

Expected output:
- Reduced lag.
- No visual regression in hero/horizontal/works/contact.
- Performance findings summarized clearly.
```

## Phase 11F - Content And Brand Replacement

```text
Run a content/brand replacement phase.

Goal:
Prepare the site to be used as a real portfolio/studio landing page by replacing placeholder content.

Tasks:
1. Audit all visible text and placeholder labels.
2. Replace generic content with original brand/project copy.
3. Update:
   - Site title
   - Header labels
   - Hero copy
   - Program/service cards
   - Work/project names
   - Outcome labels
   - Contact email and social links
4. Keep the design direction intact.
5. Do not add copyrighted DAS text or assets.
6. Browser QA desktop/mobile to ensure new copy does not overflow.
7. Build, deploy, commit, and push.

Expected output:
- Site copy feels original and production-ready.
- No layout break from changed text length.
```

## Phase 11G - Deployment And Repo Cleanup

```text
Run a deployment/repo cleanup phase.

Goal:
Make the repo easier to use, deploy, and hand off.

Tasks:
1. Review repository structure.
2. Ensure `.gitignore` excludes build artifacts, dependencies, logs, and environment files.
3. Improve `README.md`:
   - Project summary
   - Stack
   - Setup commands
   - Build/deploy commands
   - Notes about safe study clone usage
4. Add a short QA checklist if useful.
5. Verify a clean install path:
   - `npm install`
   - `npm run build`
6. Confirm production deploy instructions still work.
7. Commit and push.

Expected output:
- Repo is clean and useful for future work.
- README helps another developer run the project quickly.
```

## Phase 11H - Final Acceptance Pass

```text
Run the final acceptance pass for the portfolio clone.

Goal:
Confirm the site is stable, readable, and ready to share.

Tasks:
1. Open production in browser automation.
2. Test desktop 1366x768.
3. Test mobile 390x844, 360x800, and 320x740.
4. Verify:
   - Public URL loads.
   - Loader hides correctly.
   - Refresh returns to top.
   - Console errors are 0.
   - Horizontal overflow is false.
   - Horizontal carousel does not hide active card text.
   - Mobile cards do not overlap.
   - Contact section is readable.
   - GitHub repo is up to date.
5. Capture final screenshots for key sections.
6. Fix only clear regressions found during this pass.
7. Build, deploy, commit, and push if anything changes.
8. Produce a concise final QA report.

Expected output:
- Final QA report.
- Stable deployed website.
- Source pushed to GitHub.
```

## Quick Prompt For Any Bug Report

```text
Lucky reported a bug on the portfolio clone. Do not guess from code only.

Workflow:
1. Open `http://clone.liuduc.site` in browser automation.
2. Reproduce the bug at the relevant viewport and scroll position.
3. Capture a screenshot before fixing.
4. Inspect console/page errors and layout measurements.
5. Patch the smallest relevant source files.
6. Build and deploy.
7. Re-open production and verify visually with screenshots.
8. Commit and push the fix.
9. Report the exact before/after results.
```
