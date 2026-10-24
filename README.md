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

The owner-selected connected PSD logo is traced as a transparent SVG in `public/branding/psd-connected.svg`. The header and footer use the shared `BrandMark` component, and the browser favicon references the same asset. The original approved concept remains in `output/branding/pasindu-psd-connected-logo-v2.png`.

Typography uses shared `--text-body` (1rem), `--text-small` (0.875rem), and `--text-caption` (0.75rem) tokens in `base.css`. Reading text remains 1rem on mobile; text sizes use rem units so they follow browser font preferences. Small mock-browser chrome remains decorative. The mobile hero and device toolbars use normal document flow to accommodate larger text, narrow skill/project grids become single columns, and navigation moves to the menu before the larger text crowds the header. Live browser review covers mobile and desktop text, menus, skill tabs, project dialogs and credential previews. These checks do not constitute a full accessibility conformance audit.

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

The tools section presents a curated core stack across four categories: web development, mobile development, backend and databases, and tools/deployment. It focuses on the languages, major frameworks, data platforms, version control, and delivery tools demonstrated by the portfolio projects. Supporting packages, document/scanning libraries, and minor utilities are described in project-specific Behind the Build sections instead of appearing as individual skills. The selected category drives both the cards and a connected 3D logo network through shared metadata in `src/data/skills.ts`. The network grows to match the selected core category: six nodes for web and mobile, seven for backend/databases, and four for tools/deployment. Every selected technology is visible at the same time, including with reduced motion; unused nodes are hidden when switching to a smaller category. The contact network retains its three nodes. HTML and CSS share a node, logo faces remain readable through depth, textures are cached and disposed, and mobile artwork stays attached to its section. Locally hosted brand SVGs and their source/license notes are in `public/Images/Technologies/`.

## Coding standards and verification

The contact section reuses the logo network with three conversation nodes: GitHub, Email, and LinkedIn. `src/data/contactChannels.ts` supplies both the scene and the accessible links underneath it, using the owner's existing destinations. WhatsApp and Telegram are omitted at the owner's request. Contact SVGs are hosted in `public/Images/Contact/` with their source and license recorded there.

```sh
npm run check
npm run build
```

`check` runs strict type checks, ESLint with React Hooks rules and zero warnings, Prettier verification, and the automated tests. `build` also requires type checks to pass before producing the Vite bundle. The GitHub Pages workflow runs the same checks before deployment.

Use `npm run format` to apply formatting, `npm run lint` for code checks, and `npm run test:watch` while changing behavior. Keep components focused, pass small typed props, place content in data modules, and add tests for behavior that could regress. Do not introduce inheritance or service abstractions without a concrete need; static content is passed as data, while clipboard behavior accepts a small injectable writer for testing.

The tests cover project filtering, reordered mockups, modal selection and focus restoration, education records, correct course statuses, award-photo previews, keyboard tabs, mobile-menu state, and clipboard feedback. jsdom emulates native dialog methods; actual Escape behavior, layout, and WebGL are checked separately in a browser.

The Three.js atmosphere respects reduced-motion preferences, caps rendering resolution, and pauses rendering off screen. The page remains usable without WebGL. The portrait is a transparent AI-generated raster render with pointer parallax, not a rigged or animated GLB character. See `CHARACTER-ART-DIRECTION.md` for the asset prompt and provenance. Fonts use Google Fonts with local sans-serif fallbacks.

Content sections use brighter surfaces and larger body text, with section artwork in the same violet/cyan/peach palette. `SectionArtwork` declares a decorative viewport; the lazy-loaded `SectionScenes` renderer draws the visible viewports through one shared WebGL context. About, projects, skills, experience, education, recognition, and contact each have their own procedural 3D sculpture. Geometry and studio materials live in `src/lib/graphics/sectionSculptures.ts`; viewport clipping is independent of the React component.

The shared renderer caps pixel density and creates sculptures when first visible. Desktop uses fixed, clipped WebGL viewports and a quiet 90-point depth field below the hero. Mobile and coarse-pointer layouts use the same single WebGL context in a small offscreen buffer, copying visible sculptures into canvases attached to their own DOM slots. Native scrolling then moves the artwork with its section, without scroll-position tracking at animation-frame speed. The buffer follows slot dimensions rather than changes in the browser toolbar's viewport height. Mobile rendering is limited to 30 frames per second, skips the background depth field, and stops when no artwork is visible. Both modes stop when the tab is hidden, respect reduced motion, and preserve the SVG fallback without WebGL. Mouse hover can add depth; touch scrolling never drives pointer tilt. `useTilt` adds pointer-responsive depth to selected surfaces without rerendering content; it skips touch and reduced-motion input and cancels pending frames on leave or unmount.

