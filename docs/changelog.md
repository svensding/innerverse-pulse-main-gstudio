# Pulse App Changelog

All notable changes to this project will be documented in this file.

---

## [4.4.0] - "Cosmic Alignment & Flow" - 2024-08-13

This is a significant user experience update focused on correcting core layout issues and refining the onboarding journey, ensuring the application feels intuitive and polished from the very first moment.

### 🐛 Bug Fixes & Refinements
-   **Cosmos Centering Fixed:** The initial view of the cosmos now correctly centers within the user's viewport on both desktop and mobile devices. This resolves a critical issue where users had to manually find the content upon loading the app, providing a seamless and intuitive start to the experience.
-   **Quadrant Positions Corrected:** Fixed a fundamental layout error by swapping the positions of the "Do & Feel" and "Be & See" quadrants. The sky map now correctly reflects the application's core energetic grid: 'See' energies are on top, 'Feel' on the bottom, 'Do' on the left, and 'Be' on the right.
-   **Onboarding Text Flow:** Improved the text layout during the onboarding cinematic. Strong tags no longer create unnecessary line breaks, resulting in a smoother, more natural and aesthetically pleasing presentation of the introductory narrative.

---

## [4.3.0] - "The Refined Lexicon" - 2024-08-12

This is a comprehensive update to the core definitional framework of the application. It incorporates deep collaborative refinements to the star qualities, ensuring the language is more precise, resonant, and nuanced, further enhancing the quality of user reflection and AI-generated insights.

### ✨ New Features & Major Enhancements
-   **New Star - "Resilient":** The "Resilient" star has been added to the "Inner Drive" constellation, introducing the capacity to metabolize adversity into strength as a core quality for reflection.

### 🐛 Bug Fixes & Refinements
-   **Constellation Refinement:** The "Intuitive" star has been removed to create a more focused and distinct set of core qualities. The "Inner Drive" constellation now features "Resilient" in its place.
-   **"Wise" Star Recalibration:** The Ego lens for the "Wise" star has been significantly reframed with a new prompt and spectrum to better capture the quality of one's inner perspective in complex situations.
-   **Comprehensive Wording Audit:** Over a dozen specific terms across the attribute spectrums (e.g., "Aloof," "Fickle," "Enmeshed") have been updated for greater precision and to eliminate ambiguity, improving the integrity of the entire reflective experience.

---

## [4.2.0] - "The Oracle's Nuance" - 2024-08-11

This update focuses on adding a new layer of intuitive richness to the data visualizations and further refining the AI's contextual understanding, leading to a more insightful and scannable user experience.

### ✨ New Features & Major Enhancements
-   **Star Distribution Glyphs:** The `DataPoint` visualizations for aggregated data (Lenses and Primary Energies) have been significantly enhanced. They now display the individual star glyphs distributed along the track according to their specific equilibrium values. This provides a rich, at-a-glance "scatter plot" of the energies that contribute to the overall balance, making the data far more intuitive.
-   **Redesigned Highlights Tab:** The "Cosmic Highlights" tab has been redesigned with clean, horizontally scrolling sections. This improves scannability by allowing the user to focus on one category at a time (e.g., "Most Pronounced Stars") and creates a more focused, less cluttered interface.
-   **Enhanced AI Glossary:** The "master prompt" sent to the Gemini API has been refined. The glossary now explicitly explains how the 5 qualitative answers on the spectrum (e.g., "Scattered" to "Robotic") relate to the final numeric score, guiding the AI to generate even more nuanced and accurate interpretations.

---

## [4.1.0] - "The Compassionate Oracle" - 2024-08-10

This is a philosophical refinement of the AI's interpretive model. It addresses user feedback that the system could feel too critical or focused on "problems." This update ensures the AI honors states of balance as strengths and frames its guidance as gentle, reflective invitations rather than prescriptive fixes.

