
# Pulse User Testing Log (Initial Cohort)

*Status: Analysis in Progress*

## 1. Unfiltered Feedback Dump
- Change "Atlas" title and terminology to "check pulse" and "pulse reading" language
- Make sure that the LLM prompt for the final reading takes into account the user's chosen language and delivers the reading and section labels in that language
- Add the "pulse reading" section to localization documentation so it is also shown in spanish and dutch
- Show the Copy Input Prompt button besides the Generate Reading button in the Atlas Reading section, so the user can already select the prompt without needing the generate a reading here
- Move the sections "Lenses" "Energies" and "Highlights" as sub-sections of "Overview" in the reading so the main menu only has "Overview" and "Pulse Reading" as the options
- Store the reading, when the user closes this section and wants to return they shouldn't have to generate a new reading, unless they made changes to their definitions.
- Allow the user to increase and decrease the text size in the reading section after it is generated. Make the default bigger
- Add section dividers to the spectrum sliders so that 5 clear sections appear, and very subtly add a hint that the center is balanced, and the two ends are lack and excess
- Cycle through energetic expressions: "Next" should wrap around. 
  - *Correction:* The "Exit to Overview" condition should not be hardcoded to Node 24. It should trigger when the user presses "Next" **IF** all 24 nodes are defined, regardless of which node they are currently on.
- Onboarding: Introduce pauses after significant sections to manually explore.
- Progressive reveal: "Map Layers" (Energies -> Domains -> Expressions -> Lenses).
- Domain Clarity: SVG blobs for domains with labels to make quadrants clearer.
- Option to rename energies (Masculine/Feminine, etc.)
- **New (Mobile):** iPad/iPhone touch/placement issues (Safari).
- **New (Mobile):** Domain name/description should be below logo, not beside.
- **New (Mobile):** Zoom/Fullscreen buttons should be hidden when bottom panel is open (causes confusion).
- **New (UI Polish):** Slider visual zones are good, but the center dot is hidden behind the track gradient.
- **New (Nav Logic):** Tested cyclic navigation. Expected "Next" button to become a "Checkmark" (Finish) on *any* node once the map is fully defined (24/24), not just on Node 24. This allows immediate exit after finishing the last star.
- **New (Critical):** Pan and zoom with gestures on mobile has stopped working.
- **New (UI):** Onboarding text should get a dark outer-glow AND drop-shadow to help it stand out from the map below it on smaller screens.
- **New (UI):** The back button function should remain visible when in star details view too, not disappear.
- **New (UI):** Move the back button to row 2 instead of row 1.
- **New (UI):** Keep the fullscreen view button (only this one, not the zoom buttons) visible on the opening screen.

---

## 2. Feedback Analysis & Discussion

| ID | Raw Feedback | Tag | Technical Analysis & Approach | Status |
|----|--------------|-----|-------------------------------|--------|
| **F-01** | Change "Atlas" to "Pulse Reading" terminology | **Content** | Update `UIStrings` in `types.ts` and all `constants_*.ts` files. Rename "Atlas Reading" -> "Pulse Reading" and "Open Atlas" -> "Check Pulse". | **Done** |
| **F-02** | LLM Prompt Localization | **Bug/Feat** | Ensure the `language` prop is passed to `handleGenerateReading`. The prompt already has a slot for language instruction, verify it enforces output language strictly. | **Planned** |
| **F-04** | "Copy Prompt" button placement | **UI** | In `SoulAtlasView.tsx`, move the "Copy Prompt" button from the bottom utility bar to be inline with or immediately adjacent to the "Generate Reading" button. | **Done** |
| **F-05** | Menu Structure (Nested Overview) | **UX** | Refactor `SoulAtlasView` tabs. Combine Lenses, Energies, Highlights into the "Overview" tab as sub-sections. | **Done** |
| **F-06** | Persist Reading State | **UX** | Lift `inquiryData` state up to `App.tsx` so `SoulAtlasView` doesn't lose data on unmount. | **Done** |
| **F-07** | Text Size Control | **Access** | Add a simple state `fontSize` to `SoulAtlasView` and +/- buttons in the reading header. | **Done** |
| **F-08** | Slider Visuals (5 Sections) | **UI** | Update `AttributeSlider.tsx` with a background track divided into 5 colored/shaded zones. Added "balanced expression" label. Fixed dot z-index issue. | **Done** |
| **F-09** | Cyclic Navigation & Smart Exit | **UX** | Update `handleNavigateNode` in `App.tsx`. **Logic Change:** Cycle endlessly `(i+1)%24`. **Exit Condition:** If `definedNodesCount === 24`, the "Next" button becomes "Finish" on **ANY** node. Clicking it triggers exit. | **Done** |
| **F-10** | Onboarding Pauses | **UX/Flow** | **Major Change.** Refactor `Onboarding.tsx` to support a "Paused/Waiting" state between chapters. User wants interactive exploration of just-revealed elements with a "Continue" button appearing after interaction or timer. | **Phase 3** |
| **F-11** | Map Layers / Progressive Reveal | **UX/Feat** | **Major Change.** Introduce a `viewMode` state (Energies, Domains, Expressions). | **Phase 3** |
| **F-12** | Domain SVG Blobs | **Vis** | Create `DomainShape.tsx`. Render a large, organic SVG blob/shape behind the 6 nodes of each domain. It should be the main interactive element for zooming in. | **Done** |
| **F-13** | Mobile Layout Fixes | **UI/Bug** | Stack logo/desc vertically. Hide zoom controls when panel is open. | **Done** |
| **F-14** | Mobile Gestures | **Bug** | Implement touch handlers in SkyMap for pan/zoom. | **Done** |
| **F-15** | Back Button Logic | **UI** | Move to row 2, keep visible in detail view. | **Done** |
| **F-16** | Onboarding Legibility | **UI** | Add strong shadows to text. | **Done** |

---

## 3. Design Decisions (Phase 3 Prep)

1.  **Navigation "Exit" Behavior (F-09):**
    *   *Confirmed:* When the map is complete (24/24), the "Next" button on *any* node changes to a "Finish/Check" icon. Clicking it closes the detail panel and zooms out.

2.  **Onboarding Interactivity (F-10):**
    *   *Design:* Interactivity during pauses is context-aware. (e.g., "Explore the 4 Energies" -> Show 4 directions of 1 ripple. User can explore DO/SEE/FEEL/BE).
    *   *Controls:* Main story dots show a countdown during pause. Countdown pauses if user interacts. "Continue" button appears after interaction or time.

3.  **Domain Blobs (F-12):**
    *   *Design:* Colored blobs that define the 4 quadrants. Visible as main element on zoom level 1. Become background on zoom level 2 (expressions). Main interactive click target. Sit above non-interactive blurry clouds.

4.  **Visual Metaphor (Atlas):**
    *   *Design:* Extend the Onboarding metaphors. 4 Energies = 4 directions of 1 ripple. Domains = 4 Quadrant Blobs. Lenses = Stacked layers.
