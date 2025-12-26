export type Vector = number[];

export enum SimulationMode {
  STABLE = 'STABLE',
  DISSONANCE = 'DISSONANCE',
  AHA = 'AHA',
  ALTERED = 'ALTERED',
}

export interface SimulationParams {
  etaReg: number; // Regulation rate (Body -> Identity)
  etaFb: number;  // Feedback rate (Consciousness -> Body)
  etaI: number;   // Identity integration rate (Consciousness -> Identity)
  noiseLevel: number;
  mode: SimulationMode;
}

export interface SimulationState {
  psi_I: Vector;
  psi_B: Vector;
  psi_C: Vector;
  delta: Vector;
  spectralCoeffs: number[];
  currentEigenvalues: number[];
  history: {
    intensity: number;
    entropy: number;
    focus: number;
    timestamp: number;
    eigenvalues: number[];
  }[];
}

export interface SlideData {
  id: number;
  title: string;
  content: string[];
  note: string;
}