### ✨ New Features & Major Enhancements
-   **Honoring Balance:** The AI "master prompt" has been significantly updated to change its core perspective.
    -   It is now explicitly instructed to treat balanced expressions (-20 to 20) as states of **strength, conscious integration, and mindful choice** that should be actively **acknowledged and honored**, not just seen as a neutral baseline.
    -   The AI's primary goal has been updated to look for harmony just as much as it looks for tension, providing a more holistic and affirming reading.
-   **Reflective Practices, Not Just Exercises:** The prompt for the "Balancing Practices" section has been rephrased.
    -   It no longer asks for "exercises," which can imply something is wrong. Instead, it requests **"gentle invitations for reflection or simple practices that honor the user's current state."**
    -   This encourages the AI to generate suggestions for *maintaining and appreciating* balance, in addition to providing guidance for exploring energies at the extremes.

---

## [4.0.0] - "The Oracle's Eye" - 2024-08-09

This is a complete overhaul of the data visualization philosophy within the Soul's Atlas. It moves away from bar charts to a more accurate and intuitive "point-and-spread" system and transforms the central Atlas into a powerful, holistic radar chart. These changes make the data dramatically easier to read and more insightful at a glance.

### ✨ New Features & Major Enhancements
-   **New "Data Point" Visualization:** The `DataBar` component has been completely replaced by a new `DataPoint` component.
    -   **Equilibrium Dot:** A single, colored dot on a track now represents the equilibrium score, clearly communicating it as a single point rather than a range.
    -   **Flux Aura:** The "Flux" is now a glowing aura centered on the dot, intuitively representing the "spread" or complexity around that central point.
    -   **Cleaner Interface:** Verbose explanatory text has been removed, as the new visualization is more intuitive and self-explanatory.
-   **New "Cosmic Signature" Radar Chart:** The central "Astrolabe" is no longer just decorative; it has been transformed into a functional **"Cosmic Signature" radar chart**.
    -   It features four axes for Doing, Being, Seeing, and Feeling.
    -   A central "balance ring" represents a score of 0.
    -   The user's unique energetic shape is drawn on the chart, showing over- or under-expression at a glance.
    -   A larger, softer "flux field" is drawn behind the main signature, visualizing the overall complexity of the user's cosmos.

### 🐛 Bug Fixes & Refinements
-   **Confirmed Primary Energy Mapping:** The logic for assigning stars to primary energies has been reviewed and confirmed to correctly assign exactly 6 stars to each of the four primary energies, ensuring a balanced analytical structure.

---

## [3.5.0] - "The Oracle's Lens" - 2024-08-08

This is a comprehensive update that perfects the Soul's Atlas data visualizations, introduces a new, deeper level of interactive exploration, and refines the user interface for utility features. The Atlas is now a more accurate, intuitive, and genuinely useful tool for granular self-reflection.

### ✨ New Features & Major Enhancements
-   **Deep Drill-Down (3 Levels):** The interactive exploration has been deepened. Users can now click on an individual **Star** within an expanded quadrant to reveal a new, third level of detail: the specific `DataBar`s for its **Ego, Soul, and Spirit** lenses. This allows for an incredibly granular and insightful analysis of one's inner cosmos.
-   **Enhanced Data Clarity:** To make visualizations more intuitive, expanded `DataBar`s now include a small, clear explanation of what "Equilibrium" and "Flux" represent for the user.
-   **Improved Utility Controls:** The "Export Reading," "Show Prompt," and a new **"Copy Prompt"** button have been grouped together in a sleek, floating panel at the bottom of the "Cosmic Reading" screen for easy access and improved usability.
-   **Richer Balancing Practices:** The AI "master prompt" has been enhanced with a more explicit example of how to consider the interplay of the Three Lenses when generating Balancing Practices, leading to more nuanced and holistic suggestions.

### 🐛 Bug Fixes & Refinements
-   **Corrected Data Visualization:** Fixed the critical rendering bug in the `DataBar` component's gradient and direction. The equilibrium bar now correctly extends from the center with the proper color gradient—indigo-to-gold for under-expressed (negative) values and gold-to-red for over-expressed (positive) values.

---

## [3.4.0] - "The Oracle's Depth" - 2024-08-07

