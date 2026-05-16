import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useApp } from '../context/AppContext';
import { Card, StatCard } from '../components/UI';

const AdminDashboard = () => {
  const { clients, labourers, assignments, reports } = useApp();

  const activeClients = clients.filter(c => c.status === 'Active').length;
  const activeLabourers = labourers.filter(l => l.status === 'Active').length;
  const activeAssignments = assignments.filter(a => a.status === 'Active').length;

  const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444'];

  const clientStatusData = [
    { name: 'Active', value: clients.filter(c => c.status === 'Active').length },
    { name: 'Inactive', value: clients.filter(c => c.status !== 'Active').length },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Revenue (This Month)"
          value={`$${reports.revenue.thisMonth.toLocaleString()}`}
          subtitle={`↑ ${reports.revenue.growth}% from last month`}
          icon="💵"
          color="green"
        />
        <StatCard
          title="Total Payroll"
          value={`$${reports.payroll.thisMonth.toLocaleString()}`}
          subtitle={`↑ ${reports.payroll.growth}% from last month`}
          icon="💰"
          color="blue"
        />
        <StatCard
          title="Profit"
          value={`$${reports.profit.thisMonth.toLocaleString()}`}
          subtitle={`↑ ${reports.profit.growth}% from last month`}
          icon="📈"
          color="yellow"
        />
        <StatCard
          title="Commission"
          value={`$${reports.commission.earnedThisMonth.toLocaleString()}`}
          subtitle={`${reports.commission.rate}% of profit`}
          icon="⭐"
          color="red"
        />
      </div>

      {/* Active Resources */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Active Clients"
          value={activeClients}
          subtitle={`${clients.length} total`}
          icon="🏢"
          color="blue"
        />
        <StatCard
          title="Available Labourers"
          value={activeLabourers}
          subtitle={`${labourers.length} total`}
          icon="👷"
          color="green"
        />
        <StatCard
          title="Active Assignments"
          value={activeAssignments}
          subtitle={`${assignments.length} total`}
          icon="📋"
          color="yellow"
        />
      </div>

      {/* Revenue & Payroll Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Monthly Revenue vs Payroll Trend">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={reports.monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2} name="Revenue" />
              <Line type="monotone" dataKey="payroll" stroke="#dc2626" strokeWidth={2} name="Payroll" />
              <Line type="monotone" dataKey="profit" stroke="#16a34a" strokeWidth={2} name="Profit" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Client Status Overview">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={clientStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {clientStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Monthly Performance */}
      <Card title="Monthly Financial Performance">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={reports.monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
            <Legend />
            <Bar dataKey="revenue" fill="#2563eb" name="Revenue" />
            <Bar dataKey="payroll" fill="#dc2626" name="Payroll" />
            <Bar dataKey="profit" fill="#16a34a" name="Profit" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default AdminDashboard;
