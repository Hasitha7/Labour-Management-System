import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card, Button, Table, Modal, Select, Badge } from '../components/UI';

const AttendancePage = () => {
  const { attendance, labourers, markAttendance } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    labourerId: '',
    date: new Date().toISOString().split('T')[0],
    status: 'Present',
  });

  const handleOpenModal = () => {
    setFormData({
      labourerId: '',
      date: new Date().toISOString().split('T')[0],
      status: 'Present',
    });
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (formData.labourerId) {
      markAttendance(parseInt(formData.labourerId), formData.date, formData.status);
      setIsModalOpen(false);
    }
  };

  const columns = [
    { key: 'date', label: 'Date' },
    { key: 'labourerName', label: 'Labourer' },
    { key: 'checkIn', label: 'Check In' },
    { key: 'checkOut', label: 'Check Out' },
    {
      key: 'status',
      label: 'Status',
      render: (row) => (
        <Badge
          text={row.status}
          variant={row.status === 'Present' ? 'success' : 'danger'}
        />
      ),
    },
    { key: 'overtimeHours', label: 'Overtime (Hrs)', render: (row) => `${row.overtimeHours}h` },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Attendance Tracking</h1>
        <Button onClick={handleOpenModal}>+ Mark Attendance</Button>
      </div>

      <Card title={`Total Records: ${attendance.length}`}>
        <Table columns={columns} data={attendance} />
      </Card>

      <Modal
        isOpen={isModalOpen}
        title="Mark Attendance"
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      >
        <div className="space-y-4">
          <Select
            label="Labourer"
            name="labourerId"
            value={formData.labourerId}
            onChange={handleChange}
            options={labourers.map(l => ({ value: l.id.toString(), label: l.fullName }))}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <Select
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            options={[
              { value: 'Present', label: 'Present' },
              { value: 'Absent', label: 'Absent' },
              { value: 'Late', label: 'Late' },
              { value: 'Half Day', label: 'Half Day' },
            ]}
          />
        </div>
      </Modal>
    </div>
  );
};

export default AttendancePage;
