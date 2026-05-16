import React from 'react';
import { useApp } from '../context/AppContext';
import { Card, Table, Badge, StatCard } from '../components/UI';

const PayrollPage = () => {
  const { payroll } = useApp();

  const totalPaid = payroll
    .filter(p => p.paymentStatus === 'Paid')
    .reduce((sum, p) => sum + p.netSalary, 0);
  const totalPending = payroll
    .filter(p => p.paymentStatus === 'Pending')
    .reduce((sum, p) => sum + p.netSalary, 0);

  const columns = [
    { key: 'labourerName', label: 'Labourer' },
    { key: 'month', label: 'Month' },
    { key: 'baseSalary', label: 'Base Salary', render: (row) => `$${row.baseSalary}` },
    { key: 'overtimeAmount', label: 'Overtime', render: (row) => `$${row.overtimeAmount}` },
    { key: 'deductions', label: 'Deductions', render: (row) => `$${row.deductions}` },
    { key: 'bonus', label: 'Bonus', render: (row) => `$${row.bonus}` },
    { key: 'netSalary', label: 'Net Salary', render: (row) => `$${row.netSalary}` },
    {
      key: 'paymentStatus',
      label: 'Status',
      render: (row) => (
        <Badge
          text={row.paymentStatus}
          variant={row.paymentStatus === 'Paid' ? 'success' : 'warning'}
        />
      ),
    },
    { key: 'paymentDate', label: 'Payment Date' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Payroll Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Total Paid"
          value={`$${totalPaid.toLocaleString()}`}
          subtitle={`${payroll.filter(p => p.paymentStatus === 'Paid').length} payments`}
          icon="✅"
          color="green"
        />
        <StatCard
          title="Total Pending"
          value={`$${totalPending.toLocaleString()}`}
          subtitle={`${payroll.filter(p => p.paymentStatus === 'Pending').length} payments`}
          icon="⏳"
          color="yellow"
        />
        <StatCard
          title="Monthly Payroll"
          value={`$${payroll.reduce((sum, p) => sum + p.netSalary, 0).toLocaleString()}`}
          subtitle="Total for current month"
          icon="💰"
          color="blue"
        />
      </div>

      <Card title={`Total Payroll Records: ${payroll.length}`}>
        <Table columns={columns} data={payroll} />
      </Card>
    </div>
  );
};

export default PayrollPage;
