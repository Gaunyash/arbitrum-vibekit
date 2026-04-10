/**
 * @typedef {{
 *   id: string,
 *   name: string,
 *   role: string,
 *   annualSalaryUsd: number,
 *   walletAddress: string
 * }} Employee
 */

/** @type {Employee[]} */
export const employees = [
  {
    id: 'emp-001',
    name: 'Ana Flores',
    role: 'Engineer',
    annualSalaryUsd: 132000,
    walletAddress: '0x8f95f66f8fD709DF7f4f9F95fa95FF9a9eb4bA4B'
  },
  {
    id: 'emp-002',
    name: 'Marcus Lee',
    role: 'Designer',
    annualSalaryUsd: 108000,
    walletAddress: '0x6b7D1AB07a0A77d63Bd056ffBdd9f32C6aFcFEA0'
  },
  {
    id: 'emp-003',
    name: 'Priya Sharma',
    role: 'Ops Lead',
    annualSalaryUsd: 120000,
    walletAddress: '0xC13E2e49c5C63b02f9Da7db43f248A5A5f1602D7'
  }
];

const BIWEEKLY_PERIODS_PER_YEAR = 26;

export const usdToUsdc = (usdAmount) => Math.round(usdAmount * 100) / 100;

export const biweeklyGrossUsd = (annualSalaryUsd) => annualSalaryUsd / BIWEEKLY_PERIODS_PER_YEAR;

export const payrollPreview = () => {
  const payouts = employees.map((employee) => {
    const grossUsd = biweeklyGrossUsd(employee.annualSalaryUsd);
    const usdcAmount = usdToUsdc(grossUsd);

    return {
      employeeId: employee.id,
      name: employee.name,
      walletAddress: employee.walletAddress,
      usdcAmount,
      memo: `BeamPay biweekly payroll for ${employee.name}`
    };
  });

  const totalUsdc = payouts.reduce((sum, payout) => sum + payout.usdcAmount, 0);

  return {
    payrollRunAt: new Date().toISOString(),
    currency: 'USDC',
    totalUsdc: usdToUsdc(totalUsdc),
    payouts
  };
};
