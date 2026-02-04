# Concept: The Soul's Atlas

*This document details the design and evolution of the primary summary visualization in Pulse, covering the new "Cosmic Signature" radar chart, the "Data Point" visualization, and the full Atlas view with its deep analytical tools.*

---

## Section 1: Philosophy - From Dashboard to Oracle

The Soul's Atlas has evolved from a simple summary dashboard into a powerful, multi-layered oracle for self-discovery. Its purpose is to transform raw, subjective user input into a rich tapestry of visualizations and narratives that invite deep, non-judgmental reflection. It provides multiple lenses through which to view one's inner cosmos, from high-level holistic views to granular, specific data points.

---

## Section 2: Core Components of the Atlas View

### 2.1 The "Cosmic Signature" Radar Chart

The "Astrolabe" has been transformed from a decorative element into a functional and powerful **"Cosmic Signature" radar chart**. This is now the visual centerpiece of the Atlas view, providing an immediate, holistic snapshot of the user's primary energetic balance.
-   **Structure:** The chart has four axes representing the primary energies: **Doing, Being, Seeing, and Feeling**. A central, golden **"balance ring"** represents a score of 0.
-   **Equilibrium Signature:** The user's unique energetic shape is drawn as a polygon. Vertices extending beyond the balance ring show over-expression, while vertices inside the ring show under-expression. This shape is their "Cosmic Signature."
-   **Flux Field:** A larger, softer, glowing shape is drawn behind the main signature. Its vertices are determined by the "Flux" (complexity) of each primary energy, visually representing the overall dynamic potential of the user's cosmos.

### 2.2 DataPoint Visualization: Accuracy and Clarity

To provide a more accurate and intuitive representation of single scores, the `DataBar` has been completely replaced by the new **`DataPoint`** visualization.
-   **Equilibrium Dot:** A single, colored dot is placed on a track. Its position clearly communicates the score, and its color (indigo-gold-red) shows its nature (under-expressed, balanced, or over-expressed). This correctly visualizes a single point of data, not a range.
-   **Flux Aura:** A soft, glowing aura is centered on the equilibrium dot. Its size and intensity directly represent the "Flux" or internal complexity around that central point.
-   **Node Distributions:** When viewing aggregate data (like for a Lens or Primary Energy), the track is now populated with the glyphs of all constituent Nodes (Stars), each placed at its respective equilibrium point. This provides an immediate visual "scatter plot" of the energies that contribute to the whole.
-   **Personal Spectrum:** Faint markers on the track still indicate the user's personal minimum and maximum values used, grounding the data in their own expressive range.
-   **Interactive Drill-Down (3 Levels):** The data points remain interactive. Users can still "unfold" any primary metric to reveal the individual `DataPoint`s for the constituent energies, down to the Ego, Soul, and Spirit lenses of an individual Node.

---

## Section 3: The Oracle: Inquiry and Wisdom

The final two tabs transform the Atlas from a data visualization tool into a generative space for wisdom.

### 3.1 Cosmic Highlights (Programmatic Insights)

This tab provides instant, actionable insights by programmatically analyzing the user's data without needing to wait for an AI call. The results are presented in clean, horizontally scrolling sections, allowing the user to focus on one category at a time for improved scannability. It highlights:
-   The **most pronounced Nodes** (highest absolute average value).
-   The **most balanced Nodes** (lowest absolute average value).
-   The **most complex Domains** (Domains with the highest Flux).
-   The **most harmonious Domains** (Domains with the lowest Flux).

This gives users an immediate focal point for their reflection.

### 3.2 One-Click Cosmic Reading (Generative Insights)

This feature uses a single, comprehensive request to the Gemini API to return a full, structured reading.

-   **The Master Prompt:** The application constructs a sophisticated "master prompt" that provides the AI with deep, holistic context, including the user's **complete 24-Node cosmos**.
-   **Rich Text Formatting:** A robust, recursive parser correctly handles nested Markdown and custom color tags to make the narrative dynamic and scannable.
-   **Utility Controls:** A floating panel provides easy access to **"Export Reading," "Show Prompt," and "Copy Prompt"** functionality.
-   **Content Tabs:** The reading is broken down into digestible sections: Summary, Strengths & Shadows, Archetype Discovery, and Balancing Practices.

This final design fulfills the goal of turning user-defined data into a profound and multi-faceted tool for self-reflection.