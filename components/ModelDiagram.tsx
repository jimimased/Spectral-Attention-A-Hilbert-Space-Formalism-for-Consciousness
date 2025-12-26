import React from 'react';

export const ModelDiagram: React.FC = () => {
  return (
    <div className="w-full bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-sm my-8 overflow-hidden">
      <h3 className="text-center font-bold text-slate-700 mb-6 font-sans text-lg">System Architecture & Information Flow</h3>
      <div className="flex justify-center">
        <svg viewBox="0 0 800 520" className="w-full max-w-[800px] h-auto font-sans select-none">
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
            </marker>
            <marker id="arrowhead-blue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
            </marker>
            <marker id="arrowhead-green" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#22c55e" />
            </marker>
            <marker id="arrowhead-purple" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#a855f7" />
            </marker>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.1" />
            </filter>
          </defs>

          {/* Identity Model Node */}
          <g transform="translate(100, 100)">
            <circle r="55" fill="#eff6ff" stroke="#3b82f6" strokeWidth="3" filter="url(#shadow)" />
            <text x="0" y="-15" textAnchor="middle" fontWeight="bold" fill="#1e3a8a">Identity Model</text>
            <text x="0" y="15" textAnchor="middle" fontFamily="monospace" fill="#1e3a8a" fontSize="20" fontWeight="bold">ψ_I</text>
            <text x="0" y="35" textAnchor="middle" fontSize="10" fill="#60a5fa">Slow Integration</text>
          </g>

          {/* Body Model Node */}
          <g transform="translate(100, 400)">
            <circle r="55" fill="#f0fdf4" stroke="#22c55e" strokeWidth="3" filter="url(#shadow)" />
            <text x="0" y="-15" textAnchor="middle" fontWeight="bold" fill="#14532d">Body Model</text>
            <text x="0" y="15" textAnchor="middle" fontFamily="monospace" fill="#14532d" fontSize="20" fontWeight="bold">ψ_B</text>
            <text x="0" y="35" textAnchor="middle" fontSize="10" fill="#4ade80">Fast Regulation</text>
          </g>
          
          {/* Sensory Input */}
          <g transform="translate(100, 500)">
            <text x="0" y="0" textAnchor="middle" fontSize="12" fill="#64748b" fontWeight="bold">Input ξ_sensory</text>
            <line x1="0" y1="-10" x2="0" y2="-40" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="4,2" />
          </g>

          {/* Disparity Calculation */}
          <g transform="translate(280, 250)">
            <circle r="35" fill="#fef2f2" stroke="#ef4444" strokeWidth="2" filter="url(#shadow)" />
            <text x="0" y="-5" textAnchor="middle" fontWeight="bold" fontSize="24" fill="#991b1b">Δ</text>
            <text x="0" y="15" textAnchor="middle" fontSize="10" fill="#ef4444">Mismatch</text>
          </g>

          {/* Connections to Disparity */}
          {/* From Identity */}
          <path d="M 145 130 C 200 170, 200 200, 250 230" fill="none" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="5,5"/>
          <text x="200" y="170" fontSize="12" fill="#94a3b8" fontFamily="monospace">-</text>

          {/* From Body */}
          <path d="M 145 370 C 200 330, 200 300, 250 270" fill="none" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrowhead)" strokeDasharray="5,5"/>
          <text x="200" y="340" fontSize="12" fill="#94a3b8" fontFamily="monospace">+</text>

          {/* Attention Operator */}
          <g transform="translate(480, 250)">
            <rect x="-70" y="-50" width="140" height="100" rx="12" fill="#faf5ff" stroke="#a855f7" strokeWidth="3" filter="url(#shadow)" />
            <text x="0" y="-15" textAnchor="middle" fontWeight="bold" fill="#581c87" fontSize="16">Operator A</text>
            <text x="0" y="10" textAnchor="middle" fontSize="11" fill="#7e22ce">Spectral Projection</text>
            <text x="0" y="30" textAnchor="middle" fontSize="12" fill="#7e22ce" fontFamily="monospace" fontWeight="bold">Σ λ_k P_k</text>
          </g>

          {/* Delta to Operator */}
          <line x1="315" y1="250" x2="400" y2="250" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrowhead)" />
          <text x="360" y="240" textAnchor="middle" fontFamily="monospace" fontSize="12" fill="#ef4444" fontWeight="bold">Δ = ψ_B - ψ_I</text>

          {/* Conscious State Output */}
          <g transform="translate(700, 250)">
            <circle r="50" fill="#f3e8ff" stroke="#a855f7" strokeWidth="3" filter="url(#shadow)" />
            <text x="0" y="-15" textAnchor="middle" fontWeight="bold" fill="#581c87">Conscious</text>
            <text x="0" y="5" textAnchor="middle" fontWeight="bold" fill="#581c87">State</text>
            <text x="0" y="25" textAnchor="middle" fontFamily="monospace" fill="#581c87" fontSize="20" fontWeight="bold">ψ_C</text>
          </g>

          {/* Operator to Conscious State */}
          <line x1="550" y1="250" x2="640" y2="250" stroke="#a855f7" strokeWidth="4" markerEnd="url(#arrowhead-purple)" />
          <text x="595" y="240" textAnchor="middle" fontFamily="monospace" fill="#a855f7" fontWeight="bold">ψ_C = AΔ</text>

          {/* Feedback Loops */}
          
          {/* Loop to Identity (Slow Integration) */}
          <path d="M 700 200 C 700 80, 500 40, 160 90" fill="none" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead-blue)" strokeDasharray="8,4" />
          <rect x="300" y="55" width="200" height="30" fill="white" fillOpacity="0.9" rx="4" />
          <text x="400" y="75" textAnchor="middle" fontFamily="monospace" fill="#1e3a8a" fontSize="13" fontWeight="bold">ψ_I += η_I ψ_C</text>
          <text x="400" y="50" textAnchor="middle" fill="#3b82f6" fontSize="11" fontWeight="bold">Integration Feedback</text>

          {/* Loop to Body (Fast Regulation) */}
          <path d="M 700 300 C 700 420, 500 460, 160 410" fill="none" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowhead-green)" strokeDasharray="8,4" />
          <rect x="250" y="445" width="300" height="30" fill="white" fillOpacity="0.9" rx="4" />
          <text x="400" y="465" textAnchor="middle" fontFamily="monospace" fill="#14532d" fontSize="13" fontWeight="bold">ψ_B -= η_reg Δ + η_fb ψ_C</text>
          <text x="400" y="440" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="bold">Regulation Feedback</text>

        </svg>
      </div>
    </div>
  );
};
