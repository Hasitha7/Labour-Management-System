import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Card, Button, Table, Modal, Input, Select, Badge } from '../components/UI';

const AssignmentsPage = () => {
  const { assignments, addAssignment, updateAssignment, deleteAssignment, clients, labourers } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    client: '',
    workstation: '',
    labourer: '',
    shiftTime: '',
    startDate: '',
    endDate: '',
    role: '',
    dailyRate: '',
    status: 'Active',
  });

  const handleOpenModal = (assignment = null) => {
    if (assignment) {
      setFormData(assignment);
      setEditingId(assignment.id);
    } else {
      setFormData({
        client: '',
        workstation: '',
        labourer: '',
        shiftTime: '',
        startDate: '',
        endDate: '',
        role: '',
        dailyRate: '',
        status: 'Active',
      });
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (editingId) {
      updateAssignment(editingId, formData);
    } else {
      addAssignment(formData);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this assignment?')) {
      deleteAssignment(id);
    }
  };

  const columns = [
    { key: 'client', label: 'Client' },
    { key: 'workstation', label: 'Workstation' },
    { key: 'labourer', label: 'Labourer' },
    { key: 'role', label: 'Role' },
    { key: 'shiftTime', label: 'Shift Time' },
    { key: 'startDate', label: 'Start Date' },
    { key: 'endDate', label: 'End Date' },
    { key: 'dailyRate', label: 'Daily Rate', render: (row) => `$${row.dailyRate}` },
    {
      key: 'status',
      label: 'Status',
      render: (row) => (
        <Badge
          text={row.status}
          variant={row.status === 'Active' ? 'success' : row.status === 'Completed' ? 'default' : 'warning'}
        />
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() => handleOpenModal(row)}
            className="text-xs px-2 py-1"
          >
            Edit
          </Button>
          <Button
            variant="danger"
            onClick={() => handleDelete(row.id)}
            className="text-xs px-2 py-1"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Assignments Management</h1>
        <Button onClick={() => handleOpenModal()}>+ Create Assignment</Button>
      </div>

      <Card title={`Total Assignments: ${assignments.length}`}>
        <Table columns={columns} data={assignments} />
      </Card>

      <Modal
        isOpen={isModalOpen}
        title={editingId ? 'Edit Assignment' : 'Create New Assignment'}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      >
        <div className="space-y-4 max-h-96 overflow-y-auto">
          <Select
            label="Client"
            name="client"
            value={formData.client}
            onChange={handleChange}
            options={clients.map(c => ({ value: c.companyName, label: c.companyName }))}
          />
          <Input
            label="Workstation"
            name="workstation"
            value={formData.workstation}
            onChange={handleChange}
            placeholder="Enter workstation location"
          />
          <Select
            label="Labourer"
            name="labourer"
            value={formData.labourer}
            onChange={handleChange}
            options={labourers.map(l => ({ value: l.fullName, label: l.fullName }))}
          />
          <Input
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Enter job role"
          />
          <Input
            label="Shift Time"
            name="shiftTime"
            value={formData.shiftTime}
            onChange={handleChange}
            placeholder="e.g., 9:00 AM - 5:00 PM"
          />
          <Input
            label="Start Date"
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleChange}
          />
          <Input
            label="End Date"
            name="endDate"
            type="date"
            value={formData.endDate}
            onChange={handleChange}
          />
          <Input
            label="Daily Rate"
            name="dailyRate"
            type="number"
            value={formData.dailyRate}
            onChange={handleChange}
            placeholder="Enter daily rate"
          />
          <Select
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            options={[
              { value: 'Active', label: 'Active' },
              { value: 'Completed', label: 'Completed' },
              { value: 'On Hold', label: 'On Hold' },
            ]}
          />
        </div>
      </Modal>
    </div>
  );
};

export default AssignmentsPage;
