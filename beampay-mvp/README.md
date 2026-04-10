# BeamPay MVP

This folder contains a simple MVP repository structure for a payroll product:

- **Backend (Node.js + Express):** employee data + payroll simulation APIs
- **Frontend (React + Vite):** dashboard to preview and run payroll
- **Basic payroll logic:** biweekly USDC payout amounts derived from annual USD salary

## Project Structure

```text
beampay-mvp/
  backend/
    src/
      index.js        # API server
      payroll.js      # Payroll calculation logic
    package.json
  frontend/
    src/
      App.jsx         # Dashboard UI
      api.js          # Backend API calls
      main.jsx        # React bootstrap
      styles.css      # Dashboard styling
    index.html
    vite.config.js
    package.json
  README.md
```

## Setup Guide

## 1) Prerequisites

- Node.js 20+
- pnpm 10+

## 2) Install dependencies

From each app folder, install dependencies.

```bash
cd beampay-mvp/backend
pnpm add express cors

cd ../frontend
pnpm add react react-dom
pnpm add -D vite
```

## 3) Run backend

```bash
cd beampay-mvp/backend
pnpm dev
```

Backend runs at `http://localhost:4100`.

## 4) Run frontend

```bash
cd beampay-mvp/frontend
pnpm dev
```

Frontend runs at `http://localhost:5174` and points to backend URL `http://localhost:4100`.

If needed, override with:

```bash
VITE_API_BASE_URL=http://localhost:4100 pnpm dev
```

## API Endpoints

- `GET /health` - health check
- `GET /employees` - list employees
- `GET /payroll/preview` - view simulated payroll payouts
- `POST /payroll/run` - create a simulated payroll run

## Payroll Logic (MVP)

- Store employee annual salary in USD.
- Convert annual salary to **biweekly** gross amount using `annual / 26`.
- Treat 1 USDC ~= 1 USD for simulation.
- Round payout amounts to 2 decimals.
- Return payout records with wallet address and memo.

> This MVP is intentionally simple and does not include taxes, deductions, signatures, custody, or blockchain settlement.
