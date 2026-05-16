import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useApp } from '../context/AppContext';
import { Card, StatCard } from '../components/UI';

const ReportsPage = () => {
  const { reports, clients, labourers } = useApp();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Revenue"
          value={`$${reports.revenue.thisMonth.toLocaleString()}`}
          subtitle="+5.7% from last month"
          icon="💵"
          color="green"
        />
        <StatCard
          title="Total Payroll"
          value={`$${reports.payroll.thisMonth.toLocaleString()}`}
          subtitle="+4.8% from last month"
          icon="💰"
          color="blue"
        />
        <StatCard
          title="Total Profit"
          value={`$${reports.profit.thisMonth.toLocaleString()}`}
          subtitle="+6.7% from last month"
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Monthly Financial Trend">
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

        <Card title="Monthly Profit Analysis">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={reports.monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              <Legend />
              <Bar dataKey="profit" fill="#16a34a" name="Profit" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Platform Statistics">
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b">
              <span className="text-gray-700">Total Clients</span>
              <span className="text-2xl font-bold text-blue-600">{clients.length}</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b">
              <span className="text-gray-700">Total Labourers</span>
              <span className="text-2xl font-bold text-green-600">{labourers.length}</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b">
              <span className="text-gray-700">Active Labourers</span>
              <span className="text-2xl font-bold text-yellow-600">{labourers.filter(l => l.status === 'Active').length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">On Leave</span>
              <span className="text-2xl font-bold text-red-600">{labourers.filter(l => l.status === 'On Leave').length}</span>
            </div>
          </div>
        </Card>

        <Card title="Revenue Forecast">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">This Month</p>
              <p className="text-2xl font-bold text-blue-600">${reports.revenue.thisMonth.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Last Month</p>
              <p className="text-2xl font-bold text-gray-600">${reports.revenue.lastMonth.toLocaleString()}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded">
              <p className="text-sm text-gray-700 mb-1">Forecast (Next Month)</p>
              <p className="text-2xl font-bold text-blue-700">${reports.revenue.forecast.toLocaleString()}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ReportsPage;