This is a major feature update that transforms the Soul's Atlas from a static report into a dynamic tool for exploration. It introduces interactive drill-down capabilities for all data visualizations, enhances the AI's wisdom, and adds a crucial utility for exporting personalized readings.

### ✨ New Features & Major Enhancements
-   **Interactive Drill-Down:** The Atlas is no longer a static view. Users can now click on any primary data bar (e.g., a Quadrant, a Lens, or a Primary Energy) to "unfold" it and see the constituent data it's composed of. This allows for a much deeper, multi-layered exploration of one's inner cosmos.
-   **Richer Balancing Practices:** The "master prompt" has been enhanced to provide the Gemini API with data on the user's Three Lenses (Ego, Soul, Spirit). It is now explicitly instructed to consider this data when generating Balancing Practices, leading to more nuanced and holistic suggestions.
-   **Export Your Cosmic Reading:** A new "Export Reading" button has been added to the "Cosmic Reading" tab. This allows users to instantly download a neatly formatted Markdown file of their complete, personalized reading for offline reflection or sharing.

### 🐛 Bug Fixes & Refinements
-   **Corrected Data Visualization:** Fixed the critical rendering bug in the `DataBar` component. The equilibrium bar now correctly extends from the center to the left for negative values and to the right for positive values, providing an accurate at-a-glance reading of the user's energetic balance.

---

## [3.3.0] - "The Oracle's Clarity" - 2024-08-06

This is a comprehensive update that addresses several critical bugs and significantly enhances the intelligence of the AI-powered "Cosmic Reading." The Soul's Atlas is now a more accurate, transparent, and powerful tool for reflection.

### 🐛 Bug Fixes & Refinements
-   **Corrected Data Visualization:** Fixed a critical CSS alignment bug in the `DataBar` component that caused all equilibrium bars to render incorrectly. The data visualizations now accurately reflect the positive or negative balance of each energetic realm.
-   **Robust Rich Text Parsing:** Completely re-architected the `RichTextViewer` component with a new recursive parser. This fixes a major bug where raw formatting tags (e.g., `<pos>`) would appear in the text, and it now correctly handles any combination of nested bold, italic, and color tags.
-   **UI Polish:** Minor UI layout improvements were made to the "Cosmic Reading" tab for better clarity and consistency, including relabeling the "Balance" tab to "Balancing Practices."

### ✨ New Features & Major Enhancements
-   **Deep Context "Master Prompt":** The logic for generating the Cosmic Reading has been completely rebuilt to provide the Gemini API with a rich, holistic understanding of the entire application and the user's unique data. The prompt now includes:
    -   The user's **Complete 24-Star Cosmos**, with each star explicitly mapped to its Quadrant and Primary Energies.
    -   An **Enriched Glossary** that provides the AI with a qualitative guide to the scoring spectrum and a more nuanced definition of "Flux."
    -   Clear **User Journey Context** to guide the AI's tone toward compassionate reflection.
-   **Insightful Non-Linear Data Bars:** The `DataBar` visualization now uses a logarithmic scale. This expands the visual representation of nuanced, balanced values near the center and condenses the extremes, making the charts much more insightful and easier to read at a glance.

---

## [3.2.0] - "The Oracle's Wisdom" - 2024-08-04

This update is a major enhancement to the intelligence and accuracy of the Soul's Atlas. It fixes a critical data visualization bug and completely re-engineers the AI prompt system to provide the model with deep, holistic context, resulting in significantly more insightful and personalized "Cosmic Readings."

### ✨ New Features & Major Enhancements
-   **Deep Context "Master Prompt":** The logic for generating the Cosmic Reading has been completely rebuilt. The new "master prompt" now provides the Gemini API with a rich, holistic understanding of the entire application and the user's unique data, including:
    -   A **Glossary** of core concepts (Quadrants, Lenses, Energies).
    -   The user's complete **Energetic Landscape** (Equilibrium and Flux data for all realms).
    -   **Star Deep Dives:** For the user's most pronounced energies, the AI is now given the full context: the star's description, the exact questions they were asked, the full spectrum of possible answers, and their specific numeric value.
