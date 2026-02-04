# Pulse: Technical Implementation Plan

*Timestamp: 2024-08-11*

This document outlines the technical steps required to bring the integrated Atlas, Glyphs, and Lenses concepts to life, translating the design vision into actionable development phases. It should be read in conjunction with the corresponding design concept documents.

---

## Phase 16: The Art Engine Integration (Pulse 3.0)

**STATUS: PLANNED**

This phase marks the migration from standard CSS/SVG to the "Deep Liquid" Art Engine, utilizing the new tech stack to achieve organic, generative visuals.

1.  **Core Library Integration:**
    -   Install and configure **Paper.js** (for vector noise/ink lines).
    -   Install and configure **p5.js** (for fluid/watercolor generation).
    -   Install and configure **Three.js** (for atmospheric background shaders).
    -   Install **GSAP** (GreenSock) for high-fidelity motion control.

2.  **Migrate Background (Atmosphere):**
    -   Replace `Background.tsx` with a Three.js canvas.
    -   Implement a custom GLSL fragment shader to generate the "Deep Liquid" noise texture (replacing the static CSS gradient).

3.  **Migrate Domains (Ink Washes):**
    -   Replace the `LivingNebula` component with a p5.js sketch.
    -   Implement fluid dynamics or generative "blooms" that react to the `isActive` state using subtractive blending modes.

4.  **Refactor Nodes (Bioluminescence):**
    -   Update the `Star` component to use Paper.js paths.
    -   Apply vector noise to the paths to create "wobbly," organic edges that fluctuate based on the Node's Flux value.

---

## Phase 15: Visualization Richness & UI Refinement

**STATUS: COMPLETE**

This phase adds a new layer of intuitive richness to the data visualizations and further refines the UI for better scannability and insight.

1.  **Add Star Glyphs to `DataPoint`:**
    -   The `DataPoint.tsx` component has been updated to accept an optional `starGlyphs` prop.
    -   When this prop is provided, it now renders individual star glyphs along its track, positioned according to each star's equilibrium value.
    -   `SoulAtlasView.tsx` has been updated to calculate and pass this data for the Lenses and Primary Energies tabs, creating an intuitive "scatter plot" visualization.

2.  **Redesign "Highlights" Tab:**
    -   The layout for the "Highlights" tab in `SoulAtlasView.tsx` has been refactored.
    -   It now uses a flexbox container with `overflow-x-auto` for each category (Pronounced, Balanced, etc.), creating horizontally scrolling sections that are more scannable and mobile-friendly.

3.  **Enhance AI "Master Prompt":**
    -   The glossary section of the prompt generation logic in `SoulAtlasView.tsx` has been updated.
    -   It now includes a clear explanation of how the 5 qualitative answers on the spectrum correspond to approximate numeric points (-80, -40, 0, 40, 80), providing the AI with deeper context on the user's choices.

---

## Phase 14: Visualization Overhaul

**STATUS: COMPLETE**

This phase is a complete overhaul of the data visualization philosophy within the Soul's Atlas. It moves away from bar charts to a more accurate and intuitive "point-and-spread" system and transforms the central Atlas into a powerful, holistic radar chart.

1.  **Replace `DataBar` with `DataPoint`:**
    -   The `DataBar.tsx` component has been deleted and replaced with a new `DataPoint.tsx` component.
    -   The new component visualizes equilibrium as a single, colored "dot" on a track, accurately representing a single score.
    -   The "Flux" is now a glowing "aura" centered on the dot, intuitively representing the complexity or spread around that central point.
    -   All verbose explanatory text has been removed from the component.
    -   `SoulAtlasView.tsx` has been updated to use this new component for all data displays.

2.  **Transform `LivingMandala` into Radar Chart:**
    -   The `LivingMandala.tsx` component has been completely rebuilt to function as a "Cosmic Signature" radar chart.
    -   It now uses SVG to render four axes for the primary energies (Doing, Being, Seeing, Feeling).
    -   A central "balance ring" represents a score of 0.
    -   A `<polygon>` is drawn whose vertices are determined by the equilibrium scores of the four primary energies, providing a holistic shape of the user's cosmos.
    -   A larger, softer "flux field" is drawn behind the main signature to visualize the overall complexity.

---

## Phase 13: Deep Exploration & Visualization Accuracy

