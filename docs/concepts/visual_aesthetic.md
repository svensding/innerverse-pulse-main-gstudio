# Concept: The Deep Liquid Aesthetic (Pulse 3.0)

*This document defines the visual direction for Pulse 3.0. Moving away from the "Space/Vacuum" metaphor, we adopt a "Deep Liquid" aesthetic—organic, fluid, and bioluminescent.*

---

## 1. Core Philosophy: The Inner Ocean

The visual environment represents the **internal depths** of the user. It is not a cold, empty vacuum, but a rich, living medium.
-   **Darkness:** We retain the dark theme. It represents the subconscious, the unknown, and the depth of the inner world.
-   **Fluidity:** Everything is in motion. The "weather" is hydrodynamic—currents, flows, and dispersion.
-   **Light:** Light comes from within the data (bioluminescence), not from external suns.

## 2. The Components

### 2.1 The Background (The Medium)
-   **Texture:** Instead of a flat black or starfield, the background resembles deep water or microscopic fluid.
-   **Behavior:** Subtle, slow-moving noise textures (Perlin noise) create the sensation of being suspended in a liquid medium.

### 2.2 The Domains (Formerly Quadrants)
-   **Visual:** "Nebulas" are replaced by **"Ink Washes"**.
-   **Physics:** Imagine colored ink dropped into a dark tank. It blooms, swirls, and diffuses.
-   **Blending:** We use `mix-blend-mode` (likely `screen` or `overlay` in dark mode) to allow these colored currents to overlap and create new hues where energies intersect.
-   **Motion:** Slow, churning, liquid animation. Non-linear and organic.

### 2.3 The Nodes (Formerly Stars)
-   **Visual:** "Stars" are replaced by **"Bioluminescent Nodes"** or **"Springs"**.
-   **Appearance:** They look like organic sources of light (plankton, cells, or ink sources) suspended in the dark.
-   **State Visualization:**
    -   **Balanced (0):** A steady, rhythmic pulse (like a heartbeat or jellyfish). Soft, round edges.
    -   **Dormant (-100):** Dim, small, perhaps looking "dried" or brittle (contracted ink).
    -   **Volatile (+100):** Intense brightness, rapid pulsing, or "bleeding" light (jittery edges, spilling ink).

### 2.4 The Networks (Formerly Constellations)
*Note: The concept of rigid "Constellations" has been removed. Nodes exist directly within the Domain field.*
-   **Visual:** Connections are emergent. They are **organic veins** or **currents** that may appear between highly active Nodes.
-   **Behavior:** They look like neural pathways or root systems connecting the nodes. The light "flows" along these lines rather than just being a static stroke.

## 3. Color Palette: The Deep Spectrum
We retain the semantic meaning of our colors but shift their application to fit the liquid theme.
-   **Indigo (Under-expressed):** Deep, cool currents.
-   **Gold (Balanced):** Warm, radiant bioluminescence.
-   **Red (Over-expressed):** Intense, reactive heat/blood.

---

## 4. The Tech Stack (The Art Engine)

To achieve the "Deep Liquid" (Ink & Watercolor) aesthetic, we will integrate the following specific libraries. This stack allows for organic, non-linear visuals that standard CSS cannot achieve.

### 4.1 Paper.js (The Line)
-   **Role:** Handles the "Ink" and "Structure" layers.
-   **Application:** Used to generate the "wobbly," organic lines of the Nodes and topographic maps. Paper.js excels at vector mathematics, allowing us to apply calculated noise to paths so they feel hand-drawn and "alive" rather than rigid vectors.

### 4.2 p5.js (The Fluid)
-   **Role:** Handles the "Watercolor" and "Bloom" layers.
-   **Application:** Used for generative fluid blooms and the organic "breathing" of the Nodes. It excels at per-pixel manipulation and blending modes (`multiply`, `screen`), essential for the subtractive color mixing needed for the ink effect.

### 4.3 Three.js (The Atmosphere)
-   **Role:** Handles the Background Depth.
-   **Application:** Used to create the sensation of suspension in a vast, liquid medium. We will use custom shaders (GLSL) to render the slow-moving "particulate matter" and depth fog performance-efficiently.

### 4.4 GSAP (The Motion)
-   **Role:** Handles the Physics of Time.
-   **Application:** Pulse requires slow, heavy, graceful animation easing that feels like moving through water (high viscosity). GSAP provides the precise control over easing curves needed to create this "hydrodynamic" motion.