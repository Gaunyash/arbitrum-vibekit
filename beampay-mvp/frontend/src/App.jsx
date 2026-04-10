import { useEffect, useState } from 'react';

import { getPayrollPreview, runPayroll } from './api';
import './styles.css';

function App() {
  const [preview, setPreview] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [status, setStatus] = useState('');

  const loadPreview = async () => {
    const data = await getPayrollPreview();
    setPreview(data);
  };

  useEffect(() => {
    loadPreview().catch((error) => setStatus(error.message));
  }, []);

  const handleRunPayroll = async () => {
    setIsRunning(true);
    setStatus('Submitting payroll run...');

    try {
      const result = await runPayroll();
      setStatus(`✅ Payroll simulated: ${result.runId} · Total ${result.totalUsdc} ${result.currency}`);
      setPreview(result);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Unknown payroll error');
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <main className="dashboard">
      <h1>BeamPay Payroll Dashboard</h1>
      <p>Simple MVP view of a biweekly payroll run in USDC.</p>

      <button disabled={isRunning} onClick={handleRunPayroll} type="button">
        {isRunning ? 'Running...' : 'Run Payroll'}
      </button>

      {status ? <p className="status">{status}</p> : null}

      {preview ? (
        <section className="card">
          <h2>Payroll Preview</h2>
          <p>
            Total: <strong>{preview.totalUsdc} {preview.currency}</strong>
          </p>
          <p>Generated at: {new Date(preview.payrollRunAt).toLocaleString()}</p>

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Wallet</th>
                <th>Amount (USDC)</th>
              </tr>
            </thead>
            <tbody>
              {preview.payouts.map((payout) => (
                <tr key={payout.employeeId}>
                  <td>{payout.name}</td>
                  <td>{payout.walletAddress}</td>
                  <td>{payout.usdcAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : null}
    </main>
  );
}

export default App;
