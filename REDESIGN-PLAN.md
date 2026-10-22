# Pasindu portfolio — cinematic 3D redesign plan

Status: reference-inspired implementation completed locally. The original proposal below describes the broader direction; see the implementation notes for the delivered scope.

## Design direction

Build a personal, cinematic developer portfolio around a recognizable 3D character and a connected scroll journey. Use the existing React application, real projects, profile details, and contact links as the foundation.

The current version has a metallic knot, lime accents, a two-column project grid, and independent content sections. The next version should give Pasindu a stronger visual identity: an immersive introduction, a character-led story, and individually art-directed project presentations.

## Reference observations

1. https://vt.tiktok.com/ZSgfWNqqn/
   - Resolved to @codevibes_1, video 7667289807936113942.
   - Observed a large portrait-centered introduction, bold white creative-director typography, warm magenta/orange lighting, compact navigation, and a selected-work page with editorial type and category controls.
   - Takeaway: confident composition, a strong personal focal point, and deliberate project typography.
2. https://vt.tiktok.com/ZSgfnGY9u/
   - Resolved to @lusi.uxui, video 7621253061633182998.
   - Observed a moncy.dev showcase with a large stylized 3D character, a near-black background, purple illumination, split introductory text, and a career section with a luminous vertical timeline.
   - Takeaway: a memorable character and continuity between the introduction and the career story.
3. https://vt.tiktok.com/ZSgfnoaWu/
   - Resolved to @frontiend, video 7654931504430091538.
   - Playback succeeded on the subsequent retry. Observed the particle-like introduction, a luminous blue character behind the content, a Skills & Tools section, a floating bottom navigation bar, and a contact form that keeps the character visible beside it.
   - Takeaway: a persistent visual identity, atmospheric particles, and floating navigation that connects the sections. The contact form in that reference is not evidence of a working email backend.

These are inspiration references. Reuse neither another person's identity nor their character assets without a suitable license.

## Visual system

- Background: near-black, with restrained violet lighting around the main scene.
- Type: oversized off-white headlines, a compact navigation, and small technical labels. Keep body text readable and contrast strong.
- Accent: violet as the main atmosphere; cyan only for selected interactive details. Retire the current dominant lime treatment.
- Layout: use open compositions and generous spacing. Give major projects their own presentation rather than styling every section as a card grid.
- Personal voice: position Pasindu as a web and mobile developer. Preserve verified education and employment details; do not adopt reference labels such as “Creative Director” or invent experience dates.

## Visitor journey and motion storyboard

### 1. Arrival

- A short name/monogram reveal leads into the hero as assets become ready.
- Display the headline and navigation immediately; do not block the page behind a fake loading percentage.
- Hero copy: “Pasindu Divyanjana” and “Developer. Creative thinker. Builder.”
- A large stylized developer character is the focal point, with a laptop or a restrained workstation setting.
- The character makes a subtle idle movement. The camera responds gently to the pointer on desktop.
- Keep “Explore work” and “Let's talk” obvious and usable.

### 2. Scroll into the story

- On desktop, use one bounded sticky scene for the hero-to-about transition.
- Scroll moves the camera from the introductory portrait to a wider desk view while the text changes to Pasindu's background and focus.
- Use a controlled sequence with a clear start and end. Resume normal document scrolling afterwards.
- Mobile uses a simpler scene and normal vertical sections, without a long pinned sequence.

### 3. Selected work

- Feature ZENVIA, Sakura Elegance, and Jet Shipping as three large project chapters.
- ZENVIA: a desktop-browser presentation with the real skincare website screenshot.
- Sakura Elegance: a contrasting browser/storefront composition with its real screenshot.
- Jet Shipping: a phone presentation using the existing app image.
- Each chapter explains the problem, Pasindu's contribution, and the technologies supported by the existing content. Confirm contribution details before expanding claims.
- Animate the mockup into position as the chapter enters. Pair it with a compact project number and title.
- Present the other three projects in a smaller, accessible archive with the existing web/mobile filters.
- Keep live-site and source links when available. Preserve the ability to inspect all six projects.