-   **Expanded Rich Text Formatting:** The AI can now use new, quadrant-specific color tags (`<q1>`, `<q2>`, etc.) in its response, adding another layer of visual context to the generated reading.

### 🐛 Bug Fixes & Refinements
-   **Corrected Data Visualization:** Fixed a critical bug where the `QUADRANTS_DATA` was in the wrong order, causing the data visualizations in the Soul's Atlas to be incorrectly mapped to the UI. All data bars now accurately reflect the user's defined cosmos.

---

## [3.1.0] - "The Oracle's Voice" - 2024-08-03

This update focuses on enhancing the clarity, insight, and transparency of the Soul's Atlas. It introduces more expressive data visualizations that make subtle balances more apparent and transforms the AI-generated "Cosmic Reading" into a richly formatted, dynamic narrative.

### ✨ New Features & Major Enhancements
-   **Expressive Data Bars:** The `DataBar` visualization has been updated to use a non-linear (square root) scale. This makes small deviations from the central "balanced" line much more visually prominent, ensuring that even states of near-balance are presented as clear and insightful data points.
-   **Rich Text Cosmic Readings:** The AI-generated text is no longer plain. The cosmic reading now features rich formatting to improve readability and add layers of meaning:
    -   Key concepts appear in **bold** or *italic*.
    -   <span style="color: #f87171;">Over-expressed</span> qualities are highlighted in a subtle red.
    -   <span style="color: #818cf8;">Under-expressed</span> qualities are highlighted in a cool indigo.
    -   <span style="color: #f59e0b;">Balanced</span> qualities are highlighted in a gentle gold.
-   **Full Prompt Transparency:** A "Show Prompt" button has been added to the Cosmic Reading tab. This allows users to see the exact, detailed prompt that is constructed from their data and sent to the Gemini API, providing full transparency into the generative process.

---

## [3.0.0] - "The Oracle's Atlas" - 2024-08-02

This is a complete overhaul of the Soul's Atlas, transforming it from a simple data summary into a powerful, multi-layered oracle for self-discovery. It introduces rich new data visualizations, a streamlined and more powerful AI inquiry model, and new ways to find immediate, actionable insights in your data.

### ✨ New Features & Major Enhancements
-   **New `DataBar` Visualization:** All text-based analysis cards have been replaced with a sophisticated new `DataBar` component.
    -   **Equilibrium Bar:** An intuitive horizontal bar shows your energetic balance at a glance, colored with a gradient from indigo (under-expressed) to gold (balanced) to red (over-expressed).
    -   **Flux Aura:** A soft, glowing "aura" around the bar visually represents the amount of internal tension or "Flux."
    -   **Personal Spectrum:** Faint markers on the bar indicate your personal minimum and maximum values used, providing crucial context to your data.
-   **One-Click "Cosmic Reading":** The Cosmic Inquiry feature has been redesigned for a more elegant experience.
    -   A single "Generate Cosmic Reading" button now triggers one comprehensive API call to generate a full suite of insights at once.
    -   The results are presented in clean, distinct tabs: Summary, Strengths, Shadows, Archetypes, and new Balancing Practices. This avoids a long, overwhelming report and eliminates repeated API calls.
-   **New "Balancing Practices" Reading:** The AI reading now includes tailored practices for finding greater equilibrium, based on the universal energies of Doing (Masculine) vs. Being (Feminine) and Seeing (Light) vs. Feeling (Dark).
-   **New "Cosmic Highlights" Tab:** A new tab programmatically analyzes your data to instantly surface key insights without needing AI, including:
    -   Your most pronounced and most balanced stars.
    -   Your most complex (high flux) and most harmonious (low flux) inner realms.

### 📚 Documentation
-   **New "For the Elders" Document:** A new, non-technical document has been created to articulate the core philosophical mission and values of the application for strategic alignment.

---

## [2.2.0] - "The Astrolabe" - 2024-08-01

