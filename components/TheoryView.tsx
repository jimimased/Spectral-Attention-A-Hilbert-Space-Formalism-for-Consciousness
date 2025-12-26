import React from 'react';
import { ModelDiagram } from './ModelDiagram';

export const TheoryView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-xl border border-slate-100 my-8 font-serif leading-relaxed text-slate-800">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4 font-sans">
          Spectral Attention: A Hilbert Space Formalism for Consciousness
        </h1>
        <div className="text-lg text-slate-600 italic max-w-2xl mx-auto">
          <p>Abstract</p>
          <p className="mt-2">
            We propose a formal mathematical model of consciousness as an operator-driven spectral projection within a high-dimensional Hilbert space. In this framework, momentary conscious experience arises not from static representations, but from the operation of a self-adjoint Attention operator A acting upon the disparity vector Δ between a retrospective Identity Model ψ<sub>I</sub> and a real-time Body/Sensory Model ψ<sub>B</sub>. We demonstrate that the spectral decomposition of this operator naturally accounts for the qualitative structure of attention, the binding of multimodal features, and the phenomenology of altered states of consciousness. We further propose that this system evolves via asymmetric feedback loops in which the body/sensory model rapidly regulates disparity while the identity model integrates conscious projections over longer timescales.
          </p>
        </div>
      </header>

      <hr className="my-8 border-slate-200" />

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 font-sans border-b border-slate-200 pb-2">1. Core Formalism</h2>
        
        <p className="mb-6">
            The core architecture relies on the interaction between two disparate internal models mediated by a spectral attention operator. The following diagram illustrates the information flow and feedback dynamics:
        </p>

        <ModelDiagram />
        
        <div className="mb-8">
          <h3 className="text-xl font-bold text-slate-800 mb-3 font-sans">1.1 State Space</h3>
          <p className="mb-4">
            We define the cognitive–perceptual state space as a complex Hilbert space <span className="font-mono">H</span>. In practical realizations (and in our numerical simulation), we approximate this space with <span className="font-mono">ℂ<sup>d</sup></span> for large <span className="font-mono">d</span>, interpreting infinite dimensionality as the limit of trajectory-space extensions rather than literal physical infinity. Only a low-dimensional subspace is typically occupied at any given moment, with temporal dynamics and recurrence realizing richer functional structure over time.
          </p>
          <p className="mb-2">At any time <span className="font-mono">t</span>, the system maintains two primary state vectors:</p>
          <ol className="list-decimal pl-6 space-y-2 mb-4">
            <li>
              <strong>Identity State (ψ<sub>I</sub>(t) ∈ H):</strong> A slowly evolving, compressed representation of the self, autobiographical history, and expected world-state.
            </li>
            <li>
              <strong>Body/Sensory State (ψ<sub>B</sub>(t) ∈ H):</strong> A rapidly evolving, high-bandwidth representation of current interoceptive and exteroceptive inputs.
            </li>
          </ol>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold text-slate-800 mb-3 font-sans">1.2 The Disparity Vector</h3>
          <p className="mb-4">
            The raw material for consciousness is the difference between expectation (identity) and immediate reality (body/sensation). We define the disparity vector Δ(t) as:
          </p>
          <div className="bg-slate-50 p-4 rounded border border-slate-200 text-center font-mono text-lg mb-4">
            Δ(t) = ψ<sub>B</sub>(t) - ψ<sub>I</sub>(t)
          </div>
          <p>
            This vector represents the potential information available for conscious processing: a structured mismatch across representational dimensions.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold text-slate-800 mb-3 font-sans">1.3 The Attention Operator</h3>
          <p className="mb-4">
            Attention is defined not as a spotlight or limited resource, but as a linear, self-adjoint operator <span className="font-mono">A : H → H</span>. Since A is self-adjoint (<span className="font-mono">A = A<sup>†</sup></span>), the Spectral Theorem guarantees that it admits a real-valued spectrum and an orthonormal basis of eigenvectors. This corresponds to the phenomenological reality of graded salience (real eigenvalues) and distinct attentional channels (orthogonality).
          </p>
          <p className="mb-2">We decompose A as:</p>
          <div className="bg-slate-50 p-4 rounded border border-slate-200 text-center font-mono text-lg mb-4">
            A = Σ<sub>k</sub> λ<sub>k</sub> P<sub>k</sub>
          </div>
          <p>
            where <span className="font-mono">P<sub>k</sub> = |u<sub>k</sub>⟩ ⟨u<sub>k</sub>|</span> is the projection onto the <span className="font-mono">k</span>-th attentional mode <span className="font-mono">u<sub>k</sub></span>, and <span className="font-mono">λ<sub>k</sub> ∈ ℝ</span> is the associated gain.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold text-slate-800 mb-3 font-sans">1.4 The Conscious State</h3>
          <p className="mb-4">
            Momentary conscious experience ψ<sub>C</sub>(t) is defined as the result of applying the Attention operator to the disparity vector. We define the spectral coefficients of consciousness as:
          </p>
          <div className="bg-slate-50 p-4 rounded border border-slate-200 text-center font-mono text-lg mb-4">
            c<sub>k</sub>(t) = λ<sub>k</sub> ⟨ u<sub>k</sub>, Δ(t) ⟩
          </div>
          <p className="mb-2">The conscious state is reconstructed as:</p>
          <div className="bg-slate-50 p-4 rounded border border-slate-200 text-center font-mono text-lg mb-4">
            ψ<sub>C</sub>(t) = Σ<sub>k</sub> c<sub>k</sub>(t) u<sub>k</sub>
          </div>
          <p>
            The magnitude <span className="font-mono">|c<sub>k</sub>|</span> represents the contribution of the <span className="font-mono">k</span>-th attentional mode to the current moment of experience. Conscious content is therefore distributed spectrally rather than localized or symbolic.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 font-sans border-b border-slate-200 pb-2">2. System Dynamics and Feedback</h2>
        <p className="mb-6">
          The system evolves through asymmetric feedback loops driven by the conscious state ψ<sub>C</sub>. These loops regulate stability while allowing experience to reshape internal models.
        </p>

        <h3 className="text-xl font-bold text-slate-800 mb-3 font-sans">2.1 Update Equations</h3>
        <p className="mb-4">
          To ensure convergence and prevent runaway amplification, the body/sensory model incorporates both disparity-reducing regulation and conscious reinforcement:
        </p>
        <div className="bg-slate-50 p-6 rounded border border-slate-200 text-center font-mono text-lg mb-6 space-y-4">
          <div>ψ<sub>B</sub>(t+1) = ψ<sub>B</sub>(t) - η<sub>reg</sub> Δ(t) + η<sub>fb</sub> ψ<sub>C</sub>(t) + ξ<sub>sensory</sub>(t)</div>
          <div>ψ<sub>I</sub>(t+1) = ψ<sub>I</sub>(t) + η<sub>I</sub> ψ<sub>C</sub>(t)</div>
        </div>
        <p className="mb-4">Here:</p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
            <li><span className="font-mono">η<sub>reg</sub></span> controls error regulation (driving ψ<sub>B</sub> → ψ<sub>I</sub>),</li>
            <li><span className="font-mono">η<sub>fb</sub></span> controls conscious reinforcement,</li>
            <li><span className="font-mono">η<sub>I</sub> ≪ η<sub>fb</sub></span> ensures slow identity integration,</li>
            <li><span className="font-mono">ξ<sub>sensory</sub></span> represents ongoing external input.</li>
        </ul>
        <p>
          The Body model rapidly tracks environmental conditions, while the Identity model integrates conscious projections over longer timescales, yielding autobiographical continuity.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 font-sans border-b border-slate-200 pb-2">3. Phenomenological Mapping</h2>
        <p className="mb-6">
          The spectral structure of <span className="font-mono">A</span> and ψ<sub>C</sub> maps directly onto subjective phenomenology.
        </p>
        <div className="overflow-x-auto rounded-lg border border-slate-200 mb-8">
          <table className="min-w-full text-left">
            <thead className="bg-slate-100 font-sans font-bold text-slate-900">
              <tr>
                <th className="p-4 border-b border-slate-200">Mathematical Property</th>
                <th className="p-4 border-b border-slate-200">Phenomenological Correlate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="p-4 font-mono">Norm ||ψ<sub>C</sub>||</td>
                <td className="p-4">Intensity of experience (e.g., pain, ecstasy vs. drowsiness).</td>
              </tr>
              <tr>
                <td className="p-4 font-mono">Coefficient sparsity |c<sub>k</sub>|</td>
                <td className="p-4">Focus or attentional capture.</td>
              </tr>
              <tr>
                <td className="p-4 font-mono">Spectral entropy H</td>
                <td className="p-4">Confusion / dissonance (distributed attention).</td>
              </tr>
              <tr>
                <td className="p-4 font-mono">Focus ratio F = max |c<sub>k</sub>| / Σ |c<sub>k</sub>|</td>
                <td className="p-4">Clarity vs. mind wandering.</td>
              </tr>
              <tr>
                <td className="p-4 font-mono">Eigenvalue shift λ<sub>k</sub> ↑</td>
                <td className="p-4">Insight (“Aha”) or capture.</td>
              </tr>
              <tr>
                <td className="p-4 font-mono">Orthogonality of modes</td>
                <td className="p-4">Qualitative distinctness of experience.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-bold text-slate-800 mb-3 font-sans">3.1 Altered States as Operator Perturbations</h3>
        <ul className="list-disc pl-6 space-y-2">
            <li><strong>Psychedelic states</strong> correspond to spectral flattening of <span className="font-mono">A</span>, increasing entropy and allowing many modes to contribute simultaneously.</li>
            <li><strong>Cognitive dissonance</strong> arises from high disparity combined with high spectral entropy.</li>
            <li><strong>Meditative states</strong> involve reduction of <span className="font-mono">||Δ||</span> or global dampening of <span className="font-mono">A</span>.</li>
            <li><strong>Mania or panic</strong> correspond to runaway gain in specific threat or reward modes.</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 font-sans border-b border-slate-200 pb-2">4. Proposed Experiments and Falsification</h2>
        
        <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-800 mb-3 font-sans">4.1 Orthogonal Neural Subspaces</h3>
            <p className="mb-2"><strong>Prediction:</strong> Distinct attentional modes correspond to orthogonal subspaces in neural population activity.</p>
            <p><strong>Test:</strong> Perform dimensionality reduction (PCA, factor analysis) on large-scale recordings (e.g., Neuropixels). Compute angles between subspaces associated with different task demands. The model predicts near-orthogonality.</p>
        </div>

        <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-800 mb-3 font-sans">4.2 Spectral Signature of Insight</h3>
            <p className="mb-2"><strong>Prediction:</strong> Insight corresponds to a spectral collapse from high entropy to a dominant mode.</p>
            <p><strong>Test:</strong> Analyze EEG microstate dynamics during problem solving. Expect a transition from distributed activity to a single dominant pattern aligned with solution onset.</p>
        </div>

        <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-800 mb-3 font-sans">4.3 Falsification Criteria</h3>
            <p className="mb-2">The model is falsified if:</p>
            <ul className="list-disc pl-6 space-y-1">
                <li>Conscious content is shown to be independent of representational disparity.</li>
                <li>Attentional modulation is purely scalar rather than mode-selective.</li>
                <li>Spectral structure fails to correlate with phenomenological reports.</li>
            </ul>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-6 font-sans border-b border-slate-200 pb-2">5. Conclusion</h2>
        <p>
            The Spectral Attention Model formalizes consciousness as a structured, dynamical projection of internal model disparity. By treating attention as a self-adjoint operator in Hilbert space, the framework accounts for intensity, focus, confusion, insight, and altered states within a single mathematical structure. Conscious experience emerges not from representation alone, but from the spectral organization of mismatch between self and world.
        </p>
      </section>
    </div>
  );
};