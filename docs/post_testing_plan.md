
# Pulse Action Plan (Post-Testing)

## Prioritization Matrix

| ID | Task Name | Complexity | Priority | Dependencies |
|----|-----------|------------|----------|--------------|
| **F-14** | **Mobile Gesture Fix (Touch Pan/Zoom)** | 3 | **Done** | None |
| F-01 | Terminology Update (Atlas -> Pulse) | 1 | Done | None |
| F-06 | Persist Reading State (Lift State) | 3 | Done | App.tsx Refactor |
| F-08 | Slider 5-Zone Visuals | 2 | Done | None |
| F-09 | Cyclic Navigation Logic | 2 | Done | None |
| F-13 | Mobile Layout Fixes | 2 | Done | None |
| F-05 | Menu Consolidation (Nested Overview) | 3 | Done | None |
| F-07 | Text Size Control | 1 | Done | None |
| F-12 | Domain Background Shapes | 3 | Done | None |
| **F-15** | **Back Button Visibility & Position** | 1 | **Done** | None |
| **F-16** | **Onboarding Text Visibility (Outer Glow)** | 1 | **Done** | None |
| F-10 | Onboarding: Interactive Flow (Refinement) | 5 | P3 | None |
| F-11 | Progressive Map Layers | 5 | P3 | F-10 |
| F-02 | LLM Localization (Refinement) | 2 | P3 | None |

---

## Execution Phases

### Phase 1: Logic & Persistence (Completed)
*Goal: Ensure the foundation is solid before visual overhauls.*
1.  **Terminology:** Rename "Atlas" -> "Pulse Reading". (Completed)
2.  **Persistence:** Lift `inquiryData` to `App.tsx`. (Completed)
3.  **Slider UI:** Add 5-zone visuals, visible ticks, and "balanced expression" label. Fixed dot z-index. (Completed)
4.  **Navigation Refinement:**
    *   Cyclic logic implemented.
    *   "Finish" (Check) icon appears on **any** node if map is complete (24/24), triggering exit on click. (Completed)
5.  **Mobile Polish:**
    *   Header layout stacked vertically.
    *   Zoom controls hidden when detail panel is open. (Completed)

### Phase 2: Pulse View Restructuring (Completed)
*Goal: Clean up the "Pulse Reading" view to be less cluttered.*
1.  **Menu Consolidation (F-05):**
    *   Refactor `SoulAtlasView` navigation.
    *   **New Hierarchy:**
        *   **Tab 1: Overview** (Contains: Mandala, Quadrant Data, Sub-sections for Lenses, Energies, Highlights).
        *   **Tab 2: Pulse Reading** (The AI generative interface).
    *   Remove top-level tabs for "Lenses", "Energies", "Highlights". (Completed)
2.  **Text Size (F-07):** Added `A+ / A-` controls in `SoulAtlasView` header. (Completed)

### Phase 3: Visual & Spatial Clarity (The "Layers" Update)
*Goal: Make the map easier to read and the journey more engaging.*
1.  **Mobile Gestures (F-14):**
    *   Restored `onTouchStart`, `onTouchMove`, `onTouchEnd` handlers in `SkyMap.tsx`.
    *   Enabled 1-finger pan and 2-finger pinch zoom on mobile devices. (Completed)
2.  **Back Button Logic (F-15):**
    *   Updated `App.tsx` header logic.
    *   Moved Back button to Row 2 next to Domain Title.
    *   Button remains visible even when a Star is selected, allowing "Up" navigation (Star -> Domain -> Home). (Completed)
3.  **Onboarding Legibility (F-16):**
    *   Enhanced `Onboarding.tsx` text styles.
    *   Added strong drop-shadow and outer glow (stacked text-shadows) to improve readability against the map background. (Completed)
4.  **Domain Visuals (F-12):**
    *   Create organic SVG shapes (`DomainBlob.tsx`) that sit behind stars but above nebulas.
    *   **Status:** Implemented and functional.
5.  **Fullscreen Visibility:**
    *   Separated Fullscreen button from Zoom controls so it remains visible on the opening screen/onboarding. (Completed)
6.  **Interactive Onboarding (F-10):**
    *   Basic implementation of "Pause" states and countdown timer is done.
    *   Future: Add specific context-aware click targets during pauses. (Deferred/P3)

### Phase 4: Visual Evolution (Future)
*Goal: Replace legacy aesthetic with new "Pulse" visual language.*
1.  **Spider Chart Redesign:** Replace the geometric astrolabe with a "Ripple/Wave" based visualization for the 4 Energies.
2.  **Glyph Evolution:** Redesign star glyphs to match the new organic aesthetic.