**STATUS: COMPLETE**

This phase perfects the Soul's Atlas data visualizations, introduces a new, deeper level of interactive exploration, and refines the user interface for utility features.

1.  **Fix `DataBar` Visualization Bug:**
    -   The CSS for the equilibrium bar in `DataBar.tsx` has been re-engineered to use a positioned inner element with a directional `linear-gradient`. This ensures the bar's color and direction are always correct for both positive (gold-to-red) and negative (gold-to-indigo) values, resolving a critical data visualization error.

2.  **Implement Three-Level Drill-Down:**
    -   The `DataBar` component has been updated to be expandable when it represents an individual star.
    -   `SoulAtlasView.tsx` now manages an `expandedStars` state to render the nested `DataBar`s for a star's Ego, Soul, and Spirit attributes, allowing for incredibly granular data exploration.

3.  **Enhance Data Clarity:**
    -   An explanatory text block has been added to expanded `DataBar`s, clearly defining "Equilibrium" and "Flux" for the user to improve data literacy.

4.  **Improve Utility Controls:**
    -   A new floating UI panel has been added to the "Cosmic Reading" tab in `SoulAtlasView.tsx`.
    -   This panel groups the "Export Reading," "Show Prompt," and a new "Copy Prompt" button for improved usability and a cleaner layout. The copy functionality uses the browser's Clipboard API.

---

## Phase 12: Interactive Exploration & Utility

**STATUS: COMPLETE**

This phase transforms the Soul's Atlas from a static report into a dynamic tool for exploration and adds key utility features.

1.  **Fix `DataBar` Visualization Bug:**
    -   The CSS for the equilibrium bar in `DataBar.tsx` has been fixed to conditionally use `left: '50%'` or `right: '50%'`. This ensures the bar always extends from the center in the correct direction, resolving a critical data visualization error.

2.  **Implement Interactive Drill-Down:**
    -   The `DataBar` component has been updated to be expandable. The title is now a button that toggles visibility of child data.
    -   New utility functions (`calculateStarAverages`, `calculateLensDataByQuadrant`) have been added to `utils/cosmosAnalysis.ts` to provide the granular data needed for the drill-downs.
    -   `SoulAtlasView.tsx` now manages an `expandedSections` state to render the nested `DataBar` components, allowing users to explore the composition of each primary metric.

3.  **Enhance AI Prompt for Balancing:**
    -   The "master prompt" generation in `SoulAtlasView.tsx` has been updated. It now includes the user's overall Lens Balances (Ego, Soul, Spirit) and explicitly instructs the AI to consider this data when formulating the "Balancing Practices," leading to more holistic advice.

4.  **Add "Export Reading" Functionality:**
    -   An "Export Reading" button has been added to the "Cosmic Reading" tab in `SoulAtlasView.tsx`.
    -   A handler function compiles the complete, formatted AI reading into a Markdown string and triggers a browser download, allowing users to easily save their personalized insights.

---

## Phase 11: Clarity & Readability

**STATUS: COMPLETE**

This phase is a comprehensive bugfix and polishing update that significantly improves the accuracy, readability, and intelligence of the Soul's Atlas. It corrects a major data visualization bug, perfects the rich text formatting, and provides the AI with deep, holistic context for its readings.

1.  **Fix `DataBar` Visualization Bug:**
    -   The CSS for the `DataBar` component has been fixed to ensure the equilibrium bar is always correctly centered, resolving a major visual bug.
    -   The calculation for the bar width now uses a logarithmic scale (`Math.log1p`) to expand the visual representation of nuanced values near the center.

2.  **Re-architect `RichTextViewer`:**
    -   The component has been completely rebuilt with a new recursive parser. This new approach correctly handles nested formatting (e.g., bold text inside a colored tag), fixing the critical bug where raw formatting tags (`<pos>`, `<neg>`, etc.) were being displayed as plain text.

3.  **Enhance AI "Master Prompt":**
    -   The `handleGenerateReading` function in `SoulAtlasView.tsx` has been re-engineered to provide the Gemini API with a deep, holistic "briefing."
    -   The prompt now includes the user's **complete 24-star cosmos**, with each star explicitly mapped to its Quadrant and Primary Energies, along with an enriched glossary that includes a scoring guide and a more nuanced definition of "Flux."