Project previews use website screenshots and portrait app screenshots. Update the deployed file in `public/Images/Projects/` referenced by `src/data/projects.ts`. This is the single location for live project images. ZENVIA uses `zenvia-website.png`, Sakura Elegance uses `sakura-elegance-website.png`, Jet Shipping uses `jet-shipping-app.jpg`, and Wellness Tracker uses `wellness-tracker-app.jpg`. The shared project metadata supplies the featured preview, archive card, and details dialog. All ten projects are accessible through the archive; the first seven also have large featured presentations. JET Cargo Management leads as the flagship web project for Jet Shipping & Logistic Sdn. Bhd., with six detailed capability groups in its dialog. Klyro LMS, AccessTransit, DisasterGuard, ZENVIA, and Sakura Elegance also have project-specific Behind the Build sections with four to six capability cards, based on their local project sources. Each project supplies its own section heading; projects without enough detailed information keep the standard overview. The public landing-page screenshot is stored in `public/Images/Projects/jet-shipping-web.png`. Its website link points to the current `nightofsecrets.com` deployment. The description reflects local implementation of collection consolidation, QR/CODE128 sticker generation and camera scanning, invoices/receipts/HBL documents, PDF and Excel shipment exports, manual payment recording, expense categories, reports, and role/department access. Payment recording is described without claiming an integrated online payment gateway. DisasterGuard is a 3rd-year, 2nd-semester group project for disaster early warning and emergency coordination in Sri Lanka, built with React Native, Expo, TypeScript, Firebase, and Cloud Firestore. Its screenshot is stored in `public/Images/Projects/disasterguard-app.jpeg`, and its source link points to the shared `KalpaOfficial/Smart-Disaster-Early-Warning-and-Emergency-Coordination-System-for-Sri-Lanka` repository. AccessTransit is a 3rd-year, 2nd-semester group project built with Flutter, Dart, Firebase, Cloud Firestore, and OpenStreetMap. Its phone screenshot is stored in `public/Images/Projects/access-transit-app.jpeg`, and its source link points to the shared `iWolfyy/AccessTransit` repository. Klyro LMS is a featured project, built for Klyro (Pvt) Ltd during the internship beginning 13 July 2026, with scheduled completion on 13 January 2027. Its public landing-page preview is stored in `public/Images/Projects/klyro-lms-website.png`. Project dialogs support Escape, and technology tabs support arrow keys, Home, and End.

Featured phone and desktop previews use reusable CSS 3D device housings with separate front, back, and edge surfaces. Both start and reset to a centered, straight-on view. Monitor proportions scale with the stage and include space for the stand; the default view stays still for clear viewing. Drag with a mouse to turn and tilt; swipe horizontally on touch to rotate through unlimited full turns. Vertical touch gestures retain page scrolling and pinch zoom remains available. Focus a preview and use arrow keys to rotate, or Home / Reset to restore the initial view. The Explore button opens project details independently of dragging. `useDeviceRotation` owns pointer capture, gesture cancellation, and keyboard controls; deliberate rotation also works with reduced motion enabled.

Education and recognition content in `src/data/education.ts` and `src/data/credentials.ts` preserves the owner's degree and GPA, school examination results, scholarship record, all five courses with their original completion statuses, and the Sakura Elegance award. Education and awards have their own section links in the main navigation and floating dock.

The certifications section also includes the completed MongoDB Atlas Administrator learning path: 13 skill credentials issued on 19–20 October 2026. `src/data/mongodbCredentials.ts` maps each learning-path skill to its official certificate title, issue date, badge, original PDF, document preview, and Credly verification URL. The gallery supports category filtering and a shared dark dialog with Certificate / Badge views. Original PDFs live in `public/credentials/mongodb/`, and original badge images plus optimized document previews live in `public/Images/Credentials/MongoDB/`. These are learning-path skill credentials, not a professional certification exam. Original documents open on demand; the gallery loads badge images lazily.

The repository contains the active React site, configuration, tests, public assets, and approved artwork sources. The original hero portrait is preserved in `output/source/character.png`; the approved logo concept and its notes are in `output/branding/`. Legacy pages, duplicate assets, draft logos, and temporary screenshots were removed after making a local ZIP backup in `.local-backups/`. Backups and new QA screenshots in `output/qa/` are ignored by Git and excluded from deployment. Dependencies and generated builds remain in the ignored `node_modules/` and `dist/` folders.
