import React from 'react';
import { useApp } from '../context/AppContext';
import { Card, Table, Badge, StatCard } from '../components/UI';

const RatingsPage = () => {
  const { ratings } = useApp();

  const avgRating = (ratings.reduce((sum, r) => sum + r.averageRating, 0) / ratings.length).toFixed(2);
  const topPerformer = ratings.reduce((max, r) => r.averageRating > max.averageRating ? r : max);

  const columns = [
    { key: 'labourerName', label: 'Labourer' },
    { key: 'client', label: 'Client' },
    { key: 'attendance', label: 'Attendance', render: (row) => `⭐ ${row.attendance}` },
    { key: 'workQuality', label: 'Work Quality', render: (row) => `⭐ ${row.workQuality}` },
    { key: 'speed', label: 'Speed', render: (row) => `⭐ ${row.speed}` },
    { key: 'discipline', label: 'Discipline', render: (row) => `⭐ ${row.discipline}` },
    { key: 'communication', label: 'Communication', render: (row) => `⭐ ${row.communication}` },
    {
      key: 'averageRating',
      label: 'Average',
      render: (row) => (
        <Badge
          text={`⭐ ${row.averageRating}/5`}
          variant={row.averageRating >= 4.5 ? 'success' : row.averageRating >= 4 ? 'info' : 'warning'}
        />
      ),
    },
    { key: 'comments', label: 'Comments' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Labour Ratings & Performance</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Average Rating"
          value={`⭐ ${avgRating}/5`}
          subtitle={`Across ${ratings.length} labourers`}
          icon="📊"
          color="blue"
        />
        <StatCard
          title="Top Performer"
          value={topPerformer.labourerName}
          subtitle={`Rating: ⭐ ${topPerformer.averageRating}`}
          icon="🏆"
          color="green"
        />
        <StatCard
          title="Excellent Performers"
          value={ratings.filter(r => r.averageRating >= 4.5).length}
          subtitle="Rating 4.5 and above"
          icon="⭐"
          color="yellow"
        />
      </div>

      <Card title={`Total Ratings: ${ratings.length}`}>
        <Table columns={columns} data={ratings} />
      </Card>
    </div>
  );
};

export default RatingsPage;
