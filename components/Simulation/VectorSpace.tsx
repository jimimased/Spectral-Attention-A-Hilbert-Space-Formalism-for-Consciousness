import React, { useMemo } from 'react';
import * as d3 from 'd3';
import { Vector } from '../../types';

interface VectorSpaceProps {
  psi_I: Vector;
  psi_B: Vector;
  psi_C: Vector;
  delta: Vector;
  width?: number;
  height?: number;
}

export const VectorSpace: React.FC<VectorSpaceProps> = ({
  psi_I,
  psi_B,
  psi_C,
  delta,
  width = 400,
  height = 400,
}) => {
  // We project 5D vectors to 2D for visualization using the first two components
  // In a real rigorous app we might use PCA, but simple projection works for stability demo
  const project = (v: Vector): [number, number] => [v[0], v[1]];

  const xScale = useMemo(() => d3.scaleLinear().domain([-2, 2]).range([0, width]), [width]);
  const yScale = useMemo(() => d3.scaleLinear().domain([-2, 2]).range([height, 0]), [height]);

  const origin: [number, number] = [0, 0];
  const pI = project(psi_I);
  const pB = project(psi_B);
  
  // Calculate delta start (psi_I) and end (psi_B) strictly visually
  // Delta vector itself is pB - pI visually
  
  // psi_C is an independent vector originating from origin in this Hilbert space view
  const pC = project(psi_C);

  const drawArrow = (
    start: [number, number],
    end: [number, number],
    color: string,
    label: string,
    width: number = 2
  ) => {
    // Basic coordinate mapping
    const x1 = xScale(start[0]);
    const y1 = yScale(start[1]);
    const x2 = xScale(end[0]);
    const y2 = yScale(end[1]);

    // Offset for label
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;

    return (
      <g>
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={color}
          strokeWidth={width}
          markerEnd={`url(#arrow-${color.replace('#', '')})`}
        />
        <text
          x={midX + 10}
          y={midY - 10}
          fill={color}
          fontSize="14"
          fontWeight="bold"
          style={{ textShadow: '0px 0px 4px rgba(255,255,255,0.8)' }}
        >
          {label}
        </text>
      </g>
    );
  };

  const colors = {
    I: '#3b82f6', // Blue
    B: '#22c55e', // Green
    D: '#ef4444', // Red
    C: '#a855f7', // Purple
  };

  return (
    <div className="relative bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden">
      <div className="absolute top-2 left-2 text-sm font-semibold text-slate-500">
        Hilbert Space Projection (Dim 1 vs 2)
      </div>
      <svg width={width} height={height} className="w-full h-full">
        <defs>
          {Object.entries(colors).map(([key, color]) => (
            <marker
              key={key}
              id={`arrow-${color.replace('#', '')}`}
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill={color} />
            </marker>
          ))}
        </defs>
        
        {/* Grid Lines */}
        <line x1={xScale(0)} y1={0} x2={xScale(0)} y2={height} stroke="#e2e8f0" strokeWidth="1" />
        <line x1={0} y1={yScale(0)} x2={width} y2={yScale(0)} stroke="#e2e8f0" strokeWidth="1" />
        <circle cx={xScale(0)} cy={yScale(0)} r={3} fill="#94a3b8" />

        {/* Vectors */}
        {drawArrow(origin, pI, colors.I, "ψI")}
        {drawArrow(origin, pB, colors.B, "ψB")}
        {drawArrow(pI, pB, colors.D, "Δ")}
        {drawArrow(origin, pC, colors.C, "ψC")}

      </svg>
    </div>
  );
};
