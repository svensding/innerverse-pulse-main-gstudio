# Concept: Core Data Interpretation Principles

*This document captures the foundational philosophy for data interpretation within the Pulse app. It serves as a reference to ensure all features are designed to promote meaningful self-reflection and avoid common pitfalls.*

---

## The Guiding Question

How do we ensure the data we collect and display serves as a tool for curiosity, not judgment?

---

### 1.1 The Scoring Philosophy: A Spectrum of Relationship

The scores are a reflection of the user's current **relationship** with each quality, not a judgment of "good" or "bad." The center of the spectrum represents nuance and conscious integration, while the edges represent energies that are powerful, automatic, or currently quiet.

-   **(-20 to 20): The Balanced Expression**
    -   This indicates a quality the user interacts with consciously. It is a place of balance, flexibility, awareness, and mindful integration. It is not "neutral"; it is a space of developed affinity and conscious choice.

-   **(-100 to -60): The Quiet Quality**
    -   This describes a quality that is currently quiet. It could be dormant potential, an unfamiliar or avoided part of the self, a place of active learning that still feels difficult, or simply an energy that has not been needed.

-   **(-60 to -20): Tendency Toward Less Expression**
    -   This indicates a tendency toward a quality being less expressed.

-   **(60 to 100): The Abundant Quality**
    -   This describes a place of powerful, abundant, and often automatic energy. It could be a natural gift, an unhoned strength, a comfortable autopilot setting, or even an over-compensation. The energy here is "loud" and highly present, which may cast a shadow by leaving less room for other qualities.

-   **(20 to 60): Tendency Toward More Expression**
    -   This indicates a tendency toward a quality being more expressed.

### 1.2 The Risk of Misinterpretation

**Problem:** Users might fall into a "Good Score vs. Bad Score" mindset. A value of +95 in "Assertive" is not inherently "better" than -25; it simply indicates a different energetic expression.

**Guiding Principles:**
-   **Avoid Judgmental Language:** Never use words like "score." Use "energetic signature," "resonance," "expression," "under-expressed," and "over-expressed."
-   **Leverage AI for Nuance:** The Gemini-generated stories are the primary tool for reframing raw numbers into non-judgmental, mythic narratives. Prompts must guide the AI to interpret the *intensity* (distance from zero) and not just the positive/negative direction, using the scoring philosophy above.
-   **Discourage Perfectionism:** The UI and narratives must never imply that a perfect "0" across the board is the goal. A dynamic, tense cosmos is a living one.

### 1.3 The Necessity of Context

**Problem:** A number without context is meaningless and invites anxiety. "-70" is a judgment; "When reflecting on 'Systematic', you felt more 'Spontaneous' than 'Methodical'" is a reflection.

**Guiding Principles:**
-   **Data is a Gateway, Not a Destination:** All data visualizations must be interactive. Users should always be able to drill down from an aggregated view (like the mandala) to the individual nodes and the specific labels/prompts they responded to. The goal is to always link the data back to the user's subjective experience.

### 1.4 The Problem of Averages

**Problem:** Averages can be dangerously misleading. A quadrant with three nodes at +100 and three at -100 would have a perfect average of 0. This is not balance; it is **intense internal conflict**.

**Guiding Principles:**
-   **Visualize Distribution & Tension:** Never show an average (Equilibrium) without also indicating the distribution or variance (Flux).
-   **Introduce a "Flux" Metric:** Alongside a "Equilibrium" metric (the average), we must always calculate and display "Flux" (the standard deviation). This surfaces the critical insights that averages would otherwise hide.

### 1.5 Efficiency of Harvesting & Processing

**Problem:** The 72-point data entry is deep but demanding, risking user fatigue.

**Guiding Principles:**
-   **Consider Tiered Onboarding:** Explore a "First Light" mode where users define only a few key nodes to get an immediate, partial insight, encouraging deeper engagement over time.
-   **Maintain AI-Human Symbiosis:** The app's strength is its ability to structure user input efficiently for powerful, creative interpretation by the AI. We must lean into this division of labor.
