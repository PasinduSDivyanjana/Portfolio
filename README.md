# Pasindu — portfolio

A responsive React portfolio inspired by three supplied design references: a personal portrait composition, violet/cyan lighting, a live Three.js particle scene, floating section navigation, and perspective project mockups.

## Run locally

```sh
npm install
npm run dev
```

## Production build

```sh
npm run build
npm run preview
```

The production output is `dist/`. The existing GitHub Pages workflow builds and deploys that directory when changes are pushed to `main`. Vite uses a relative base for project-page hosting.

The application uses TypeScript in strict mode. `src/Portfolio.tsx` composes the page; each section owns its local interactions. Assets used by the React app live in `public/Images/`.

## Source structure

- `src/sections/`: hero, about, projects, skills, experience, education, certifications, and contact.
- `src/components/ui/`: shared section headings, labels, modal, technology tags, and course statuses.
- `src/components/layout/`: header, footer, and floating navigation.
- `src/components/projects/`: featured projects, archive cards, mockups, and project details.
- `src/components/education/`: school records, logos, and examination results.
- `src/hooks/`: section tracking, reveal effects, hero motion, and clipboard feedback. Hooks clean up their observers, listeners, timers, and pending frames.
- `src/data/`: profile, navigation, projects, skills, experience, qualifications, and recognition. Update content here instead of editing repeated presentation code.
- `src/types/`: explicit component/data contracts, including browser versus phone preview types.
- `src/styles/`: shared foundations, component/section styles, motion, and responsive overrides. `index.css` defines the cascade order.
- `src/test/`: interaction and regression tests with Vitest and Testing Library.

Project presentation uses each project's `preview` metadata and `featured` flag, so changing the project order does not switch its mockup type. Stable project IDs serve as list keys. Modal behavior is shared by project details and the achievement photograph. Course completion is derived from a single status field.

## Coding standards and verification

```sh
npm run check
npm run build
```

`check` runs strict type checks, ESLint with React Hooks rules and zero warnings, Prettier verification, and the automated tests. `build` also requires type checks to pass before producing the Vite bundle. The GitHub Pages workflow runs the same checks before deployment.

Use `npm run format` to apply formatting, `npm run lint` for code checks, and `npm run test:watch` while changing behavior. Keep components focused, pass small typed props, place content in data modules, and add tests for behavior that could regress. Do not introduce inheritance or service abstractions without a concrete need; static content is passed as data, while clipboard behavior accepts a small injectable writer for testing.

The tests cover project filtering, reordered mockups, modal selection and focus restoration, education records, correct course statuses, award-photo previews, keyboard tabs, mobile-menu state, and clipboard feedback. jsdom emulates native dialog methods; actual Escape behavior, layout, and WebGL are checked separately in a browser.

The Three.js atmosphere respects reduced-motion preferences, caps rendering resolution, and pauses rendering off screen. The page remains usable without WebGL. The portrait is a transparent AI-generated raster render with pointer parallax, not a rigged or animated GLB character. See `CHARACTER-ART-DIRECTION.md` for the asset prompt and provenance. Fonts use Google Fonts with local sans-serif fallbacks.

Content sections use brighter surfaces and larger body text, with section artwork in the same violet/cyan/peach palette. `SectionArtwork` declares a decorative viewport; the lazy-loaded `SectionScenes` renderer draws the visible viewports through one shared WebGL context. About, projects, skills, experience, education, recognition, and contact each have their own procedural 3D sculpture. Geometry and studio materials live in `src/lib/graphics/sectionSculptures.ts`; viewport clipping is independent of the React component.

The shared renderer caps pixel density, creates sculptures when first visible, and keeps a quiet 90-point depth field moving between them. That field is clipped to the content below the hero. Continuous frames stop outside the content or when the tab is hidden; mobile rendering is limited to 30 frames per second. Reduced motion uses static renders. An SVG fallback remains visible when WebGL is unavailable. `useTilt` adds pointer-responsive depth to selected surfaces without rerendering content; it skips touch and reduced-motion input and cancels pending frames on leave or unmount.

Production image references use optimized WebP assets. Original source images remain available. All six projects are accessible through the archive; the first three also have large featured presentations. Project dialogs support Escape, and technology tabs support arrow keys, Home, and End.

Featured phone and desktop previews use reusable CSS 3D device housings with separate front, back, and edge surfaces. Both start and reset to a centered, straight-on view. Monitor proportions scale with the stage and include space for the stand; the default view stays still for clear viewing. Drag with a mouse to turn and tilt; swipe horizontally on touch to rotate through unlimited full turns. Vertical touch gestures retain page scrolling and pinch zoom remains available. Focus a preview and use arrow keys to rotate, or Home / Reset to restore the initial view. The Explore button opens project details independently of dragging. `useDeviceRotation` owns pointer capture, gesture cancellation, and keyboard controls; deliberate rotation also works with reduced motion enabled.

Education and recognition content in `src/data/education.ts` and `src/data/credentials.ts` was restored from the original `Education.html` and `Certificates.html`. It includes the degree and GPA, school examination results, scholarship record, all five courses with their original completion statuses, and the Sakura Elegance award. Education and awards have their own section links in the main navigation and floating dock.

The previous HTML pages and their assets remain in the repository as source references. The new React homepage replaces the old homepage; legacy pages are not included in the Vite build.
