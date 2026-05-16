import React from 'react';
import { useApp } from '../context/AppContext';
import { Card, Table, Badge, StatCard } from '../components/UI';

const ClientDashboard = () => {
  const { clients } = useApp();
  const myClient = clients[0]; // For demo, showing first client

  const assignedWorkers = [
    { id: 1, name: 'Raj Kumar', status: 'Active', rating: '⭐ 4.6/5' },
    { id: 2, name: 'Amit Patel', status: 'Active', rating: '⭐ 4.8/5' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Client Dashboard</h1>

      {myClient && (
        <Card title="My Company">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Company Name</p>
              <p className="text-lg font-semibold text-gray-900">{myClient.companyName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Contact Person</p>
              <p className="text-lg font-semibold text-gray-900">{myClient.contactPerson}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Monthly Billing</p>
              <p className="text-lg font-semibold text-gray-900">${myClient.billingAmount.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Required Workers</p>
              <p className="text-lg font-semibold text-gray-900">{myClient.requiredLabourCount}</p>
            </div>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatCard
          title="Assigned Workers"
          value="2"
          subtitle="Currently working"
          icon="👷"
          color="blue"
        />
        <StatCard
          title="Pending Invoices"
          value="1"
          subtitle="$75,000"
          icon="📄"
          color="yellow"
        />
      </div>

      <Card title="My Assigned Workers">
        <Table
          columns={[
            { key: 'name', label: 'Worker Name' },
            { key: 'status', label: 'Status', render: (row) => <Badge text={row.status} variant="success" /> },
            { key: 'rating', label: 'Rating' },
          ]}
          data={assignedWorkers}
        />
      </Card>
    </div>
  );
};

export const ClientWorkers = () => {
  const workers = [
    { id: 1, name: 'Raj Kumar', role: 'Electrical Technician', status: 'Active' },
    { id: 2, name: 'Amit Patel', role: 'Equipment Operator', status: 'Active' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">My Workers</h1>
      <Card title="Assigned Workers">
        <Table
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'role', label: 'Role' },
            { key: 'status', label: 'Status', render: (row) => <Badge text={row.status} variant="success" /> },
          ]}
          data={workers}
        />
      </Card>
    </div>
  );
};

export const ClientInvoices = () => {
  const invoices = [
    { id: 'INV-001', amount: '50000', status: 'Paid', date: '2024-05-05' },
    { id: 'INV-002', amount: '50000', status: 'Pending', date: '2024-04-05' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">My Invoices</h1>
      <Card title="Billing History">
        <Table
          columns={[
            { key: 'id', label: 'Invoice ID' },
            { key: 'date', label: 'Date' },
            { key: 'amount', label: 'Amount', render: (row) => `$${row.amount}` },
            { key: 'status', label: 'Status', render: (row) => <Badge text={row.status} variant={row.status === 'Paid' ? 'success' : 'warning'} /> },
          ]}
          data={invoices}
        />
      </Card>
    </div>
  );
};

export const ClientRatings = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Rate Workers</h1>
      <Card title="Rate your workers">
        <p className="text-gray-600">Rate the workers assigned to your workstation</p>
      </Card>
    </div>
  );
};

export default ClientDashboard;