This update introduces a complete, ground-up redesign of the central mandala, moving to a more sophisticated and ethereal "Astrolabe" concept. It also includes key UI/UX improvements to enhance navigation and discoverability.

### ✨ New Features & Major Enhancements
-   **New "Astrolabe" Mandala Design:** The previous mandala design has been completely replaced with a new visualization inspired by ancient astrolabes and armillary spheres.
    -   The new design is composed entirely of thin, luminous, rotating lines and arcs, creating a more sophisticated and mythological aesthetic.
    -   The Three Lenses (Ego, Soul, Spirit) are now represented by concentric rings, and the Four Primary Energies are represented by glowing arcs at the cardinal points.
    -   The color palette is now almost exclusively luminous white for a more refined, cohesive look.
-   **Dedicated "Open Atlas" Button:** A new button has been added to the bottom-left of the screen. It appears once the first star has been defined, providing a clear and persistent entry point to the Soul's Atlas view.

### 🐛 Bug Fixes & Refinements
-   **Mandala Interaction Fix:** The mandala has been repositioned and given a higher z-index to ensure it is always interactive and no longer blocked by the background quadrant nebulas.

---

## [2.1.0] - "The Living Atlas" - 2024-07-31

This update focuses on a complete redesign of the central mandala and major improvements to user flow and interactivity, transforming the core visual and user experience.

### ✨ New Features & Major Enhancements
-   **Complete Mandala Redesign:** The old, quadrant-based mandala is replaced with a new, intricate, multi-layered "Soul's Atlas." This new design visualizes:
    -   **Primary Energies:** Four soft, overlapping energy fields for Doing, Being, Seeing, and Feeling.
    -   **The Three Lenses:** Three shimmering, rotating rings representing Ego, Soul, and Spirit.
    -   **The 24 Stars:** All defined stars are rendered as individual points of light in their correct constellations.
-   **Complete Editability:** Users are no longer locked out of completed quadrants. You can now re-enter any quadrant at any time to view its story or edit individual stars.
-   **Smarter Onboarding:** The application now checks if all 24 stars have been defined on load and automatically skips the introductory cinematic for returning users with a complete cosmos.

### 🐛 Bug Fixes & Refinements
-   **Atlas Accessibility Fixed:** Corrected a z-index rendering issue that prevented the central mandala from being clicked. The Soul's Atlas is now always accessible once at least one star is defined.

---

## [2.0.0] - "The Soul's Atlas" Update - 2024-07-30

This major update transforms the Soul's Atlas from a simple summary into a dynamic, multi-faceted hub for cosmic inquiry. It introduces deep analytical tools and powerful generative features, allowing users to interpret and resonate with their defined cosmos in entirely new ways.

### ✨ New Features & Major Enhancements
-   **Multi-Faceted Atlas View:** The Soul's Atlas is now a tabbed interface, allowing users to explore their data from four different perspectives:
    -   **Overview:** The familiar view of the mandala and quadrant summaries.
    -   **The Three Lenses:** A new analysis of **Ego**, **Soul**, and **Spirit**, showing the overall balance and flux for each.
    -   **Primary Energies:** A breakdown of **Doing, Being, Seeing, and Feeling**, revealing which modes are most active or dormant.
    -   **Cosmic Inquiry:** A new generative space for deeper, AI-powered insights.

-   **AI-Powered Cosmic Inquiry (Gemini API):** Users can now generate three unique, personalized readings:
    -   **Global Summary:** A holistic narrative of the user's entire energetic signature.
    -   **Explore Strengths:** Identifies and interprets over-expressed energies as archetypal strengths.
    -   **Explore Shadows:** Illuminates under-expressed energies as dormant potential.

-   **Discover Your Archetypes:** A new feature within Cosmic Inquiry that analyzes the most pronounced energies to generate 1-2 emergent, "hidden constellation" archetypes, complete with a name, description, and mantra.

