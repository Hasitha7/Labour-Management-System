import React from 'react';
import { useApp } from '../context/AppContext';
import { Card, Table, Badge, StatCard } from '../components/UI';

const LabourerDashboard = () => {
  const { labourers, assignments } = useApp();
  const myLabourer = labourers[0]; // For demo, showing first labourer

  const myAssignments = assignments.filter(a => a.labourer === myLabourer.fullName);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>

      {myLabourer && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card title="My Profile">
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-semibold text-gray-900">{myLabourer.fullName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Rating</p>
                <p className="text-lg font-bold text-blue-600">⭐ {myLabourer.rating}/5</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Current Status</p>
                <Badge text={myLabourer.status} variant={myLabourer.status === 'Active' ? 'success' : 'warning'} />
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            <StatCard
              title="Active Assignments"
              value={myAssignments.filter(a => a.status === 'Active').length}
              icon="📋"
              color="blue"
            />
            <StatCard
              title="Skills"
              value={myLabourer.skills.length}
              subtitle={myLabourer.skills.join(', ')}
              icon="🎯"
              color="green"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export const LabourerJobs = () => {
  const { labourers, assignments } = useApp();
  const myLabourer = labourers[0];
  const myAssignments = assignments.filter(a => a.labourer === myLabourer.fullName);

  const columns = [
    { key: 'client', label: 'Client' },
    { key: 'role', label: 'Role' },
    { key: 'workstation', label: 'Workstation' },
    { key: 'shiftTime', label: 'Shift Time' },
    { key: 'startDate', label: 'Start Date' },
    { key: 'dailyRate', label: 'Daily Rate', render: (row) => `$${row.dailyRate}` },
    { key: 'status', label: 'Status', render: (row) => <Badge text={row.status} variant={row.status === 'Active' ? 'success' : 'default'} /> },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">My Assignments</h1>
      <Card title={`Total Jobs: ${myAssignments.length}`}>
        <Table columns={columns} data={myAssignments} />
      </Card>
    </div>
  );
};

export const LabourerAttendance = () => {
  const { attendance, labourers } = useApp();
  const myLabourer = labourers[0];
  const myAttendance = attendance.filter(a => a.labourerName === myLabourer.fullName);

  const columns = [
    { key: 'date', label: 'Date' },
    { key: 'checkIn', label: 'Check In' },
    { key: 'checkOut', label: 'Check Out' },
    { key: 'status', label: 'Status', render: (row) => <Badge text={row.status} variant={row.status === 'Present' ? 'success' : 'danger'} /> },
    { key: 'overtimeHours', label: 'Overtime' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">My Attendance</h1>
      <Card title={`Total Records: ${myAttendance.length}`}>
        <Table columns={columns} data={myAttendance} />
      </Card>
    </div>
  );
};

export const LabourerPayroll = () => {
  const { payroll, labourers } = useApp();
  const myLabourer = labourers[0];
  const myPayroll = payroll.filter(p => p.labourerName === myLabourer.fullName);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">My Salary</h1>

      {myPayroll.length > 0 && (
        <Card title="Latest Salary">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <p className="text-sm text-gray-600">Base Salary</p>
              <p className="font-bold text-gray-900">${myPayroll[0].baseSalary}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Overtime</p>
              <p className="font-bold text-gray-900">${myPayroll[0].overtimeAmount}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Bonus</p>
              <p className="font-bold text-gray-900">${myPayroll[0].bonus}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Deductions</p>
              <p className="font-bold text-gray-900">${myPayroll[0].deductions}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Net Salary</p>
              <p className="font-bold text-blue-600 text-lg">${myPayroll[0].netSalary}</p>
            </div>
          </div>
        </Card>
      )}

      <Card title="Salary History">
        <Table
          columns={[
            { key: 'month', label: 'Month' },
            { key: 'baseSalary', label: 'Base', render: (row) => `$${row.baseSalary}` },
            { key: 'netSalary', label: 'Net', render: (row) => `$${row.netSalary}` },
            { key: 'paymentStatus', label: 'Status', render: (row) => <Badge text={row.paymentStatus} variant={row.paymentStatus === 'Paid' ? 'success' : 'warning'} /> },
          ]}
          data={myPayroll}
        />
      </Card>
    </div>
  );
};

export const LabourerRatings = () => {
  const { ratings, labourers } = useApp();
  const myLabourer = labourers[0];
  const myRatings = ratings.filter(r => r.labourerName === myLabourer.fullName);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">My Ratings</h1>

      {myRatings.length > 0 && (
        <Card title="Performance Overview">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <p className="text-sm text-gray-600">Attendance</p>
              <p className="text-2xl font-bold text-blue-600">⭐ {myRatings[0].attendance}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Work Quality</p>
              <p className="text-2xl font-bold text-green-600">⭐ {myRatings[0].workQuality}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Speed</p>
              <p className="text-2xl font-bold text-yellow-600">⭐ {myRatings[0].speed}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Discipline</p>
              <p className="text-2xl font-bold text-purple-600">⭐ {myRatings[0].discipline}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Average Rating</p>
              <p className="text-2xl font-bold text-indigo-600">⭐ {myRatings[0].averageRating}</p>
            </div>
          </div>
        </Card>
      )}

      {myRatings.length > 0 && (
        <Card title="Client Feedback">
          <p className="text-gray-700">{myRatings[0].comments}</p>
        </Card>
      )}
    </div>
  );
};

export default LabourerDashboard;
