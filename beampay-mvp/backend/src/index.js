import cors from 'cors';
import express from 'express';

import { employees, payrollPreview } from './payroll.js';

const app = express();
const port = Number(process.env.PORT ?? 4100);

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'beampay-backend' });
});

app.get('/employees', (_req, res) => {
  res.json({ employees });
});

app.get('/payroll/preview', (_req, res) => {
  res.json(payrollPreview());
});

app.post('/payroll/run', (_req, res) => {
  const preview = payrollPreview();
  res.status(201).json({
    runId: `run-${Date.now()}`,
    status: 'simulated',
    ...preview
  });
});

app.listen(port, () => {
  console.log(`BeamPay backend running on http://localhost:${port}`);
});
