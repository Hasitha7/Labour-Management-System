import React from 'react';
import { useApp } from '../context/AppContext';
import { Card, Table, Badge, StatCard, Button } from '../components/UI';

const InvoicesPage = () => {
  const { invoices } = useApp();

  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const paidAmount = invoices
    .filter(inv => inv.status === 'Paid')
    .reduce((sum, inv) => sum + inv.amount, 0);
  const pendingAmount = invoices
    .filter(inv => inv.status === 'Pending')
    .reduce((sum, inv) => sum + inv.amount, 0);

  const columns = [
    { key: 'id', label: 'Invoice ID' },
    { key: 'client', label: 'Client' },
    { key: 'issuedDate', label: 'Issued Date' },
    { key: 'dueDate', label: 'Due Date' },
    { key: 'amount', label: 'Amount', render: (row) => `$${row.amount.toLocaleString()}` },
    { key: 'description', label: 'Description' },
    {
      key: 'status',
      label: 'Status',
      render: (row) => (
        <Badge
          text={row.status}
          variant={row.status === 'Paid' ? 'success' : 'warning'}
        />
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <div className="flex gap-2">
          <Button variant="secondary" className="text-xs px-2 py-1">View</Button>
          <Button
            variant={row.status === 'Paid' ? 'secondary' : 'primary'}
            className="text-xs px-2 py-1"
            disabled={row.status === 'Paid'}
          >
            {row.status === 'Paid' ? 'Paid' : 'Mark Paid'}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Client Invoices</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          subtitle={`${invoices.length} invoices`}
          icon="💵"
          color="green"
        />
        <StatCard
          title="Paid Amount"
          value={`$${paidAmount.toLocaleString()}`}
          subtitle={`${invoices.filter(i => i.status === 'Paid').length} paid`}
          icon="✅"
          color="blue"
        />
        <StatCard
          title="Pending Amount"
          value={`$${pendingAmount.toLocaleString()}`}
          subtitle={`${invoices.filter(i => i.status === 'Pending').length} pending`}
          icon="⏳"
          color="yellow"
        />
      </div>

      <Card title={`Total Invoices: ${invoices.length}`}>
        <Table columns={columns} data={invoices} />
      </Card>
    </div>
  );
};

export default InvoicesPage;