4.  **Polish UI in `SoulAtlasView`:**
    -   The "Balance" tab in the Cosmic Reading view has been correctly relabeled to "Balancing Practices."
    -   The "Show Prompt" button has been moved to a more distinct and consistent location.

---

## Phase 10: The Master Prompt

**STATUS: COMPLETE**

This phase re-engineers the AI prompt generation system to provide deep, holistic context to the Gemini API, resulting in more insightful and personalized "Cosmic Readings." It also addresses a critical data visualization bug.

1.  **Fix Data Visualization Bug:**
    -   The `QUADRANTS_DATA` array in `constants.ts` has been reordered to its canonical order (`q1, q2, q3, q4`). This corrects a bug where data was being misapplied to the wrong quadrants in the Soul's Atlas view.

2.  **Engineer the "Master Prompt":**
    -   The `handleGenerateReading` function in `SoulAtlasView.tsx` has been completely rebuilt.
    -   It now constructs a single, comprehensive "master prompt" that includes:
        -   A **Glossary** of core concepts (Quadrants, Lenses, Energies).
        -   The user's complete **Energetic Landscape** (Equilibrium and Flux for all realms).
        -   **Star Deep Dives:** Full contextual data (description, questions, spectrum, and user's value) for the user's most pronounced stars.
    -   This new prompt provides the AI with a rich "briefing" to generate a much more nuanced and accurate reading.

3.  **Expand Rich Text Formatting:**
    -   The prompt now instructs the AI to use new quadrant-specific color tags (e.g., `<q1>`).
    -   The `RichTextViewer.tsx` component has been updated to parse and render these new tags with appropriate colors.

---

## Phase 9: Expressive Insights & Transparency

**STATUS: COMPLETE**

This phase enhances the Soul's Atlas by improving the clarity of its data visualizations and making the AI-powered "Cosmic Reading" a more dynamic and transparent experience.

1.  **Enhance `DataBar` Visualization:**
    -   The `DataBar` component has been updated to use a non-linear (square root) scale for its equilibrium bar. This makes small deviations from the central "balanced" line more visually prominent, ensuring that balanced states are clearly and insightfully represented.

2.  **Implement Rich Text for Cosmic Readings:**
    -   The prompt sent to the Gemini API in `SoulAtlasView` has been updated to explicitly request rich formatting, including Markdown (`**bold**`, `*italic*`) and custom color tags (`<pos>`, `<neg>`, `<bal>`).
    -   A new `RichTextViewer` component has been created to parse this formatted string and render it as styled React elements, transforming the plain text output into a more dynamic and scannable narrative.

3.  **Add Prompt Transparency:**
    -   A "Show Prompt" button has been added to the "Cosmic Reading" tab in `SoulAtlasView`. This allows users to see the exact, detailed prompt that is constructed from their data and sent to the model, providing full transparency into the generative process.

---

## Phase 8: The Oracle's Atlas

**STATUS: COMPLETE**

This phase represents a complete overhaul of the Soul's Atlas, transforming it into a powerful tool for deep reflection with richer visualizations and a more streamlined, comprehensive AI inquiry process.

1.  **Create New `DataBar` Visualization:**
    -   The text-based `AnalysisCard` component has been replaced by a new, more sophisticated `DataBar` component.
    -   This component visually represents `Equilibrium` as a horizontal bar extending from a central point, `Flux` as a glowing "aura" around the bar, and the user's personal min/max value range as contextual markers.

2.  **Implement Single-Call "Cosmic Reading":**
    -   The "Cosmic Inquiry" tab in `SoulAtlasView` has been redesigned. It now features a single button that triggers a comprehensive API call to the Gemini API.
    -   The prompt is engineered to request a full, structured JSON object containing a Global Summary, Strengths, Shadows, Archetypes, and new Balancing Practices.
    -   The results are then displayed in a clean, tabbed interface, preventing user fatigue from multiple API calls.

3.  **Add "Cosmic Highlights" Feature:**
    -   A new "Highlights" tab has been added to the Atlas.
    -   New utility functions in `utils/cosmosAnalysis.ts` programmatically analyze the user's data to find and display the most pronounced/balanced stars and the most complex/harmonious realms without requiring an AI call.

4.  **Introduce "Balancing Practices"**
    -   The consolidated AI prompt now includes a request for balancing practices, specifically contextualized around the universal energies of Doing/Being (Masculine/Feminine) and Seeing/Feeling (Light/Dark).

---

## Phase 7: Cosmic Inquiry and Deep Analysis

**STATUS: COMPLETE**

This phase transforms the Soul's Atlas from a static summary into a dynamic hub for deep, personalized reflection using generative AI.

1.  **Expand Data Calculation:**
    -   The `utils/cosmosAnalysis.ts` utility is expanded to calculate Equilibrium and Flux for two new cross-sections of the user's data:
        -   **The Three Lenses:** Ego, Soul, and Spirit.
        -   **The Four Primary Energies:** Doing, Being, Seeing, and Feeling.

2.  **Re-architect `SoulAtlasView`:**
    -   The component is rebuilt with a tabbed navigation system to present the different analytical views (Overview, Lenses, Energies).
    -   A new "Cosmic Inquiry" tab is added to serve as the interface for generative features.

3.  **Integrate Gemini API for Generative Insights:**
    -   Implement API calls within `SoulAtlasView` to generate four distinct types of content:
        -   A holistic **Global Summary**.
        -   An analysis of archetypal **Strengths** (based on over-expressed energies).
        -   An exploration of **Shadows** (based on under-expressed energies).
        -   The discovery of emergent **Archetypes** or "hidden constellations" within the user's data.
    -   Implement robust loading and error handling states for the generative UI.

---

## Phase 6: UI/UX & Onboarding Polish

**STATUS: COMPLETE**

This phase addresses a collection of user experience refinements to improve flow, clarity, and visual polish throughout the application.

1.  **Enhance Onboarding:**
    -   Make the onboarding overlay non-interactive (`pointer-events-none`) to allow users to pan and zoom the background `SkyMap` during the cinematic.
    -   Refine onboarding text formatting in the `Onboarding.tsx` component to remove unnecessary line breaks for better readability.
    -   Update `OnboardingEnergies.tsx` to enhance the nebula reveal animation, ensuring energy orbs move to merge before the nebula appears and grows.

2.  **Improve Interaction Logic:**
    -   In `Star.tsx`, add logic to disable pointer events if the parent quadrant is not active, preventing clicks from the main galaxy view.
    -   Implement hover-to-show-name logic for stars within `Star.tsx` to reduce visual clutter in the quadrant view while ensuring glyphs remain visible for defined stars.

---

## Phase 5: Implement Living Nebulas

**STATUS: COMPLETE**

This phase replaces the original, static SVG nebulas with a dynamic, multi-layered, and borderless visual system for a more immersive and atmospheric experience.

1.  **Replace `NebulaShape.tsx`:**
    -   The existing `NebulaShape.tsx` component will be deleted.
    -   A new component, `components/LivingNebula.tsx`, will be created to take its place.
    -   The `Quadrant.tsx` component will be updated to use this new `LivingNebula` component.

2.  **Implement Layered Cloud System:**
    -   The `LivingNebula` component will render a container `div` and apply a `filter: blur()` property to individual cloud layers inside.
    -   Inside this container, it will render 3-5 absolutely positioned "cloud layer" `div`s.
    -   Each layer will have a `radial-gradient` background based on the quadrant's colors, along with varying sizes, opacities, and organic `border-radius` values to create depth and shape.

3.  **Add New CSS Animations:**
    -   New keyframe animations (`churn-1`, `churn-2`, etc.) will be added to `index.html`.
    -   These animations will apply slow, non-synchronous `transform` changes to each cloud layer, making the nebulas appear to churn and evolve organically over long periods.

4.  **Refine Nebula Visuals:**
    -   Add a subtle noise texture overlay to the nebula to add detail and a more gaseous feel.
    -   Adjust the `blur()` filter value to strike a balance between softness and definition, giving the clouds more discernible shape.

---

## Phase 4: Prismatic Lenses as Star-Level Effects

**STATUS: COMPLETE**

This phase infuses individual stars with a dynamic visual language reflecting the user's input for each of the three lenses.

1.  **Refactor the `Star` Component:**
    -   The `Star` and `StarAvatar` components will be updated to dynamically alter their CSS properties based on the star's attribute values.
    -   **Ego (Form):** The `border-radius` of the star's core will be controlled by the Ego attribute. A value near 0 creates a perfect circle, while values at the extremes (-100 or +100) create a sharp square.
    -   **Soul (Motion):** The `animation-duration` of the star's pulse effect will be driven by the Soul attribute. A balanced value results in a slow, gentle pulse, while extreme values create a more rapid or nearly static animation.
    -   **Spirit (Aura):** The `box-shadow` properties (color, spread, opacity) that create the star's glow will be dynamically calculated based on the Spirit attribute, creating auras that range from tight and contained to broad and radiant.
2.  **Ensure Visual Consistency:**
    -   The logic for these visual effects will be shared or mirrored between the small `Star` component on the map and the larger `StarAvatar` in the detail view to provide a cohesive experience.
---

## Phase 3: Mandala Interactivity & The Full Atlas View

**STATUS: COMPLETE**

This phase makes the mandala explorable, turning it into a gateway for deeper reflection.

1.  **Enable Mandala Interaction:**
    -   The `LivingMandala` component will become clickable once a certain number of stars are defined. Its appearance will change (e.g., a gentle pulse) to invite interaction.
    -   Clicking it will trigger a new `handleEnterAtlasView` function in the `App` component.

2.  **Create the `SoulAtlasView`:**
    -   Develop a new full-screen component, `components/SoulAtlasView.tsx`.
    -   This view will be triggered by a new state, `isAtlasViewActive`.
    -   It will feature a large, detailed version of the Living Mandala, along with textual descriptions of the Equilibrium and Flux for each quadrant, providing a dedicated space for reflection.

3.  **Implement Smooth Transitions:**
    -   A seamless animated transition (zoom/fade) will be created to move the user from the `SkyMap` into the `SoulAtlasView`, making it feel like they are "entering" the heart of their cosmos.

---

## Phase 2: Glyphs as Ambient Language

**STATUS: COMPLETE**

Next, we'll develop the unique glyphs and weave them into the UI.

1.  **Define Static Glyph SVGs:**
    -   Create a new component, `components/icons/StarGlyphs.tsx`, to house the 24 static, archetypal SVG path definitions for each star quality. This acts as a centralized library of our symbolic language.

2.  **Create and Integrate the `StarGlyph` Component:**
    -   Create a small, efficient component, `components/StarGlyph.tsx`, that accepts a `starName` prop.
    -   This component will look up the corresponding SVG icon from `StarGlyphs.tsx` and render it.
    -   In `Star.tsx`, this component will be used to display a subtle, monochrome glyph next to the name of a *defined* star.
    -   In `StarDetailView.tsx`, a larger, more prominent version of the glyph will appear in the header next to the star's name.

---

## Phase 1: The Living Mandala (Core Functionality)

**STATUS: COMPLETE**

The first priority is to create the central, living mandala that provides immediate feedback to the user. This has been redesigned into an ethereal, line-based "Astrolabe" visualization.

1.  **Expand Data Calculation Utilities:**
    -   The `utils/cosmosAnalysis.ts` file calculates Equilibrium and Flux for Quadrants, Lenses (Ego, Soul, Spirit), and Primary Energies (Doing, Being, Seeing, Feeling). This data powers the visualization.

2.  **Build the "Astrolabe" `LivingMandala` Component:**
    -   The `components/LivingMandala.tsx` component has been completely rebuilt.
    -   It renders an SVG composed of thin, luminous lines, avoiding filled shapes.
    -   **The Three Lenses:** Three concentric, rotating SVG `<circle>` elements with a `stroke-dasharray` represent Ego, Soul, and Spirit. Their stroke width and animation speed reflect their Equilibrium and Flux.
    -   **Primary Energies:** Four glowing SVG `<path>` arcs are positioned at the cardinal directions to represent Doing, Being, Seeing, and Feeling. Their opacity is tied to their energetic expression.
    -   The component's color palette is almost entirely luminous white for a refined aesthetic.

3.  **Integrate into the `SkyMap`:**
    -   The `App` component calculates all necessary data and passes it down.
    -   The `SkyMap` renders the `LivingMandala` component at the bottom-center of the screen with a high z-index (`z-40`) to ensure it is always interactive and visible above the quadrant nebulas, fixing previous interaction issues.