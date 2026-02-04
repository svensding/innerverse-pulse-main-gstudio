# Concept: Master Prompt Design

*This document explains the philosophy and structure of the "master prompt" used to generate the "Cosmic Reading" in the Soul's Atlas. It serves as a guide for understanding how we leverage a large context window to transform a general-purpose AI into a domain-specific wisdom tool.*

---

## Section 1: Philosophy - From Data Summary to Contextual Briefing

The quality of an AI's output is a direct function of the quality of its input. A simple prompt with a few data points will yield a generic, superficial response. To generate a truly profound, personalized, and insightful narrative, we must treat the AI not as a simple text generator, but as a wise consultant who requires a comprehensive briefing.

The "master prompt" is this briefing. Its purpose is to temporarily transform the AI into a **domain expert on the Pulse application and a personal guide for the user**. Instead of just sending the user's "scores," we provide a rich, multi-layered document that includes the application's core concepts, the user's complete energetic signature, and the specific context behind their most significant data points.

---

## Section 2: The Four Pillars of the Master Prompt

The master prompt is constructed programmatically from four key pillars, each designed to build a layer of understanding for the AI.

### Pillar 1: Persona & Goal Setting
-   **What it is:** The first part of the prompt clearly defines the AI's role ("You are a wise, mythic storyteller...") and provides rich context on the user's journey. It explains that the user has been introduced to the cosmic map, learned about the energies, quadrants, stars, and lenses, and has now completed the process of defining all 72 of their attributes.
-   **Why it's important:** This immediately frames the task as a holistic synthesis—a capstone to the user's journey. It guides the AI's tone, style, and objective away from being a simple data analyst and toward being a compassionate, insightful oracle who is weaving all the threads together for the first time.

### Pillar 2: The Glossary (World-Building)
-   **What it is:** A dedicated section that defines the core terminology of the Pulse app: the Four Primary Energies, the Four Quadrants, the Three Lenses, the concept of Flux, and a detailed, compassionate **scoring philosophy** that reframes the -100 to 100 scale into a spectrum of relationship, not judgment. To provide even deeper context, the glossary now explicitly explains how the 5 qualitative answers the user chooses from (e.g., from 'Scattered' to 'Robotic') correspond to approximate numeric points on the scale.
-   **Why it's important:** This provides the foundational "world knowledge" for the AI. When the prompt later references "<q1>Do & See</q1>," the AI can refer back to the glossary to understand its deeper meaning. This prevents it from guessing and ensures its interpretations are consistent with the app's philosophy. It also helps the AI understand the *semantic weight* behind the numeric score, leading to more nuanced interpretations.

### Pillar 3: The Energetic Landscape (Holistic Data)
-   **What it is:** A complete, quantified summary of the user's Equilibrium and Flux for all quadrants and lenses.
-   **Why it's important:** This gives the AI a high-level "map" of the user's entire cosmos. It can see at a glance which realms are balanced, which are in tension, and how the different lenses (Ego, Soul, Spirit) interact. This holistic view is crucial for generating a cohesive global summary.

### Pillar 4: Star Deep Dives (Granular Nuance)
-   **What it is:** This is the most critical pillar for personalization. The prompt now includes the data for **all 24 stars**, with each star providing the full context:
    -   The star's name and its archetypal **description**.
    -   Its explicit mapping to its **Quadrant** and its single **Primary Energy** (based on its position).
    -   The user's specific **numeric value** for each of the three lenses.
    -   The exact **question** the user was asked for each lens.
    -   The full **spectrum of 5 possible answers** for that lens (e.g., from "Scattered" to "Robotic").
-   **Why it's important:** This is where true insight is generated. The AI doesn't just know the user's "Systematic" score is high; it knows *why* it's high. It sees that the user felt "By-the-book" in their daily routine in response to a specific question from a full spectrum of choices, and it understands that "Systematic" is an expression of the **SEEING** energy within the **Do & See** realm. This allows the AI to move from generic interpretations to deeply personal and resonant reflections.

---

## Section 3: Structured Output & Rich Formatting

Finally, the prompt gives the AI clear instructions on how to structure its response.
-   **JSON Schema:** By demanding a specific JSON output, we ensure the data is reliable and can be easily parsed and displayed in the UI's tabbed interface.
-   **Rich Formatting Tags:** By instructing the AI to use Markdown and our custom color tags (`<pos>`, `<neg>`, `<q1>`, etc.), we offload the task of identifying and highlighting key terms to the model itself. This makes the final output more dynamic, scannable, and visually engaging for the user.

This comprehensive approach to prompt engineering is what elevates the "Cosmic Reading" from a novelty to a genuinely powerful tool for self-reflection.