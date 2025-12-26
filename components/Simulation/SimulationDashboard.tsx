import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Play, Pause, RotateCcw, Zap, Settings2 } from 'lucide-react';
import { SimulationMode, SimulationParams, SimulationState, Vector } from '../../types';
import { DIMENSIONS, EIGENVALUES, INITIAL_PARAMS } from '../../constants';
import { VectorSpace } from './VectorSpace';
import { SpectralChart } from './SpectralChart';

// Helper for vector math
const add = (v1: Vector, v2: Vector): Vector => v1.map((x, i) => x + v2[i]);
const sub = (v1: Vector, v2: Vector): Vector => v1.map((x, i) => x - v2[i]);
const scale = (v: Vector, s: number): Vector => v.map((x) => x * s);
const norm = (v: Vector): number => Math.sqrt(v.reduce((sum, x) => sum + x * x, 0));
const randomVector = (dim: number, scaleVal: number): Vector => {
  const v = new Array(dim).fill(0);
  return v.map(() => (Math.random() - 0.5) * 2 * scaleVal);
};

const calculateEntropy = (coeffs: number[]): number => {
  const mags = coeffs.map(Math.abs);
  const sum = mags.reduce((a, b) => a + b, 0);
  if (sum === 0) return 0;
  const probs = mags.map((m) => m / sum);
  return -probs.reduce((acc, p) => (p > 0 ? acc + p * Math.log(p) : acc), 0);
};

const calculateFocus = (coeffs: number[]): number => {
  const mags = coeffs.map(Math.abs);
  const sum = mags.reduce((a, b) => a + b, 0);
  if (sum === 0) return 0;
  return Math.max(...mags) / sum;
};

