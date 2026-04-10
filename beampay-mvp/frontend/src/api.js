const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4100';

export const getPayrollPreview = async () => {
  const response = await fetch(`${API_BASE_URL}/payroll/preview`);
  if (!response.ok) {
    throw new Error('Failed to fetch payroll preview');
  }

  return response.json();
};

export const runPayroll = async () => {
  const response = await fetch(`${API_BASE_URL}/payroll/run`, {
    method: 'POST'
  });

  if (!response.ok) {
    throw new Error('Failed to run payroll');
  }

  return response.json();
};
