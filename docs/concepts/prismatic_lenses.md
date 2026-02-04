# Concept: The Prismatic Lenses

*This document details the design concept for visualizing the three core lenses—Ego, Soul, and Spirit. The goal is to represent these fundamental aspects of the user's energetic signature in a way that is immersive, intuitive, and integrated into the application's atmosphere.*

---

## Section 1: Core Philosophy

The three lenses are fundamental cross-sections of the user's inner world.
-   **Ego:** How energy manifests in the external world (form, action, expression).
-   **Soul:** The deep, internal motivation behind the expression (drive, emotion, "the why").
-   **Spirit:** The connection of that expression to a larger whole (resonance, connection, universality).

Visualizing them effectively is key to providing deep insight. The design approach is split into two phases: a direct, star-level implementation and a more ambitious, atmospheric concept for the future.

---

## Section 2: Phase 1 - Star-Level Implementation (Complete)

This phase focuses on making each individual star a "prismatic lens" that visually reflects its own unique energetic signature. This has been fully implemented in the `Star` and `StarAvatar` components.

-   **Ego (Form):** Controls the `border-radius` of the star's core.
    -   *Balanced (near 0):* A perfect circle, representing fluidity.
    -   *Extreme (-100 or 100):* A sharp square, representing rigidity or structure.

-   **Soul (Motion):** Controls the `animation-duration` of the star's pulse.
    -   *Balanced (near 0):* A slow, gentle, "breathing" pulse.
    -   *Extreme (-100 or 100):* A rapid, energetic, or nearly static state.

-   **Spirit (Aura):** Controls the `box-shadow` that creates the star's glow.
    -   *Balanced (near 0):* A soft, medium-sized glow.
    -   *Extreme Values:* The aura can become either a tight, contained light or a broad, radiant, and intensely colored field.

This approach provides immediate, granular feedback, turning every star into a dynamic and data-rich visual element.

---

## Section 3: Phase 2 - Global Atmospheric Concept (Future)

This phase remains a future concept and is **not yet implemented**. It extends the "lens" metaphor from individual stars to the entire application atmosphere.

The idea is to treat the lenses not as data to be *viewed*, but as an atmosphere to be *felt*. The overall state of each lens (calculated as an average across all 24 stars) would subtly influence the application's background visuals, turning the entire interface into a living mirror of the user's inner state.

### 3.1 Potential Visual Metaphors

-   **The Ego Lens (The Crystal):** The overall Ego balance could affect the **sharpness and definition** of the background starfield. A high flux (internal tension) could manifest as subtle, beautiful crystalline light refractions appearing in the background.

-   **The Soul Lens (The River):** The overall Soul balance could affect the **color temperature** of the ambient light in the cosmos (shifting from cool blues to warm reds). A high flux could create more vibrant and faster-moving caustic light effects shimmering in the background.

-   **The Spirit Lens (The Cosmos):** The overall Spirit balance could affect the **clarity of the distant view**. A low equilibrium (disconnected) might apply a very subtle `blur` to the most distant star layers. A high flux could make the "cosmic web" of faint, ethereal lines between stars more visible and active.

This ambitious second phase would provide a powerful, immersive, and non-analytical way for users to feel the total state of their inner cosmos at a glance.