### 4. About, skills, and experience

- Combine a personal introduction with the scene's quieter resting state.
- Group skills into web, mobile, and data/tools using only technologies already established in the portfolio.
- Show education and employment along a clean timeline with a scroll-progress highlight.
- Do not fabricate timeline dates or skill percentages. Restore certificates from the legacy content where real certificate records/links are available.

### 5. Contact

- End with “Let's build something worth exploring.”
- The character or scene returns in a small closing pose, reusing the hero asset.
- Offer email, copy-email, GitHub, and LinkedIn. Retain a clear back-to-top action.
- Make any custom pointer decorative; keep the system pointer and keyboard access functional.

## 3D asset decision

The major dependency is the character asset. A reflective knot is already implemented, but it cannot provide the personal character effect shown in reference 2.

Preferred route: prepare a licensed, optimized GLB character personalized to Pasindu, with a small number of useful poses or idle animations. Confirm model provenance and its suitability for web rendering before integration. The existing portrait can guide appearance, but a single photograph does not automatically provide a finished, rigged 3D model.

Fallback while preparing the character: build the real 3D laptop/workstation and camera sequence first. This allows the layout and scroll experience to be reviewed without misrepresenting a flat portrait as a fully animated 3D person.

## Implementation stages

1. **Lock the composition:** create a static hero and one featured project chapter using the proposed type, lighting, and spacing. Review the visual direction before polishing every section.
2. **Prepare the character and scene:** settle the asset route; build lighting, camera positions, responsive framing, and a static fallback.
3. **Connect motion:** implement the intro, one bounded scroll sequence, section reveals, and project mockup movement. Use a single animation owner for each element to avoid conflicting motion.
4. **Complete content:** integrate all six projects, background, experience, education, verified certificates, and contact links.
5. **Tune and verify:** test desktop and mobile, keyboard navigation, reduced motion, dialog behavior, image loading, external links, and the production build.

Retain React/Vite and the existing Three.js foundation. Add an animation library only where the chosen scroll choreography needs it; avoid a framework migration solely for this redesign.

## Performance and accessibility targets

- Render the text and navigation before the heavier 3D code finishes loading.
- Load the character and detailed scene on demand. Optimize model geometry, textures, and project screenshots before release.
- Aim for a smooth desktop experience around 60 fps on capable hardware; measure actual performance rather than promising this on every device.
- Cap pixel density, simplify the mobile scene, and stop animation work when the scene is off screen or the tab is hidden.
- Provide a static fallback for unavailable WebGL and reduced-motion users. Keep the same information and navigation available in every mode.
- Avoid sound by default, forced horizontal scrolling, and motion required to understand the content.
- Test narrow mobile widths, large desktop layouts, touch navigation, visible focus states, Escape-to-close dialogs, and all six project entries.

## Definition of done

The first screen feels personal and materially closer to the reference direction; the 3D scene supports a coherent story; projects remain the main evidence of Pasindu's work; all existing project/contact content remains reachable; and mobile/reduced-motion visitors get a complete, usable experience.

The next implementation checkpoint is the hero plus a single project chapter, followed by the complete redesign after that direction is reviewed.

## Delivered implementation

- Replaced the original lime/knot composition with a personal hero, violet/cyan lighting, and an optimized transparent portrait generated from the existing profile photograph.
- Added a live Three.js particle field and orbital line, pointer parallax, a scroll response in the hero, section reveals, subtle floating details, and perspective browser/phone mockups.
- Added the floating section navigation inspired by reference 3, with active-section highlighting and a compact mobile layout.
- Delivered all three featured project chapters, an archive with all six projects and web/mobile filters, a portrait/about section, technology tabs, an expandable experience/education timeline, and contact links with copy-email.
- The portrait is a raster asset. It is not a rigged 3D person. A GLB character and a pinned camera-to-workstation story remain future enhancements; they are not represented as completed.
- The page uses standard vertical scrolling. Mobile and reduced-motion modes preserve the content without requiring the decorative motion.