### 🐛 Bug Fixes & Refinements
-   **Quadrant Navigation:** Fixed a bug that prevented users from re-entering a quadrant after it had been completed.
-   **Mandala Rendering:** Corrected several minor bugs in the `LivingMandala` component to ensure its shape and interactivity are now rendered correctly based on user data.
-   **State Management:** Resolved a potential state mutation bug in the `SoulAtlasView` by ensuring arrays are copied before sorting.

---

## [1.1.0] - "Atmospheric Polish" Update - 2024-07-29

This update focuses on significant user experience and visual refinements, polishing the onboarding journey, improving interaction clarity, and enhancing the atmospheric quality of the cosmos.

### ✨ Onboarding Enhancements
-   **Interactive Onboarding:** Users can now pan and zoom the sky map while the onboarding cinematic plays, creating a more engaging and less restrictive introduction.
-   **Enhanced Nebula Reveal:** The animation for revealing the quadrant nebulas has been significantly improved. The core energy orbs now visibly travel to their quadrant and merge, triggering a "growth" animation for the nebula, which resolves a previous visual artifact.
-   **Improved Readability:** Onboarding text for Quadrants and Lenses has been reformatted to remove unnecessary line breaks, improving clarity and flow. Initial spacing for the four energy orbs has also been increased to prevent visual clustering.

### 🎨 UI/UX & Visual Polish
-   **Richer Nebula Visuals:** The "Living Nebulas" have been enhanced with a subtle noise texture and a slightly reduced blur effect, giving them more detail and a more defined shape without sacrificing their soft, borderless quality.
-   **Reduced Clutter in Quadrant View:** To create a cleaner viewing experience, star names within a quadrant are now hidden by default. A star's name and its archetypal glyph will now only appear on hover or when the star is selected.
-   **Smarter Star Interaction:** Stars are no longer interactive from the main galaxy view. Users must now zoom into a quadrant before they can select a star, preventing accidental taps and clarifying the user flow.

---

## [1.0.0] - "Cosmic Awakening" Update - 2024-07-26

This update marks the foundational release of Pulse, transforming it from a concept into a fully interactive experience. It introduces the core loop of self-reflection, AI-powered insight, and shareability.

### ✨ New Features & Major Enhancements

1.  **Generative Constellation Stories with Gemini API**
    -   Upon completing all stars in a quadrant, a "Reveal Story" button appears.
    -   This feature uses the Google Gemini API to generate a unique, mythic story about the user's personal constellation based on their specific attribute values.
    -   An SVG image of the user's unique constellation is also generated to accompany the story. This provides a meaningful, personalized, and creative insight that goes beyond simple data points.

2.  **State Persistence & Sharable Cosmos via URL Hashing**
    -   All user progress is now automatically encoded and saved directly into the URL hash (`#`).
    -   This allows users to bookmark their progress and return to it later.
    -   Most importantly, users can share their unique URL with others, allowing them to see the exact state of their inner cosmos.

3.  **Immersive & Cinematic Onboarding Journey**
    -   A guided, multi-step introduction sequence plays automatically for first-time users.
    -   It choreographs animated text with the gradual revealing of the four core energies (Doing, Being, Seeing, Feeling) and the four quadrant nebulas, setting the tone and explaining the core concepts of the app.

### 🎨 UI/UX & Visual Polish

1.  **Dynamic Pan & Zoom Sky Map**
    -   The entire star map is now fully interactive. Users can pan by clicking and dragging and zoom with the mouse wheel or touch gestures.
    -   Smooth, animated transitions guide the user when focusing on a specific quadrant.

2.  **Living Nebulas & Stars**
    -   Quadrant backgrounds are now procedurally generated, multi-layered, and gently animated SVG nebulas that react to mouse movement with a subtle parallax effect.
    -   Stars have a dynamic appearance. Their core color and glow are calculated based on the average of defined attributes. Defined stars also feature small orbiting "satellites" representing individual attribute energies.

3.  **Refined Controls & Fullscreen Mode**
    -   A fullscreen toggle has been added for a more immersive experience.
    -   Zoom controls and the reset button have been given a consistent, polished design.