export const SimulationDashboard: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [params, setParams] = useState<SimulationParams>(INITIAL_PARAMS);
  const [state, setState] = useState<SimulationState>(() => {
    // Initial random state
    const psi_I = randomVector(DIMENSIONS, 0.5);
    const psi_B = add(psi_I, randomVector(DIMENSIONS, 0.5)); // Start with some disparity
    const delta = sub(psi_B, psi_I);
    return {
      psi_I,
      psi_B,
      delta,
      psi_C: Array.from({ length: DIMENSIONS }, () => 0),
      spectralCoeffs: Array.from({ length: DIMENSIONS }, () => 0),
      currentEigenvalues: [...EIGENVALUES[INITIAL_PARAMS.mode]],
      history: [],
    };
  });

  const requestRef = useRef<number | undefined>(undefined);
  const lastTimeRef = useRef<number | undefined>(undefined);

  // Reset eigenvalues when mode changes
  useEffect(() => {
    setState((prev) => ({
      ...prev,
      currentEigenvalues: [...EIGENVALUES[params.mode]],
    }));
  }, [params.mode]);

  const reset = () => {
    const psi_I = randomVector(DIMENSIONS, 0.5);
    const psi_B = add(psi_I, randomVector(DIMENSIONS, 0.5));
    setState({
      psi_I,
      psi_B,
      delta: sub(psi_B, psi_I),
      psi_C: Array.from({ length: DIMENSIONS }, () => 0),
      spectralCoeffs: Array.from({ length: DIMENSIONS }, () => 0),
      currentEigenvalues: [...EIGENVALUES[params.mode]],
      history: [],
    });
  };

  const perturbEigenvalue = (index: number) => {
    setState((prev) => {
      const newEigenvalues = [...prev.currentEigenvalues];
      newEigenvalues[index] += 0.5; // Bump the gain
      return { ...prev, currentEigenvalues: newEigenvalues };
    });
  };

  const step = useCallback((time: number) => {
    if (lastTimeRef.current === undefined) lastTimeRef.current = time;
    const dt = (time - (lastTimeRef.current ?? time)) / 1000;
    const safeDt = Math.min(dt, 0.1); 

    setState((prev) => {
      // 0. Update Eigenvalues
      const baseline = EIGENVALUES[params.mode];
      const nextEigenvalues = prev.currentEigenvalues.map((val, i) => {
        const drift = (baseline[i] - val) * 0.05; 
        const noise = (Math.random() - 0.5) * 0.02; 
        return Math.max(0.01, val + drift + noise);
      });

      // 1. Calculate Delta
      const delta = sub(prev.psi_B, prev.psi_I);

      // 2. Apply Attention Operator
      const spectralCoeffs = delta.map((d, i) => d * nextEigenvalues[i]);
      const psi_C = spectralCoeffs; 

      // 3. Update Equations
      let dPsi_B = scale(delta, -params.etaReg);
      dPsi_B = add(dPsi_B, scale(psi_C, params.etaFb));
      dPsi_B = add(dPsi_B, randomVector(DIMENSIONS, params.noiseLevel));

      const next_psi_B = add(prev.psi_B, dPsi_B);
      
      const dPsi_I = scale(psi_C, params.etaI);
      const next_psi_I = add(prev.psi_I, dPsi_I);

      const intensity = norm(psi_C);
      const entropy = calculateEntropy(spectralCoeffs);
      const focus = calculateFocus(spectralCoeffs);

      const newHistoryItem = {
        intensity,
        entropy,
        focus,
        eigenvalues: nextEigenvalues,
        timestamp: Date.now(),
      };

      const newHistory = [...prev.history, newHistoryItem].slice(-100);

      return {
        psi_I: next_psi_I,
        psi_B: next_psi_B,
        delta,
        psi_C,
        spectralCoeffs,
        currentEigenvalues: nextEigenvalues,
        history: newHistory,
      };
    });

    lastTimeRef.current = time;
    if (isPlaying) {
      requestRef.current = requestAnimationFrame(step);
    }
  }, [isPlaying, params]);

  useEffect(() => {
    if (isPlaying) {
      requestRef.current = requestAnimationFrame(step);
    } else {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      lastTimeRef.current = undefined;
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, step]);

  return (
    <div className="p-4 space-y-6">
      {/* 1. Global Controls Bar */}
      <div className="bg-slate-900 text-white p-4 rounded-xl shadow-lg flex flex-wrap gap-6 items-center justify-between">
        <div className="flex gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold transition-all ${
              isPlaying
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-900'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-900'
            }`}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            {isPlaying ? 'PAUSE' : 'RUN MODEL'}
          </button>
          <button
            onClick={reset}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium transition-colors"
          >
            <RotateCcw size={18} /> Reset
          </button>
        </div>

        <div className="flex flex-col gap-1 min-w-[240px]">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Phenomenology Mode</span>
            <div className="flex bg-slate-800 p-1 rounded-lg">
                {Object.values(SimulationMode).map((mode) => (
                <button
                    key={mode}
                    onClick={() => setParams({ ...params, mode })}
                    className={`flex-1 px-3 py-1.5 text-[10px] font-bold uppercase rounded-md transition-all ${
                    params.mode === mode
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-400 hover:bg-slate-700 hover:text-white'
                    }`}
                >
                    {mode}
                </button>
                ))}
            </div>
        </div>
      </div>

      {/* 2. System Diagram Area */}
      <div className="relative w-full bg-slate-50 border border-slate-200 rounded-2xl shadow-inner overflow-hidden min-h-[850px] lg:h-[800px] p-6">
        
        {/* SVG Background Layer for Arrows */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
           <defs>
            <marker id="arrow-dia" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#cbd5e1" />
            </marker>
            <marker id="arrow-dia-blue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
            </marker>
             <marker id="arrow-dia-green" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
            </marker>
             <marker id="arrow-dia-red" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
            </marker>
             <marker id="arrow-dia-purple" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#a855f7" />
            </marker>
          </defs>
          
          {/* Note: Coordinates below are percentages approx mapped to the grid layout */}
          {/* Identity (Left Top: 15% 20%) -> Disparity (Center: 40% 50%) */}
          <line x1="18%" y1="20%" x2="35%" y2="40%" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrow-dia-blue)" opacity="0.4" />
          
          {/* Body (Left Bot: 15% 80%) -> Disparity (Center: 40% 50%) */}
          <line x1="18%" y1="80%" x2="35%" y2="60%" stroke="#22c55e" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrow-dia-green)" opacity="0.4" />

          {/* Disparity (Center: 50% 50%) -> Operator (65% 50%) */}
          <line x1="55%" y1="50%" x2="62%" y2="50%" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrow-dia-red)" />
          
          {/* Operator (70% 50%) -> Conscious (85% 50%) */}
          <line x1="75%" y1="50%" x2="80%" y2="50%" stroke="#a855f7" strokeWidth="4" markerEnd="url(#arrow-dia-purple)" />

          {/* Feedback Loops */}
          {/* Conscious (Right) -> Top Loop -> Identity (Left Top) */}
          <path d="M 90% 40% C 90% 5%, 50% 5%, 20% 15%" fill="none" stroke="#3b82f6" strokeWidth="3" strokeDasharray="8,4" markerEnd="url(#arrow-dia-blue)" opacity="0.6" />
          
          {/* Conscious (Right) -> Bottom Loop -> Body (Left Bot) */}
          <path d="M 90% 60% C 90% 95%, 50% 95%, 20% 85%" fill="none" stroke="#22c55e" strokeWidth="3" strokeDasharray="8,4" markerEnd="url(#arrow-dia-green)" opacity="0.6" />

        </svg>

        {/* 3-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full relative z-10">

          {/* Column 1: Models (Left) */}
          <div className="flex flex-col justify-between h-full py-8 gap-8 lg:gap-0">
            
            {/* Identity Node */}
            <div className="bg-white p-5 rounded-xl border-2 border-blue-100 shadow-md relative">
               <div className="absolute -top-3 left-4 bg-blue-100 text-blue-800 px-2 py-0.5 text-xs font-bold rounded uppercase tracking-wider">Identity Model</div>
               <div className="text-center mb-4">
                  <span className="font-mono text-2xl font-bold text-blue-900">ψ_I</span>
                  <p className="text-xs text-blue-600">Autobiographical / Prior</p>
               </div>
               
               {/* Integration Feedback Control */}
               <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-100 mt-2">
                 <label className="flex justify-between text-xs font-bold text-blue-700 mb-1">
                    Integration Rate (η_I)
                    <span>{params.etaI.toFixed(2)}</span>
                 </label>
                 <input
                    type="range" min="0" max="0.1" step="0.005"
                    value={params.etaI}
                    onChange={(e) => setParams({ ...params, etaI: parseFloat(e.target.value) })}
                    className="w-full h-1.5 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <p className="text-[10px] text-blue-500 mt-1 leading-tight">How fast the self updates from experience.</p>
               </div>
            </div>

            {/* Body Node */}
            <div className="bg-white p-5 rounded-xl border-2 border-emerald-100 shadow-md relative">
               <div className="absolute -top-3 left-4 bg-emerald-100 text-emerald-800 px-2 py-0.5 text-xs font-bold rounded uppercase tracking-wider">Body Model</div>
               <div className="text-center mb-4">
                  <span className="font-mono text-2xl font-bold text-emerald-900">ψ_B</span>
                  <p className="text-xs text-emerald-600">Interoceptive / Sensory</p>
               </div>
               
               {/* Controls */}
               <div className="space-y-3">
                 <div className="bg-emerald-50/50 p-2 rounded border border-emerald-100">
                    <label className="flex justify-between text-xs font-bold text-emerald-700 mb-1">
                        Regulation (η_reg)
                        <span>{params.etaReg.toFixed(2)}</span>
                    </label>
                    <input
                        type="range" min="0" max="0.5" step="0.01"
                        value={params.etaReg}
                        onChange={(e) => setParams({ ...params, etaReg: parseFloat(e.target.value) })}
                        className="w-full h-1.5 bg-emerald-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                    />
                 </div>
                 <div className="bg-emerald-50/50 p-2 rounded border border-emerald-100">
                    <label className="flex justify-between text-xs font-bold text-emerald-700 mb-1">
                        Feedback (η_fb)
                        <span>{params.etaFb.toFixed(2)}</span>
                    </label>
                    <input
                        type="range" min="0" max="0.5" step="0.01"
                        value={params.etaFb}
                        onChange={(e) => setParams({ ...params, etaFb: parseFloat(e.target.value) })}
                        className="w-full h-1.5 bg-emerald-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                    />
                 </div>
                 <div className="bg-slate-50 p-2 rounded border border-slate-200">
                    <label className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                        Sensory Noise (ξ)
                        <span>{params.noiseLevel.toFixed(2)}</span>
                    </label>
                    <input
                        type="range" min="0" max="0.2" step="0.01"
                        value={params.noiseLevel}
                        onChange={(e) => setParams({ ...params, noiseLevel: parseFloat(e.target.value) })}
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-500"
                    />
                 </div>
               </div>
            </div>

          </div>

          {/* Column 2: State Space / Disparity (Center Left) */}
          <div className="lg:col-span-2 flex flex-col justify-center gap-6">
            
            {/* Vector Space / Disparity */}
            <div className="bg-white p-4 rounded-2xl border-2 border-red-100 shadow-xl relative z-20">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-100 text-red-800 px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider shadow-sm border border-white">
                    Disparity & State Space
                </div>
                <div className="mb-2 text-center">
                    <span className="font-mono text-lg font-bold text-red-600 bg-red-50 px-2 py-1 rounded">Δ = ψ_B - ψ_I</span>
                </div>
                <div className="h-[320px] w-full rounded-lg overflow-hidden border border-slate-100 bg-slate-50/50">
                    <VectorSpace
                        psi_I={state.psi_I}
                        psi_B={state.psi_B}
                        psi_C={state.psi_C}
                        delta={state.delta}
                        width={450}
                        height={320}
                    />
                </div>
                <p className="text-center text-xs text-slate-400 mt-2 italic">2D projection of 5D Hilbert space</p>
            </div>

            {/* Operator Node */}
            <div className="bg-white p-5 rounded-xl border-2 border-purple-100 shadow-lg relative z-20">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-100 text-purple-800 px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider shadow-sm border border-white">
                    Attention Operator A
                </div>
                <div className="text-center mb-4">
                     <span className="font-mono text-lg font-bold text-purple-700">A = Σ λ_k P_k</span>
                </div>
                
                <div className="flex flex-col items-center">
                    <label className="text-[10px] font-bold text-purple-400 uppercase tracking-widest mb-2">
                        Perturb Eigenvalues (λ)
                    </label>
                    <div className="flex flex-wrap justify-center gap-2">
                        {state.currentEigenvalues.map((val, i) => (
                            <button 
                                key={i}
                                onClick={() => perturbEigenvalue(i)}
                                className="group relative px-3 py-2 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg transition-all flex flex-col items-center min-w-[50px]"
                            >
                                <span className="text-[10px] font-mono text-purple-400 mb-0.5">λ_{i+1}</span>
                                <span className="text-sm font-bold text-purple-700">{val.toFixed(2)}</span>
                                <Zap size={12} className="absolute -top-1.5 -right-1.5 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
          </div>

          {/* Column 3: Conscious State (Right) */}
          <div className="flex flex-col justify-center h-full">
             <div className="bg-white p-1 rounded-2xl border-2 border-purple-500 shadow-2xl relative z-30 h-full max-h-[600px] flex flex-col">
                <div className="absolute -top-4 right-6 bg-purple-600 text-white px-4 py-1.5 text-sm font-bold rounded-full shadow-lg flex items-center gap-2">
                    <Settings2 size={16} /> Conscious State ψ_C
                </div>
                
                <div className="p-4 border-b border-slate-100 text-center mt-4">
                     <span className="font-mono text-xl font-bold text-purple-800">ψ_C = AΔ</span>
                     <p className="text-xs text-slate-500 mt-1">Phenomenological Output</p>
                </div>

                <div className="flex-grow p-2">
                     <SpectralChart coefficients={state.spectralCoeffs} history={state.history} />
                </div>
                
                <div className="grid grid-cols-2 gap-2 p-4 bg-slate-50 rounded-b-xl">
                    <div className="text-center p-2 bg-white rounded border border-slate-200">
                        <div className="text-xs text-slate-400 uppercase tracking-widest font-bold">Entropy</div>
                        <div className="text-lg font-mono font-bold text-slate-700">
                            {state.history[state.history.length-1]?.entropy.toFixed(2) || "0.00"}
                        </div>
                    </div>
                     <div className="text-center p-2 bg-white rounded border border-slate-200">
                        <div className="text-xs text-slate-400 uppercase tracking-widest font-bold">Focus</div>
                        <div className="text-lg font-mono font-bold text-slate-700">
                             {state.history[state.history.length-1]?.focus.toFixed(2) || "0.00"}
                        </div>
                    </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};