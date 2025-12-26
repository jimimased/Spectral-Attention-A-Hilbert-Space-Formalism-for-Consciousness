import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from 'recharts';

interface SpectralChartProps {
  coefficients: number[];
  history: {
    intensity: number;
    entropy: number;
    focus: number;
    timestamp: number;
    eigenvalues: number[];
  }[];
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#a4de6c'];

export const SpectralChart: React.FC<SpectralChartProps> = ({ coefficients, history }) => {
  const barData = coefficients.map((c, i) => ({
    mode: `u${i + 1}`,
    value: Math.abs(c),
  }));

  // Limit history for performance
  const lineData = history.slice(-50);

  // Prepare eigenvalue data for chart: Flatten array into objects like { timestamp, lambda1, lambda2... }
  const evData = lineData.map(h => {
    const obj: any = { timestamp: h.timestamp };
    h.eigenvalues.forEach((val, i) => {
        obj[`lambda${i+1}`] = val;
    });
    return obj;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
      {/* Spectral Coefficients */}
      <div className="bg-white p-4 rounded-lg shadow-md border border-slate-200">
        <h3 className="text-sm font-semibold text-slate-500 mb-2">Spectral Coefficients |c_k|</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mode" />
              <YAxis domain={[0, 'auto']} />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" animationDuration={200} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Phenomenology Time Series */}
      <div className="bg-white p-4 rounded-lg shadow-md border border-slate-200">
        <h3 className="text-sm font-semibold text-slate-500 mb-2">Phenomenology History</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" tick={false} />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="intensity"
                stroke="#a855f7"
                dot={false}
                strokeWidth={2}
                name="Intensity"
              />
              <Line
                type="monotone"
                dataKey="entropy"
                stroke="#ef4444"
                dot={false}
                strokeWidth={2}
                name="Entropy"
              />
              <Line
                type="monotone"
                dataKey="focus"
                stroke="#22c55e"
                dot={false}
                strokeWidth={2}
                name="Focus"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Eigenvalue Evolution */}
      <div className="col-span-1 md:col-span-2 bg-white p-4 rounded-lg shadow-md border border-slate-200">
        <h3 className="text-sm font-semibold text-slate-500 mb-2">Eigenvalue Evolution (Attention Gains)</h3>
        <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={evData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" tick={false} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {coefficients.map((_, i) => (
                        <Line
                            key={i}
                            type="monotone"
                            dataKey={`lambda${i+1}`}
                            stroke={COLORS[i % COLORS.length]}
                            dot={false}
                            strokeWidth={2}
                            name={`λ${i+1}`}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};