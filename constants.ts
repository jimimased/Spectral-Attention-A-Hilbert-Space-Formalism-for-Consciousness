import { SimulationMode, SlideData } from './types';

export const DIMENSIONS = 5;

// Initial Eigenvalues (Attention Gains) for different modes
export const EIGENVALUES: Record<SimulationMode, number[]> = {
  [SimulationMode.STABLE]: [1.0, 0.8, 0.4, 0.2, 0.1],
  [SimulationMode.DISSONANCE]: [0.8, 0.8, 0.7, 0.7, 0.6], // Flat-ish high
  [SimulationMode.AHA]: [2.0, 0.2, 0.1, 0.05, 0.05],     // One dominant spike
  [SimulationMode.ALTERED]: [0.5, 0.5, 0.5, 0.5, 0.5],   // Completely flat
};

export const INITIAL_PARAMS = {
  etaReg: 0.1,
  etaFb: 0.05,
  etaI: 0.01,
  noiseLevel: 0.05,
  mode: SimulationMode.STABLE,
};

export const SLIDES: SlideData[] = [
  {
    id: 1,
    title: "Spectral Attention: A Hilbert Space Formalism for Consciousness",
    content: [
      "We propose a formal model.",
      "Conscious experience is not a static representation.",
      "It is an operator-driven projection of mismatch between self and sensory/body state."
    ],
    note: "We propose a formal model where conscious experience is not a static representation but an operator-driven projection of mismatch between self and sensory/body state."
  },
  {
    id: 2,
    title: "Motivation",
    content: [
      "Why current 'attention' in AI ≠ attention in experience.",
      "Transformer attention is routing.",
      "Our target is phenomenology: intensity, focus, confusion, insight.",
      "Explained by spectral structure."
    ],
    note: "Transformer attention is routing. Our target is phenomenology: intensity, focus, confusion, insight, altered states—explained by spectral structure."
  },
  {
    id: 3,
    title: "Two Internal Models",
    content: [
      "ψI (Identity): Slow, compressed, autobiographical expectation.",
      "ψB (Body/Sensory): Fast, high-bandwidth."
    ],
    note: "Identity is slow, compressed, autobiographical expectation. Body/sensory is fast and high bandwidth."
  },
  {
    id: 4,
    title: "Disparity Vector",
    content: [
      "Δ(t) = ψB(t) - ψI(t)",
      "Conscious content arises from structured mismatch.",
      "Not from input alone."
    ],
    note: "Conscious content arises from structured mismatch, not from input alone."
  },
  {
    id: 5,
    title: "Attention as Operator",
    content: [
      "A : H → H (Self-Adjoint)",
      "ψC = AΔ",
      "Attention is not a scalar gain; it is a mode-selective operator.",
      "Self-adjointness gives real salience and orthogonal modes."
    ],
    note: "Attention is not a scalar gain; it is a mode-selective operator. Self-adjointness gives real salience and orthogonal modes."
  },
  {
    id: 6,
    title: "Spectral Decomposition",
    content: [
      "A = Σ λk Pk",
      "ck = λk ⟨uk, Δ⟩",
      "ψC = Σ ck uk",
      "Experience is a reconstruction from attentional eigenmodes."
    ],
    note: "Experience is a reconstruction from attentional eigenmodes. The coefficients c_k are the 'momentary qualia mixture.'"
  },
  {
    id: 7,
    title: "Phenomenology Mapping",
    content: [
      "||ψC|| = Intensity",
      "Focus ratio = Dominance of top coefficient",
      "Spectral entropy = Confusion/dissonance"
    ],
    note: "Intensity is norm. Focus is dominance of top coefficient. Confusion/dissonance is high spectral entropy."
  },
  {
    id: 8,
    title: "Altered States as Operator Perturbations",
    content: [
      "Flattening spectrum (λk equal) → Psychedelic-like (more modes contribute).",
      "Runaway gain on specific mode → Panic/Mania."
    ],
    note: "Psychedelic-like: flatten spectrum → more modes contribute. Panic/mania: runaway gain on specific mode(s)."
  },
  {
    id: 9,
    title: "Dynamics and Feedback",
    content: [
      "Body regulates mismatch quickly.",
      "Identity integrates conscious projections slowly.",
      "Yields continuity of self."
    ],
    note: "Body regulates mismatch quickly; identity integrates conscious projections slowly. That yields continuity of self."
  },
  {
    id: 10,
    title: "Simulation Demo",
    content: [
      "Visualizing 'Aha' coefficient collapse.",
      "Visualizing Dissonance (high disparity + high entropy)."
    ],
    note: "'Aha' is visible as coefficient collapse + eigenvalue spike; dissonance is high disparity + high entropy."
  },
  {
    id: 11,
    title: "Falsifiable Predictions",
    content: [
      "Distinct attentional modes = Orthogonal neural subspaces.",
      "Insight = Spectral collapse signature in EEG/States."
    ],
    note: "We can test mode orthogonality and transitions using neural population recordings and state-space analyses."
  },
  {
    id: 12,
    title: "Conclusion",
    content: [
      "Consciousness = Spectral projection of disparity.",
      "A compact operator-theoretic formalism.",
      "Links mismatch, attention, and phenomenology."
    ],
    note: "The contribution is a compact operator-theoretic formalism linking mismatch, attention, and phenomenology in one spectral structure."
  }
];
